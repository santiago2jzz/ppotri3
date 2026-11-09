PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS teams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    nationality TEXT,
    color TEXT
);

CREATE TABLE IF NOT EXISTS drivers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    abbreviation TEXT UNIQUE,
    number INTEGER,
    nationality TEXT,
    team_id INTEGER,
    image_url TEXT,

    FOREIGN KEY (team_id) REFERENCES teams(id)
);

CREATE TABLE IF NOT EXISTS circuits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    location TEXT,
    country TEXT,
    length_km REAL,
    image_url TEXT
);

CREATE TABLE IF NOT EXISTS races (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    season INTEGER NOT NULL,
    round INTEGER NOT NULL,
    name TEXT NOT NULL,
    circuit_id INTEGER,
    race_date TEXT,
    race_time TEXT,
    status TEXT DEFAULT 'upcoming',

    FOREIGN KEY (circuit_id) REFERENCES circuits(id),
    UNIQUE (season, round),

    CHECK (status IN ('upcoming', 'completed', 'cancelled'))
);

CREATE TABLE IF NOT EXISTS race_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    race_id INTEGER NOT NULL,
    driver_id INTEGER NOT NULL,
    grid_position INTEGER,
    final_position INTEGER,
    points REAL DEFAULT 0,
    laps INTEGER DEFAULT 0,
    fastest_lap TEXT,
    status TEXT,

    FOREIGN KEY (race_id) REFERENCES races(id),
    FOREIGN KEY (driver_id) REFERENCES drivers(id),

    UNIQUE (race_id, driver_id)
);

CREATE INDEX IF NOT EXISTS idx_drivers_team
ON drivers(team_id);

CREATE INDEX IF NOT EXISTS idx_races_season
ON races(season);

CREATE INDEX IF NOT EXISTS idx_results_race
ON race_results(race_id);

CREATE INDEX IF NOT EXISTS idx_results_driver
ON race_results(driver_id);
