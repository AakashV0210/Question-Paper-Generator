CREATE TABLE users
(id BIGSERIAL PRIMARY KEY NOT NULL,
name VARCHAR(200) NOT NULL,
email VARCHAR(200) NOT NULL,
password VARCHAR(200) NOT NULL,
UNIQUE (email));
-- INSERT INTO teachers (name, email, password)
-- VALUES ('Conor', 'conbailey@gmail.com', 'password');

CREATE TABLE question_paper(
    id SERIAL PRIMARY KEY,
    syllabus VARCHAR(10),
    semester INT,
    chapter VARCHAR(25),
    unit INT,
    marks INT,
    priority INT,
    question VARCHAR(255)
);

-- CREATE TABLE todo(
--     todo_id SERIAL PRIMARY KEY,
--     description VARCHAR(225)
-- );