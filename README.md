## Average row index time on dell inspiron 5567 with one row per request indexing method used is 3.7 ms

## Average query execution without optimizing the table and based on "In" method for 100k is 1663 ms

## Average query execution after optimizing the table and based on "In" method for 100k is 473 ms

## Average query execution without optimizing the table and based on "Join" method for 100k is 1700 ms

## Average query execution without optimizing the table and based on "Join" method for 100k is 527 ms

## The mentioned device could not handle more rows!

# Important  
The provided method is single instance, and direct insert per row, an enhanced version would be to store the rows and use bulk insertion  
The mocked data might be enhanced to simulate more types  
The mentioned optimization is the click house "OPTIMIZE" query  

# Setup
npm i  
npm start

# see results
Results are displayed on the console directly  
You can view the results at any time by  
npm run results

# Enhancement
The provided benchmark considering the worst case ever, that is per simulated request (generated row) an insertion would happen  
The overall performance could be enhanced by:  
Creating a queue with a limited length (100 is the default settings of clickhouse) and storing the rows inside it and then insert the whole queue in one insert query  
A better solution would be to create an in memory stored CSV file and pipe the file to clickhouse