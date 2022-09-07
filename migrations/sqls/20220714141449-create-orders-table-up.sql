/* Replace with your SQL commands */
CREATE TYPE statusENUM AS ENUM ('active','complete');

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status statusENUM default 'active',
    user_id bigint REFERENCES users(id) NOT NULL
);

