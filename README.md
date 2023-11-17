# Express api

A simple REST API in Node.js for storing and showing leaderboard of game

## Features


- folder structure for better management
- database in mongodb, integrated with mongoose
- morgan package, for logging incoming requests
- helmet package is used for providing basic protection headers
- basic error handling through middlewares


## API Endpoints

| Methods     | Urls             |Description            |
| ----------- | -----------      | -----------        |
| GET         | api/leaderboard    |Get all results ordered           |
| POST        | api/leaderboard    |Create a new result         |

## Quick Start

Clone the repo.

```bash
https://github.com/AfganAbbas/express-api-leaderboard.git
cd express-api-leaderboard
```
Create the .env file.

```bash
DATABASE_URL = localhost/my-employees
PORT = 5000
```
Install the dependencies.

```bash
npm install
```
To start the express server, run the following.

```bash
npm run dev
```



