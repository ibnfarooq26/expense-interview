# expense-interview

## APIs
1) /expense
    GET- to get all the expenses in DB directly
    POST- to create new expense
2) /expense/{id}
    GET= to get expense by ID
3) /createReport
    POST- to get report in CSV file. From date and To date has to be provided.
4) /categoryReport
    POST- to get report by category in CSV file. From date and to date have to be provided.
 ## EndPoints:
 
 import the 'openapi.yml' to https://editor.swagger.io/ for testing endpoints
 
 ## command to Build docker image.
 
 docker build -t APPNAME .
 
 ## command to run the docker image
 
 docker run --publish 4000:4000 image-name
 
 ## Mongodb atlas environment has to be provided to create DB.
 
  DB_URI is the environment variable.
