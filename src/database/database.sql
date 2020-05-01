/**
*
    SQL file
*   Schemas and most used querys for test database
*
*/


CREATE TABLE Users (

    id INT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,

    createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ( id )

);


INSERT INTO Users ( name, lastname, email, password, createdAt, updatedAt )
VALUES ( 'Todd', 'Davis', 'todd.davis@gmail.com', 'abc123', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP );


SHOW TABLES;
SELECT * FROM Users;

DROP TABLE Users;
