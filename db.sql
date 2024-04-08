-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100)
);

-- Travelers table
CREATE TABLE travelers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    --Add traveler-specific columns here
    passport_number VARCHAR(20),
    nationality VARCHAR(50)
);

-- Hotel Managers table
CREATE TABLE hotel_managers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    --Add hotel manager-specific columns here
    hotel_name VARCHAR(100),
    hotel_location VARCHAR(100)
);

-- Tour Guides table
CREATE TABLE tour_guides (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    --Add tour guide-specific columns here
    experience_years INTEGER,
    spoken_languages VARCHAR(100)
);
