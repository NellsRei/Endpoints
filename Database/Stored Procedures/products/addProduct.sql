Use Shop;
GO
CREATE OR ALTER PROCEDURE addProduct (@productsID VARCHAR(255), @name VARCHAR(255), @description VARCHAR(255),
@price INT, @id VARCHAR(255))
AS
BEGIN
    INSERT INTO Products VALUES (
        @productsID, @name, @description, @price, @id
    )
END;
GO