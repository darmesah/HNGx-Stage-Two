UML Diagram Link: https://drive.google.com/file/d/1Mep71l5rpmJZJvWLdMtfE1PVNat-RSTT/view
Postman Testing and Documentation Link:

Tools used in this project:

    - MongoDB Database (Using Mongoose ODM)
    - Draw.io for UML Diagram
    - Postman for Documentation and Testing
    - TypeScript

This project is currently hosted on render and a live MongoDB database, so there is no need for extra setup.

Database Schema:

    User {
        name: string (required);
        email: string;
        phone: string;
    }

A CRUD project with 4 enpoints:

    - Create User Endpoint (POST) "url/api/": Allows you to create a new user by passing in the name of the user using a json body format. Other values such as email and phone will be empty by default as they are not required values. The name value is validated to make sure it is a string and throws an understandable error message if otherwise. It returns the json format of the user information if the user was created successfully.

    - Get a User Endpoint (GET) "url/api/id" or "url/api/name" : Queries the database for a user whose id or name match the url param. It throws an understandable error if no user with the name or id is found, and returns the json format of the user information if the user information is gotten successfully.

    - Update User Endpoint (PATCH) "url/api/id" or "url/api/name": Firstly queries the database for a user whose id or name match the url param. It throws an understandable error if no user with the name or id is found. Values that are to be updated can be passed in as json body and it accepts the values: name, email and phone. Validation for name is also included here.

    - Delete User Endpoint (DELETE) "url/api/id" or "url/api/name": Firstly queries the database for a user whose id or name match the url param. It throws an understandable error if no user with the name or id is found. And if the user exists, it removes their data from the database.
