# PennyCart

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨


prerequisites (install):
- MongoDB
- NodeJS
- NestJS

## Build and Run
 All you need is apinning up the following 
 - front-end "custmer" ```nx serve custmer ```
 - back-end "api" ```nx serve api ```
 - Mongodb "DB": can either be run and connected locally using Port ```27017 ``` ```brew services restart mongodb-community ```
   Or configure MONGODB_CONNECTION_STRING in .env file to use remote cluster.

   ENV
   ```
    JWT_SECRET="secret"
    JWT_EXPIREIN="8h"
    
    NODE_ENV=development
    
    MONGODB_CONNECTION_STRING=MONGO URL 
   ```
   
