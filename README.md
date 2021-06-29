# GiveIndia-Dashboard
## setting up environment
* installing node.js from https://nodejs.org/en/
## setting up backend server
* make a `.env` file in **Server** folder
![image](https://user-images.githubusercontent.com/77455093/123831639-2a7eca80-d922-11eb-8ca0-e17a2a731865.png)  
* fill up server credentials in `.env` file (PORT = 3000, PGPORT = 5432)  
![image](https://user-images.githubusercontent.com/77455093/123831794-4edaa700-d922-11eb-976f-54e2f7ed4f3c.png)
## How to run
* open cmd inside **Server** folder
* use `npm start` command in cmd  
![image](https://user-images.githubusercontent.com/77455093/123833647-31a6d800-d924-11eb-8ca0-719ab91527d8.png)
* if this output showes up then run was successful 
![image](https://user-images.githubusercontent.com/77455093/123833931-7f234500-d924-11eb-8fa4-2ea352f2f049.png)
* goto this url `http://localhost:3000/api/getPrograms` for requesting every program
* goto this url `http://localhost:3000/api/getPrograms/1` where 1 is id of a program
