// db.js - Inicialización de base de datos SQLite
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, 'data', 'users.db');

let db;

function getDb() {
  if (!db) {
    db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        console.error('Error opening database:', err.message);
      } else {
        console.log('Connected to SQLite database.');
        initDb();
      }
    });
  }
  return db;
}

function initDb() {
  const d = getDb();
  d.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT,
    role TEXT DEFAULT 'user'
  )`, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      // Seed demo users
      d.run(
        `INSERT OR IGNORE INTO users (username, password, email, role) VALUES (?, ?, ?, ?)`,
        ['admin', 'admin123', 'admin@demo.com', 'admin']
      );
      d.run(
        `INSERT OR IGNORE INTO users (username, password, email, role) VALUES (?, ?, ?, ?)`,
        ['alice', 'password1', 'alice@demo.com', 'user']
      );
    }
  });
}

module.exports = { getDb };
