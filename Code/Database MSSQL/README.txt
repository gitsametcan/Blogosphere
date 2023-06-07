To setup and connect the database to the webapi.
On SQL Server Management Studio:
1- Execute Creation Query 
2- Execute Filler Query
3- Modify connection-string-query according to needs (if the server is 
secured by an id and a password, you should state them in related fields)
4- Execute connection-string-query
5- Put the result of this query into related field on ConnectionString.cs
6- Put this ConnectionString.cs into "WebAPI/Models/Utils" path, otherwise webapi wont be compiled. 