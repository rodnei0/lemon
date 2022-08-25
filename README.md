# Lemon API

## About

An API made to check if clients are eligible to be part of Lemon

## Technologies

- Node.js
- Express
- Navigation (Router)
- Jest

## How to run with Docker

1. Clone this repository
```bash
git clone https://github.com/rodnei0/lemon
```

2. Open a terminal in the repository directory and run:
```bash
docker-compose up
```

3. Lemon API is ready! Make a POST request to localhost: 
```bash
http://localhost:5000/iseligible
```

## How to run locally

1. Clone this repository
```bash
git clone https://github.com/rodnei0/lemon
```

2. Install dependencies
```bash
npm i
```

3. Create a .env file following the env.example
```bash
PORT=5000
```

4. Run the app with
```bash
npm run dev
```

5. Lemon API is ready! Make a POST request to localhost: 
```bash
http://localhost:5000/iseligible
```
## How to run tests

1. Open a terminal in the repository directory and run:
```bash
npm run test
```