# to-do-Notes App

## Objcetive 
Develop a simple backend system to manage to-do notes. The system should include basic APIs for creating, updating, retrieving, and deleting notes.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

The application is built in Node JS. There are some toolset which one needs to have on their machine.
## Database: postgresql

## NodeJS

It is advisable to use [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm#install--update-script) to install NodeJS.
The current version of NodeJS being used for development and deployment is 18.15.3.

Once the NVM is installed, please install following command to install NodeJS -

```bash
nvm install v18.15.3
```

OR (For Latest Version)

```bash
nvm install --lts
```

## Setup Services

1. Run `npm i` or `npm install` to install dependencies of the project.  
2. Setup a database of preferred name. (*note_app_db* suggested)


### Set up the App

To get the app setup and running -

1. Run migrations using `npm run migrate` or `npx sequelize-cli db:migrate`.
2. Inside the database, bverify "Note" Table creation .

The example payload is  set in **template.env** of this microservice.

## start service
1. build project using `npm run build`
2. start project using `npm run start`

## Endpoints

### 1 for fetching all notes list
HttpType: GET
URL: http://localhost:{{PORT USED In ENV}}/notes

Response Example:
{
    "collection": [
        {
            "Id": "2",
            "Title": "Testing notes",
            "Description": "Testing ",
            "CreatedAt": "2025-02-01T12:46:49.858Z"
        }
    ],
    "count": 1
}

### 2 for get particular note
HTTP_TYPE: GET
URL: http://localhost:{{PORT USED In ENV}}/notes/:id

Response example:
{
    "data": {
        "Id": "2",
        "Title": "Testing notes",
        "Description": "Testing ",
        "CreatedAt": "2025-02-01T12:46:49.858Z"
    }
}

### 3 for  add new record
HTTP_TYPE: POST
URL: http://localhost:{{PORT USED In ENV}}/notes/add
Request Payload example:
in body:
{
    "Title": "Testing notes",
    "Description": "Testing "
}

Response Payload example:
{
    "message": "Note created successfully",
    "note": "3"
}

### 4. to delete note
HTTP_TYPE: DELETE
URL: http://localhost:{{PORT USED In ENV}}/notes/:id
Response:
{
    "message": "Note deleted successfully"
}

Enjoy 👍
