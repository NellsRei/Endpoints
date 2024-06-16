CREATE OR ALTER PROCEDURE getProduct (@productsID VARCHAR(255))
AS
BEGIN
    SELECT * FROM Products WHERE productsID = @productsID
END;