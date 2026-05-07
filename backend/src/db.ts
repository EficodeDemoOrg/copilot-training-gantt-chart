import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = resolve(__dirname, '../data/gantt.db');
mkdirSync(dirname(dbPath), { recursive: true });

export const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS chart (
    id INTEGER PRIMARY KEY,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS task (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    position INTEGER NOT NULL
  );
`);

const today = new Date();
const plus30 = new Date(today);
plus30.setDate(today.getDate() + 30);
const iso = (d: Date) => d.toISOString().slice(0, 10);

const existing = db.prepare('SELECT id FROM chart WHERE id = 1').get();
if (!existing) {
  db.prepare('INSERT INTO chart (id, start_date, end_date) VALUES (1, ?, ?)').run(
    iso(today),
    iso(plus30),
  );
}
