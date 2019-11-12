# Open Survey Backend

This is the code for the Open Survey server, written in Express with a PostgreSQL database.

# Availble Scripts

### `npm run initDB`

Creates database tables

### `npm run seedDB`

Creates tables for the database and seeds it with some sample data

### `npm run dev`

Start the server

### `npm run document`

Runs the automated documentation writer [(documentation.js)](https://github.com/documentationjs/documentation/)

# Architecture

The server is split into four main layers, each with their own purpose and context. The four layers, in order of depth, are:

-   routes
-   controllers
-   servcies
-   db (database)

## [Routes](https://github.com/cyores/opensurvey/tree/master/src/backend/src/routes)

-   Function: routing
-   Context: HTTP

When an HTTP request hits the server, the routes file will direct the request to the appropriate controller's function.

#### Example

If the server receives a `POST` request to `/survey`, the routes file will direct the request to the survey's controller function `postSurvey`.

## [Controllers](https://github.com/cyores/opensurvey/tree/master/src/backend/src/controllers)

-   Function: extracting data
-   Context: HTTP

Controllers are responsible for extracting any data from the request object and passing it on to the relevant service. Controllers are responsible for switching from HTTP context to application context.

#### Example

Let's say the `postSurvey` function has been called. The controller (in this case the survey controller), will extract the survey JSON object from the request's body and pass it on the the servey service by calling the `createSurvey` function of the survey service.

## [Services](https://github.com/cyores/opensurvey/tree/master/src/backend/src/services)

-   Function: format data (if necessary), make external API calls, make calls to the db files
-   Context: application

Services make the calls to the db files or any external API's. Services take the data given to it from the controller and format it for insertion into the database (if necessary). They are also responsible for taking the rows returned from a database file and formatting them into the expected JSON format. Since services are in the application context, they are independant of the framework used. This means Express can be swapped out for some other framework and no changes need to be made to any of the service files. It would also be possible to change databases without changing service files.

#### Example

Let's say the `createSurvey` function has been called. The service file will format the data in a way that can been inserted into the database, then call the relevant database file to perform the insertion. A service can call any database file.

## [Database](https://github.com/cyores/opensurvey/tree/master/src/backend/src/db)

-   Function: make database calls
-   Context: database

The database files simply perform queries on the Postgres database. The receive formatted data from the service, create the query, then return the result of the query.

<br>

# API Endpoints

## Surveys

| Method | Route                                                             | Description                                                                                                                                                                             | Example                                                    |
| ------ | ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `GET`  | `/api/surveys?search={query}&filter={filter options}&sort={sort}` | returns an array of all surveys according to search (by survey name), filter (open, opening soon, closing soon, closed), and sort (new, old, az) parameters. All parameter are optional | `?search=music&filter=open&sort=az`                        |
| `GET`  | `/api/survey/:id`                                                 | returns the survey with the matching id                                                                                                                                                 |
| `POST` | `/api/survey`                                                     | creates the survey                                                                                                                                                                      | { name, desc, author, openDate, closeDate, questions: [] } |

## Responses

| Method | Route           | Description        | Example                        |
| ------ | --------------- | ------------------ | ------------------------------ |
| `POST` | `/api/response` | creates a response | { surveyID, questionID, text } |
