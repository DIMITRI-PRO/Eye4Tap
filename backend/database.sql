CREATE TABLE
    `users` (
        `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
        `lastname` varchar(45) NOT NULL,
        `firstname` varchar(45) NOT NULL,
        `email` varchar(254) NOT NULL UNIQUE KEY,
        `password` varchar(254) NOT NULL,
        `pseudo` varchar(15) NOT NULL,
        `picture` varchar(254) NULL,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

CREATE TABLE
    `scores` (
        `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
        `value_score` int NOT NULL,
        `id_user` int NOT NULL,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `id_difficulty` int NOT NULL
    );

CREATE TABLE
    `difficulty` (
        `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
        `name` varchar(45) NOT NULL,
        `speed` int NOT NULL,
        `coef_point` FLOAT NOT NULL,
        `malus_point` FLOAT NOT NULL
    )