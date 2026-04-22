USE finans_sida;
CREATE DATABASE IF NOT EXISTS finans_sida;


CREATE TABLE IF NOT EXISTS users (
    ID INT NOT NULL AUTO_INCREMENT,
    Email VARCHAR(255) NOT NULL,
    Username VARCHAR(100) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    PRIMARY KEY (ID),
    UNIQUE KEY unique_email (Email),
    UNIQUE KEY unique_username (Username)
);
