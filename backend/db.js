const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'data.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Database connection error:', err.message);
    } else {
        console.log('Connected to SQLite database');
        initializeDatabase();
    }
});

function initializeDatabase() {
    db.run(`
        CREATE TABLE IF NOT EXISTS posts (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            message TEXT NOT NULL,
            link TEXT,
            date TEXT NOT NULL,
            color TEXT NOT NULL,
            hasapproved INTEGER DEFAULT 0,
            videoTitle TEXT,
            videoThumbnail TEXT
        )
    `, (err) => {
        if (err) console.error('Error creating table:', err.message);
    });
}

module.exports = db;