-- schema.sql

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE topics (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  topic_id INTEGER REFERENCES topics(id),
  votes INTEGER DEFAULT 0
);

CREATE TABLE answers (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(id),
  text TEXT NOT NULL,
  accepted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
