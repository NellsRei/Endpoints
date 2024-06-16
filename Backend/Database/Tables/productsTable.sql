Use Shop;
CREATE TABLE Products(
productsID VARCHAR (255) PRIMARY KEY,
name VARCHAR(255),
description VARCHAR(255),
price INT,
id VARCHAR(255) FOREIGN KEY REFERENCES Categories(id)
)