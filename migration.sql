--DROP TABLE IF EXISTS pets;

CREATE TABLE pets (
id SERIAL,
name TEXT NOT NULL,
kind TEXT NOT NULL,
age INTEGER NOT NULL
);


INSERT INTO pets (name, kind, age) VALUES ('frank', 'dog', 1);
INSERT INTO pets (name, kind, age) VALUES ('sunday', 'cat', 12);
INSERT INTO pets (name, kind, age) VALUES ('bean', 'thing', 0.1);