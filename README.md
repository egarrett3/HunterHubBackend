# Backend for HunterHub

## Architecture

 - Used Node.js with express for routing and Mongoose for ODM MongoDB connection

## Running locally

 - To run without a frontend, see the scripts in package.json; Nodemon wraps 
 node to automatically show changes. I.e. run 'server' for dev and run 'start'
 for prod.

 - To run dev environment with Frontend, Pull backend and frontend into same 
 folder locally. Then run ' npm i concurrently '...
 In your newly created package.json file add this line under scripts:

"dev": "concurrently \"cd frontend && npm start\" \"cd backend && npm run server\""

Then cd into the folder with both frontend and backend and execute npm run dev 
command. A proxy is established in frontend so both ends can communicate. 
Go to localhost:3000 to see app.

