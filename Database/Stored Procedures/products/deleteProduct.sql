CREATE OR ALTER PROCEDURE deleteProduct (@productsID VARCHAR(255))
AS
BEGIN
    DELETE FROM Products WHERE productsID = @productsID
END;