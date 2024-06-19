## Installation

```bash
$ npm install
```

## Need set .env values

```bash
# App port
APP_PORT=

# Postgres
DB_HOST=
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_PORT=

# JWT
JWT_SECRET=
JWT_EXPIRE=
```

## Running the app

```bash
$ npm run dev

or

$ npm run build

$ npm start
```

## Mini documentation

### Function 1

- Method "POST"
- Endpoint "/register"
- Body {
  "username": "string",
  "password": "string",
  "email": "string"
  }

### Function 2

- Method "POST"
- Endpoint "/login"
- Body {
  "username": "string",
  "password": "string"
  }

### Function 3

- Method "GET"
- Endpoint "/users/me"
- Headers { "Content-Type": "application/json", "Authorization": "jwt token here" }

### Function 4

- Method "PUT"
- Endpoint "/users/role"
- Headers { "Content-Type": "application/json", "Authorization": "jwt token here" }
- Body {
  "user_id": "string",
  "user_role": "USER" // ['ADMIN' | 'USER']
  }

### Function 5

- Method "POST"
- Endpoint "/books"
- Headers { "Content-Type": "application/json", "Authorization": "jwt token here" }
- Body {
  "book_title": "string",
  "book_author": "string",
  "book_publication_date": "string", // example: '2024-06-19'
  "book_genres": "FANTASY" // ['ART' | 'FANTASY' | 'FOLKLORE']
  }

### Function 6

- Method "GET"
- Endpoint "/books"
- Headers { "Content-Type": "application/json", "Authorization": "jwt token here" }

### Function 7

- Method "GET"
- Endpoint "/books/:book_id"
- Headers { "Content-Type": "application/json", "Authorization": "jwt token here" }

### Function 8

- Method "PUT"
- Endpoint "/books"
- Headers { "Content-Type": "application/json", "Authorization": "jwt token here" }
- Body {
  "book_id": "string",
  "book_title": "string",
  "book_author": "string",
  "book_publication_date": "string", // example: '2024-06-19'
  "book_genres": "ART" // ['ART' | 'FANTASY' | 'FOLKLORE']
  }

### Function 9

- Method "DELETE"
- Endpoint "/books/:book_id"
- Headers { "Content-Type": "application/json", "Authorization": "jwt token here" }
