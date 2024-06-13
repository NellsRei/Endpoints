CREATE OR ALTER PROCEDURE getCategoryProducts (@id VARCHAR(255))
AS
BEGIN
    SELECT * FROM Products WHERE id = @id
END;