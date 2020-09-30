# Boilerplate nodejs api with jwt authentication

### 1. Clone repository
### 2. Add .env file in root directory with the following key=value
    PORT = localhost port
    MONGODB_URI = Conenction string to Mongodb 
    JWT_SECRET = some secret text
### 3. Use the following end points in postman
    POST Request "domain/signup" with an email and password json passed in the body
    POST Request "domain//login" with the same email and password = returns jwt token to use in all following request
    
### 4. Use "passport.authenticate("jwt", { session: false })" as a middleware for all authorized routes
### 5. pass the token in the "Authentication" header 
    
