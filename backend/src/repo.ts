import { db } from './db.js';

export type Task = {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  position: number;
};

export type Chart = {
  startDate: string;
  endDate: string;
  tasks: Task[];
};

type ChartRow = { start_date: string; end_date: string };
type TaskRow = {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
  position: number;
};

const rowToTask = (r: TaskRow): Task => ({
  id: r.id,
  title: r.title,
  startDate: r.start_date,
  endDate: r.end_date,
  position: r.position,
});

export const repo = {
  getChart(): Chart {
    const chart = db.prepare('SELECT start_date, end_date FROM chart WHERE id = 1').get() as ChartRow;
    const tasks = db
      .prepare('SELECT id, title, start_date, end_date, position FROM task ORDER BY position ASC, id ASC')
      .all() as TaskRow[];
    return {
      startDate: chart.start_date,
      endDate: chart.end_date,
      tasks: tasks.map(rowToTask),
    };
  },

  updateChart(startDate: string, endDate: string): void {
    db.prepare('UPDATE chart SET start_date = ?, end_date = ? WHERE id = 1').run(startDate, endDate);
  },

  createTask(title: string, startDate: string, endDate: string): Task {
    const maxPos = (db.prepare('SELECT COALESCE(MAX(position), -1) AS m FROM task').get() as { m: number }).m;
    const info = db
      .prepare('INSERT INTO task (title, start_date, end_date, position) VALUES (?, ?, ?, ?)')
      .run(title, startDate, endDate, maxPos + 1);
    const row = db
      .prepare('SELECT id, title, start_date, end_date, position FROM task WHERE id = ?')
      .get(info.lastInsertRowid) as TaskRow;
    return rowToTask(row);
  },

  getTask(id: number): Task | undefined {
    const row = db
      .prepare('SELECT id, title, start_date, end_date, position FROM task WHERE id = ?')
      .get(id) as TaskRow | undefined;
    return row ? rowToTask(row) : undefined;
  },

  updateTask(id: number, fields: Partial<Pick<Task, 'title' | 'startDate' | 'endDate'>>): Task | undefined {
    const current = this.getTask(id);
    if (!current) return undefined;
    const next = { ...current, ...fields };
    db.prepare('UPDATE task SET title = ?, start_date = ?, end_date = ? WHERE id = ?').run(
      next.title,
      next.startDate,
      next.endDate,
      id,
    );
    return this.getTask(id);
  },

  deleteTask(id: number): boolean {
    const info = db.prepare('DELETE FROM task WHERE id = ?').run(id);
    return info.changes > 0;
  },
};
