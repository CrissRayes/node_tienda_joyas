# Jewels Store API 💎 💍

## Description

This project is a RESTful API for managing and retrieving data.
It provides endpoints to fetch all jewelry items, filter jewelry items based on specific criteria, and retireve detailed information about individual jewelry items.

### Prerequisites

Before running the project, make sure you have the following installed:

- Node.js
- NPM (Node Package Manager)

### Installation

1. Clone the repository
2. Navigate to the project directory.
3. Install the dependencies by running the following command:

```
$ npm install
```

4. Add this line to the package.json file:

```
"scripts": {
    //...
    "dev": "nodemon index.js",
    //...
  },
```

### Setup

1. Create a .env file in the root directory of the project.
2. Add the required environment variables in the .env file. For example:

```
PORT=3000
```

### Usage

1. Start the server by running the following command:

```
$ npm run dev
```

### Endpoints

#### GET /joyas

Fetches all jewelry items.

##### Query parameters:

- **page**: The page number to fetch. Defaults to 1.
- **limits**: The number of items to fetch per page. Defaults to 3.
- **order_by**: The field to order the results by. Defaults to 'id'.

##### Example request:

```
GET /joyas?page=1&limits=3&order_by=price
```

##### Example Response:

```
{
    "totalCount": 6,
    "thisCount": 3,
    "next": "http://localhost:3000/joyas?page=2&limits=3&order_by=id_ASC",
    "previous": null,
    "results": [
        {
            "name": "Collar Heart",
            "href": "/joyas/joya/1"
        },
        {
            "name": "Anillo Cuarzo Greece",
            "href": "/joyas/joya/6"
        },
        {
            "name": "Aros Hook Blue",
            "href": "/joyas/joya/4"
        }
    ]
}
```

#### GET /joyas/filtros

Fetches filtered jewelry items based on specific criteria.

##### Query Parameters

Add the required query parameters based on your filtering requirements.

##### Example Request

```
GET /joyas/filtros?precio_min=25000&precio_max=30000&categoria=aros&metal=plata
```

##### Example Response:

```
[
    {
        "id": 5,
        "nombre": "Anillo Wish",
        "categoria": "aros",
        "metal": "plata",
        "precio": 30000,
        "stock": 4
    }
]
```

#### Error Handling

- If a route is not found, the server will respond with a 404 status and a message "Route not found".
- If any error occurs during the execution of the API, an error message will be logged to the console.
