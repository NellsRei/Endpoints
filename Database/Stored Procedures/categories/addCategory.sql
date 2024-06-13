CREATE OR ALTER PROCEDURE addCategory (@id VARCHAR(255), @name VARCHAR(255))
AS
BEGIN
    INSERT INTO Categories VALUES (
        @id, @name
    )
END;