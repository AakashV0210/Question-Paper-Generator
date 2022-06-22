CREATE TABLE users
(id BIGSERIAL PRIMARY KEY NOT NULL,
name VARCHAR(200) NOT NULL,
email VARCHAR(200) NOT NULL,
password VARCHAR(200) NOT NULL,
UNIQUE (email));
-- INSERT INTO teachers (name, email, password)
-- VALUES ('Conor', 'conbailey@gmail.com', 'password');

CREATE TABLE question_paper(
    id SERIAL PRIMARY KEY NOT NULL,
    syllabus VARCHAR(10) NOT NULL,
    semester INT NOT NULL,
    chapter VARCHAR(25) NOT NULL,
    unit INT NOT NULL,
    marks INT NOT NULL,
    priority INT NOT NULL,
    question VARCHAR(255) UNIQUE
);

-- CREATE TABLE question_paper(
--     id SERIAL PRIMARY KEY,
--     syllabus VARCHAR(10),
--     semester INT,
--     chapter VARCHAR(25),
--     unit INT,
--     marks INT,
--     priority INT,
--     question VARCHAR(255)
-- );

-- ALTER TABLE question_paper ADD CONSTRAINT unique_question UNIQUE (question);

-- CREATE TABLE todo(
--     todo_id SERIAL PRIMARY KEY,
--     description VARCHAR(225)
-- );