create database gotravel;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    img_url TEXT NOT NULL
);

CREATE TABLE taxis (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    number VARCHAR(20) NOT NULL,
    pickup_location VARCHAR(100) NOT NULL,
    dropoff_location VARCHAR(100) NOT NULL,
    message TEXT
);

ALTER TABLE taxis
ADD COLUMN user_id VARCHAR;



CREATE TABLE tour_packages (
    package_id SERIAL PRIMARY KEY,
    location VARCHAR(100) NOT NULL,
    tour_date DATE NOT NULL,
    endDate DATE ,
    max_capacity INTEGER NOT NULL,
    package_name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT,
    duration_days INTEGER
);

ALTER TABLE tour_packages
ADD COLUMN endDate DATE;

INSERT INTO pricing (package_id, price, currency)
VALUES
(66, 199.99, 'USD'),
(67, 249.99, 'USD');
---lasst 67 porjnot tourpackage schema te value ase

CREATE TABLE pricing (
    pricing_id SERIAL PRIMARY KEY,
    package_id INTEGER REFERENCES tour_packages(package_id) ON DELETE CASCADE,
    price DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) NOT NULL
);



INSERT INTO users (name, email, password, img_url)
VALUES ('Jane Smith', 'jane@example.com', 'password456', 'https://example.com/jane.jpg');

INSERT INTO users (name, email, password, img_url)
VALUES ('Dipto', 'dipto1@gmail.com', '234567', 'c:\Users\Acer\OneDrive\Pictures\HD-wallpaper-2021-the-batman-batman.jpg');

-- tour_packages table

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2022-10-20', 30, 'Tokyo Exploration', 'Discover the vibrant city of Tokyo', 'https://placehold.co/600x400', 7);
--xtraa
INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2024-05-20', 30, 'Tokyo Museuem', 'Discover the vibrant city of Tokyo', 'https://plus.unsplash.com/premium_photo-1668774097940-f36dfdaee149?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2022-10-20', 30, 'Tokyo Exploration', 'Discover the vibrant city of Tokyo', 'https://placehold.co/600x400', 7);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Rome', '2022-09-10', 40, 'Roman Holiday', 'Experience the ancient city of Rome', 'https://placehold.co/600x400', 4);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('New York', '2022-11-05', 60, 'New York City Escape', 'Explore the bustling city of New York', 'https://placehold.co/600x400', 3);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('London', '2022-12-01', 50, 'London Calling', 'Discover the charm of London', 'https://placehold.co/600x400', 6);

-- Inserting tour packages in Tokyo
INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2022-10-20', 30, 'Tokyo Exploration', 'Discover the vibrant city of Tokyo', 'https://placehold.co/600x400', 7);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2022-11-05', 25, 'Tokyo Discovery', 'Explore the modern and traditional sides of Tokyo', 'https://placehold.co/600x400', 5);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2022-12-15', 20, 'Tokyo Highlights', 'Experience the best attractions of Tokyo', 'https://placehold.co/600x400', 4);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2023-01-10', 35, 'Tokyo Adventure', 'Embark on an adventurous journey in Tokyo', 'https://placehold.co/600x400', 6);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2023-02-25', 40, 'Tokyo Wonderland', 'Discover the wonders of Tokyo', 'https://placehold.co/600x400', 8);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2023-03-20', 30, 'Tokyo Experience', 'Experience the culture and cuisine of Tokyo', 'https://placehold.co/600x400', 5);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2023-04-10', 25, 'Tokyo Dream', 'Live your dream vacation in Tokyo', 'https://placehold.co/600x400', 6);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2023-05-15', 35, 'Tokyo Magic', 'Experience the magic of Tokyo', 'https://placehold.co/600x400', 7);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2023-06-10', 30, 'Tokyo Adventure', 'Embark on an adventurous journey in Tokyo', 'https://placehold.co/600x400', 6);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2023-07-20', 25, 'Tokyo Delight', 'Delight yourself in the beauty of Tokyo', 'https://placehold.co/600x400', 4);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2023-08-05', 40, 'Tokyo Escape', 'Escape to the vibrant city of Tokyo', 'https://placehold.co/600x400', 5);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2023-09-10', 35, 'Tokyo Adventure', 'Embark on an adventurous journey in Tokyo', 'https://placehold.co/600x400', 6);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2023-10-15', 30, 'Tokyo Wonder', 'Discover the wonders of Tokyo', 'https://placehold.co/600x400', 7);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2023-11-20', 25, 'Tokyo Essence', 'Experience the essence of Tokyo', 'https://placehold.co/600x400', 4);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2023-12-05', 35, 'Tokyo Bliss', 'Experience blissful moments in Tokyo', 'https://placehold.co/600x400', 6);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2024-01-10', 30, 'Tokyo Magic', 'Experience the magic of Tokyo', 'https://placehold.co/600x400', 5);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2024-02-15', 25, 'Tokyo Dream', 'Live your dream vacation in Tokyo', 'https://placehold.co/600x400', 6);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2024-03-20', 35, 'Tokyo Adventure', 'Embark on an adventurous journey in Tokyo', 'https://placehold.co/600x400', 7);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2024-04-25', 40, 'Tokyo Wonder', 'Discover the wonders of Tokyo', 'https://placehold.co/600x400', 8);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2024-05-10', 30, 'Tokyo Essence', 'Experience the essence of Tokyo', 'https://placehold.co/600x400', 5);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2024-06-15', 25, 'Tokyo Bliss', 'Experience blissful moments in Tokyo', 'https://placehold.co/600x400', 6);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2024-07-20', 35, 'Tokyo Magic', 'Experience the magic of Tokyo', 'https://placehold.co/600x400', 7);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2024-08-25', 40, 'Tokyo Dream', 'Live your dream vacation in Tokyo', 'https://placehold.co/600x400', 8);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2024-09-10', 30, 'Tokyo Adventure', 'Embark on an adventurous journey in Tokyo', 'https://placehold.co/600x400', 5);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2024-10-15', 25, 'Tokyo Wonder', 'Discover the wonders of Tokyo', 'https://placehold.co/600x400', 6);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2024-11-20', 35, 'Tokyo Essence', 'Experience the essence of Tokyo', 'https://placehold.co/600x400', 7);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2024-12-25', 40, 'Tokyo Bliss', 'Experience blissful moments in Tokyo', 'https://placehold.co/600x400', 8);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2025-01-10', 30, 'Tokyo Magic', 'Experience the magic of Tokyo', 'https://placehold.co/600x400', 5);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2025-02-15', 25, 'Tokyo Dream', 'Live your dream vacation in Tokyo', 'https://placehold.co/600x400', 6);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2025-03-20', 35, 'Tokyo Adventure', 'Embark on an adventurous journey in Tokyo', 'https://placehold.co/600x400', 7);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2025-04-25', 40, 'Tokyo Wonder', 'Discover the wonders of Tokyo', 'https://placehold.co/600x400', 8);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2025-05-10', 30, 'Tokyo Essence', 'Experience the essence of Tokyo', 'https://placehold.co/600x400', 5);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2025-06-15', 25, 'Tokyo Bliss', 'Experience blissful moments in Tokyo', 'https://placehold.co/600x400', 6);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2025-07-20', 35, 'Tokyo Magic', 'Experience the magic of Tokyo', 'https://placehold.co/600x400', 7);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2025-08-25', 40, 'Tokyo Dream', 'Live your dream vacation in Tokyo', 'https://placehold.co/600x400', 8);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2025-09-10', 30, 'Tokyo Adventure', 'Embark on an adventurous journey in Tokyo', 'https://placehold.co/600x400', 5);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2025-10-15', 25, 'Tokyo Wonder', 'Discover the wonders of Tokyo', 'https://placehold.co/600x400', 6);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2025-11-20', 35, 'Tokyo Essence', 'Experience the essence of Tokyo', 'https://placehold.co/600x400', 7);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2025-12-25', 40, 'Tokyo Bliss', 'Experience blissful moments in Tokyo', 'https://placehold.co/600x400', 8);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2024-05-20', 25, 'Tokyo Photography Tour', 'Capture stunning photos of Tokyo iconic landmarks', 'https://placehold.co/600x400', 4);



INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2027-05-20', 25, 'Tokyo Photography Tour', 'Capture stunning photos of Tokyo iconic landmarks', 'https://placehold.co/600x400', 1);


-- pricing table



INSERT INTO pricing (package_id, price, currency)
VALUES (2, 249.99, 'USD');

INSERT INTO pricing (package_id, price, currency)
VALUES (3, 149.99, 'USD');

INSERT INTO pricing (package_id, price, currency)
VALUES (4, 299.99, 'USD');

INSERT INTO pricing (package_id, price, currency)
VALUES (5, 199.99, 'USD');


INSERT INTO pricing (package_id, price, currency)
VALUES (6, 399.99, 'USD');

INSERT INTO pricing (package_id, price, currency)
VALUES (7, 179.99, 'USD');

INSERT INTO pricing (package_id, price, currency)
VALUES (8, 449.99, 'USD');

INSERT INTO pricing (package_id, price, currency)
VALUES (9, 299.99, 'USD');

INSERT INTO pricing (package_id, price, currency)
VALUES (10, 299.99, 'USD');

INSERT INTO pricing (package_id, price, currency)
VALUES (11, 199.99, 'USD');

INSERT INTO pricing (package_id, price, currency)
VALUES (12, 499.99, 'USD');

INSERT INTO pricing (package_id, price, currency)
VALUES (13, 349.99, 'USD');

INSERT INTO pricing (package_id, price, currency)
VALUES (14, 259.99, 'USD');

INSERT INTO pricing (package_id, price, currency)
VALUES (15, 179.99, 'USD');

INSERT INTO pricing (package_id, price, currency)
VALUES (16, 349.99, 'USD');

INSERT INTO pricing (package_id, price, currency)
VALUES (17, 399.99, 'USD');

INSERT INTO pricing (package_id, price, currency)
VALUES (18, 299.99, 'USD');

INSERT INTO pricing (package_id, price, currency)
VALUES (19, 209.99, 'USD');

INSERT INTO pricing (package_id, price, currency)
VALUES (20, 449.99, 'USD');

INSERT INTO pricing (package_id, price, currency)
VALUES (21, 169.99, 'USD');

INSERT INTO pricing (package_id, price, currency)
VALUES (22, 329.99, 'USD');

INSERT INTO pricing (package_id, price, currency)
VALUES (23, 399.99, 'USD');

INSERT INTO pricing (package_id, price, currency)
VALUES (24, 279.99, 'USD');

INSERT INTO pricing (package_id, price, currency)
VALUES (25, 189.99, 'USD');

INSERT INTO pricing (package_id, price, currency)
VALUES (26, 369.99, 'USD');

INSERT INTO pricing (package_id, price, currency)
VALUES (27, 429.99, 'USD');

INSERT INTO pricing (package_id, price, currency)
VALUES (28, 319.99, 'USD');

INSERT INTO pricing (package_id, price, currency)
VALUES (29, 239.99, 'USD');

INSERT INTO pricing (package_id, price, currency)
VALUES (30, 459.99, 'USD');

INSERT INTO pricing (package_id, price, currency)
VALUES (31, 149.99, 'USD');

INSERT INTO pricing (package_id, price, currency)
VALUES (32, 279.99, 'USD');

INSERT INTO pricing (package_id, price, currency)
VALUES (33, 349.99, 'USD');

--- destination query


    SELECT tp.package_id, tp.location, tp.tour_date, tp.max_capacity, tp.package_name, tp.description, tp.image_url, tp.duration_days, pr.price, pr.currency
    FROM tour_packages tp
    INNER JOIN pricing pr ON tp.package_id = pr.package_id
    WHERE tp.location ILIKE 'to%' AND tp.tour_date = DATE '2022-10-20' AND tp.max_capacity >= 1;

    SELECT tp.package_id, tp.location, tp.tour_date, tp.endDate, tp.max_capacity, tp.package_name, tp.description, tp.image_url, tp.duration_days, pr.price, pr.currency
FROM tour_packages tp
INNER JOIN pricing pr ON tp.package_id = pr.package_id
WHERE tp.location ILIKE 'to%' 
AND tp.tour_date <= DATE '2024-05-19' 
AND tp.endDate >= DATE '2024-05-20' 
AND tp.max_capacity >= 1;

SELECT tour_packages.package_id, tour_packages.location, tour_packages.tour_date, pricing.price, pricing.currency
FROM tour_packages
INNER JOIN pricing ON tour_packages.package_id = pricing.package_id
WHERE tour_packages.location ILIKE 'Tokyo';





--last insertions
 SELECT tp.package_id
  FROM tour_packages tp
WHERE tp.location ILIKE 'to%' AND tp.tour_date = DATE '2024-05-19' AND tp.endDate = DATE '2024-05-20'
and tp.max_capacity >= 1;




INSERT INTO tour_packages (location, tour_date, endDate, max_capacity, package_name, description, image_url, duration_days)
VALUES 
('Tokyo', '2024-05-19', '2024-05-24', 30, 'Tokyo Highlights', 'Explore the highlights of Tokyo on a guided tour', 'https://placehold.co/600x400', 5),
('Tokyo', '2024-05-19', '2024-05-24', 25, 'Tokyo Nightlife', 'Experience the vibrant nightlife of Tokyo', 'https://placehold.co/600x400', 4),
('Tokyo', '2024-05-19', '2024-05-24', 35, 'Tokyo Food Tour', 'Indulge in the culinary delights of Tokyo', 'https://placehold.co/600x400', 6),
('Tokyo', '2024-05-19', '2024-05-24', 40, 'Tokyo Cultural Experience', 'Immerse yourself in the rich culture of Tokyo', 'https://placehold.co/600x400', 7),
('Tokyo', '2024-05-19', '2024-05-24', 30, 'Tokyo Shopping Spree', 'Shop till you drop in the shopping districts of Tokyo', 'https://placehold.co/600x400', 5),
('Tokyo', '2024-05-19', '2024-05-24', 25, 'Tokyo Sakura Tour', 'Admire the beauty of cherry blossoms in Tokyo', 'https://placehold.co/600x400', 4),
('Tokyo', '2024-05-19', '2024-05-24', 35, 'Tokyo Anime Adventure', 'Embark on an anime-themed adventure in Tokyo', 'https://placehold.co/600x400', 6),
('Tokyo', '2024-05-19', '2024-05-24', 40, 'Tokyo Historical Tour', 'Explore the rich history of Tokyo with knowledgeable guides', 'https://placehold.co/600x400', 7),
('Tokyo', '2024-05-19', '2024-05-24', 30, 'Tokyo Onsen Retreat', 'Relax and rejuvenate in traditional Japanese hot springs', 'https://placehold.co/600x400', 5),
('Tokyo', '2024-05-19', '2024-05-20', 25, 'Tokyo Cycling Tour', 'Explore the city on two wheels with a guided cycling tour', 'https://placehold.co/600x400', 4);


INSERT INTO taxis (name, number, pickup_location, dropoff_location, message)
VALUES 
    ('John Smith', '1234567890', '123 Main Street, City A', '456 Park Avenue, City B', 'Need to reach airport by 3 PM'),
    ('Alice Johnson', '0987654321', '789 Elm Street, City C', '321 Oak Street, City D', 'Going for a meeting at downtown'),
    ('David Lee', '9876543210', '555 Pine Street, City E', '888 Maple Avenue, City F', 'Visiting friends in the suburbs');


--rating table
create table ratings 
(
    rating_id SERIAL PRIMARY KEY,
    user_id varchar REFERENCES users(email) ON DELETE CASCADE,
    package_id INTEGER REFERENCES tour_packages(package_id) ON DELETE CASCADE,
    rating numeric(10, 2) NOT NULL,
    review TEXT
);


alter table bookings 
add column ratings numeric(10, 2);

alter table ratings
add column booking_id INTEGER REFERENCES bookings(booking_id) ON DELETE CASCADE; 




-- Insert into tour_packages
INSERT INTO tour_packages (location, tour_date, endDate, max_capacity, package_name, description, image_url, duration_days) VALUES 
('Tokyo, Japan', '2024-06-15', '2024-06-17', 20, 'Discover Tokyo: A Cultural Journey', 'Experience the vibrant culture and rich history of Tokyo on this three-day tour. Visit iconic landmarks, enjoy traditional cuisine, and immerse yourself in the unique atmosphere of Japans bustling capital.', 'https://example.com/images/tokyo.jpg', 3),
('Tokyo, Japan', '2024-06-15', '2024-06-17', 15, 'Tokyo Highlights Tour', 'Join us for an exciting three-day adventure through Tokyos most famous attractions. From the bustling streets of Shibuya to the serene Meiji Shrine, this tour offers a perfect blend of modern and traditional Japan.', 'https://example.com/images/tokyo_highlights.jpg', 3),
('Tokyo, Japan', '2024-06-15', '2024-06-17', 25, 'Tokyo Food & Culture Experience', 'Delve into Tokyos culinary scene and cultural heritage on this immersive three-day tour. Taste local delicacies, explore historic sites, and enjoy the dynamic cityscape of one of the worlds most fascinating cities.', 'https://example.com/images/tokyo_food_culture.jpg', 3);


INSERT INTO tour_packages (location, tour_date, endDate, max_capacity, package_name, description, image_url, duration_days) VALUES 
('Tokyo, Japan', '2024-06-15', '2024-06-17', 20, 'Discover Tokyo: A Cultural Journey', 'Experience the vibrant culture and rich history of Tokyo on this three-day tour. Visit iconic landmarks, enjoy traditional cuisine, and immerse yourself in the unique atmosphere of Japans bustling capital.', 'https://example.com/images/tokyo.jpg', 3),
('Tokyo, Japan', '2024-06-15', '2024-06-17', 15, 'Tokyo Highlights Tour', 'Join us for an exciting three-day adventure through Tokyos most famous attractions. From the bustling streets of Shibuya to the serene Meiji Shrine, this tour offers a perfect blend of modern and traditional Japan.', 'https://example.com/images/tokyo_highlights.jpg', 3),
('Tokyo, Japan', '2024-06-15', '2024-06-17', 25, 'Tokyo Food & Culture Experience', 'Delve into Tokyos culinary scene and cultural heritage on this immersive three-day tour. Taste local delicacies, explore historic sites, and enjoy the dynamic cityscape of one of the worlds most fascinating cities.', 'https://example.com/images/tokyo_food_culture.jpg', 3);



CREATE TABLE tour_packages (
    package_id SERIAL PRIMARY KEY,
    location VARCHAR(100) NOT NULL,
    tour_date DATE NOT NULL,
    endDate DATE ,
    max_capacity INTEGER NOT NULL,
    package_name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT,
    duration_days INTEGER
);

INSERT INTO tour_packages (location, tour_date, max_capacity, package_name, description, image_url, duration_days)
VALUES ('Tokyo', '2027-05-20', 25, 'Tokyo Photography Tour', 'Capture stunning photos of Tokyo iconic landmarks', 'https://placehold.co/600x400', 1);


-- Insert into pricing
INSERT INTO pricing (package_id, price, currency) VALUES 
(1, 799.99, 'USD'),
(2, 699.99, 'USD'),
(3, 899.99, 'USD');
ALTER TABLE tour_packages
DROP COLUMN duration_days;

-- Add the column map_url to tour_packages table
ALTER TABLE tour_packages
ADD COLUMN map_url TEXT;

set map_url = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.1821139210347!2d90.424056!3d23.8121223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c75f94557271%3A0x9d3122084da9f44!2sTokyo%20Diner!5e0!3m2!1sen!2sbd!4v1717264141431!5m2!1sen!2sbd" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';


UPDATE tour_packages
SET map_url = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.1821139210347!2d90.424056!3d23.8121223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c75f94557271%3A0x9d3122084da9f44!2sTokyo%20Diner!5e0!3m2!1sen!2sbd!4v1717264141431!5m2!1sen%2sbd'
WHERE package_id = 75;

UPDATE tour_packages
SET map_url = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.1821139210347!2d90.424056!3d23.8121223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c75f94557271%3A0x9d3122084da9f44!2sTokyo%20Diner!5e0!3m2!1sen!2sbd!4v1717264141431!5m2!1sen%2sbd'
where package_id = 76;

UPDATE tour_packages
SET map_url = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.1821139210347!2d90.424056!3d23.8121223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c75f94557271%3A0x9d3122084da9f44!2sTokyo%20Diner!5e0!3m2!1sen!2sbd!4v1717264141431!5m2!1sen%2sbd'
where package_id = 77;

UPDATE tour_packages
SET map_url = 
'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31458076.746106282!2d98.88670055234604!3d15.74599333435405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188ec0ec6cb7a3%3A0xee8647a176257a17!2sTokyo%20Culture%20Cycling%20Tour!5e0!3m2!1sen!2sbd!4v1717291517702!5m2!1sen!2sbd'
where package_id = 73;

<iframe src=
"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31458076.746106282!2d98.88670055234604!3d15.74599333435405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188ec0ec6cb7a3%3A0xee8647a176257a17!2sTokyo%20Culture%20Cycling%20Tour!5e0!3m2!1sen!2sbd!4v1717291517702!5m2!1sen!2sbd" 
width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31065980.60377383!2d98.92658012474156!3d18.10698393934153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60037158e41ea381%3A0xf9bae0a7f9f9741!2sTokyo%20Bliss!5e0!3m2!1sen!2sbd!4v1717290742289!5m2!1sen!2sbd' width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

<iframe src=
"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2539791.862396282!2d138.34314176303147!3d35.130261244981476!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x605d1b87f02e57e7%3A0x2e01618b22571b89!2sTokyo%2C%20Japan!5e0!3m2!1sen!2sbd!4v1717288619143!5m2!1sen!2sbd" 
width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
</iframe>

UPDATE tour_packages
SET image_url = '/assets/images/_tokyo.jpg'
WHERE package_id = 73;

UPDATE tour_packages
SET image_url = '/assets/images/sakura.webp'
WHERE package_id = 26;


UPDATE tour_packages
SET image_url = '/assets/images/food.jpg'
WHERE package_id = 75;

UPDATE tour_packages
SET image_url = '/assets/images/highlights.jpg'
WHERE package_id = 74;



alter taxis
add column user_mail varchar 
REFERENCES 
users(email) ON DELETE CASCADE;



CREATE TABLE tours_attractions (
    attraction_id SERIAL PRIMARY KEY,
    location VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    map_url VARCHAR(255),
    blog_content TEXT
);



INSERT INTO tours_attractions (location, name, description, image_url, map_url, blog_content) VALUES
('London, England', 'Tower of London', 'The Tower of London is a historic castle located on the north bank of the River Thames in central London.', 
'/assests/images/london.jpg', 'https://example.com/maps/tower_of_london', 'The Tower of London has served variously as a royal residence, a prison, an armory, a treasury, and a zoo. It is best known for housing the Crown Jewels of England and has been designated as a UNESCO World Heritage Site.');



UPDATE tours_attractions
set image_url = '/assets/images/london.jpg' where attraction_id = 2;


UPDATE tours_attractions
set location = 'England' where attraction_id = 2;


select * from tour_packages where package_id = 75;

UPDATE tour_packages
SET map_url = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3326937.7401162046!2d137.12935345851028!3d35.48046824965551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x605d1b87f02e57e7%3A0x2e01618b22571b89!2sTokyo%2C%20Japan!5e0!3m2!1sen!2sbd!4v1717357743947!5m2!1sen!2sbd'
    WHERE package_id = 75;  