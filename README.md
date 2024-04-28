# Whirlpool

A [Request Bin](https://pipedream.com/requestbin) clone for receiving and debugging webhooks.

Whirlpool allows users to create "bins" to collect & inspect HTTP requests, including webhooks. Request information is stored in both PostgreSQL and MongoDB (mostly to gain experience working with both SQL and NoSQL databases).

The React frontend automatically refreshes when a new HTTP request is sent to a bin by using websockets set up with Socket.io.

## Setup

### Create `.env` files

#### Within the `backend` directory

Create a `.env` file in the `backend` directory with the following variables:

| Variable Name  | Description  | Example Value |
|---|---|---|
| `HOST`  | The host where Whirlpool's backend runs. | `localhost`  |
| `BACKEND_PORT` | The port for the Whirlpool backend server. | `3000`  |
| `USER`  | The username of the PostgreSQL account for accessing the PostgreSQL server. | `whirlpool`  |
| `PASSWORD`  | The password for the PostgreSQL account. |  `password` |
| `DATABASE`  | Name for the PostgreSQL database Whirlpool will use to persist data. | `whirlpool`  |
| `PORT`  | Port that the PostgreSQL server runs on. |  `5432` |
|  `MONGODB_CONNECTION_STRING` | Connection string for accessing MongoDB. | `mongodb://localhost:27017/requests`  |

#### Within the `frontend` directory

Create a `.env` file in the `frontend` directory with the following variable:
| Variable Name  | Description  | Example Value |
|---|---|---|
| `VITE_BACKEND_URL` | The URL where the Whirlpool backend server runs. | `http://localhost:3000`  |

### Setup PostgreSQL

If you need to install PostgreSQL, run the `install_postgres.sh` file found inside the `backend` directory..

To initialize the PostgreSQL `whirlpool` database, run the `setup_postgres.sh` file found inside the backend folder.

Before running either file, grant them permission to run on your machine with the following `chmod +x script-name-here.sh`.

### Setup MongoDB

The `MONGODB_CONNECTION_STRING` can be for either a remote or local MongoDB database. Refer to [MongoDB](https://www.mongodb.com/docs/manual/) for instructions on setting up a MongoDB database.

## Running Whirlpool

1. Run `npm install` in the `backend` directory.
2. Run `npm start` in the `backend` directory.
3. Run `npm install` in the `frontend` directory.
4. Run `npm start` in the `frontend` directory.
5. Navigate to port `5173` to access Whirlpool's landing page.

# Credits

Logo - spiral by Michael Dingle from <a href="https://thenounproject.com/browse/icons/term/spiral/" target="_blank" title="spiral Icons">Noun Project</a> (CC BY 3.0)