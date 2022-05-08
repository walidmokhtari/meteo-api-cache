# 🌩 Meteo api cache

## 📚 Some infos


| Library used          | Utility                    |
| --------------------- | ------------------         |
| cors                  | authorized all api calls   |
| dotenv                | Make environment variables |
| Express               | Create app                 |
| node-cache            | Save data returned by api  |
| node-fetch            | api calls                  |


📲 Launch the app :  
* Don't forget to update your .env.example to .env and set variables_
* Execute 'npm install' to install all packages
* Execute 'npm run dev' to lunch the app

## Features
* GET endpoint to get town information, the api will be save it in cache and return only town information who we need in our app
* GET endpoint to get town forecast weather, save it in cache, and return filtred information