CREATE OR ALTER PROCEDURE updateProduct (@productsID VARCHAR(255), @name VARCHAR(255), @description VARCHAR(255),
@price INT, @id VARCHAR(255))
AS
BEGIN
    UPDATE Products SET name =@name , description = @description, price =@price where productsID = @productsID
END;