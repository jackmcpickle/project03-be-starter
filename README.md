# Project03 BE Starter

## Setup

- copy .env.example to .env and fill in values for each env key. `MONGODB_URI` , `SECRET_TOKEN`, `TOKEN_EXPIRY`
- Run `npm ci` to install all node packages 
- Seed database with test users. Run `npm run seed` to create 

## Run 
- `npm start` to kickoff express and apollo graphql server. 
- Test the login graphql mutation in postman with the variables for the seeds 


### Login mutation

```gql
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      _id
      email
      firstName
      lastName
    }
  }
}
```
