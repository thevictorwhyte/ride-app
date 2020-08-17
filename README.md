# ride-app
A car booking app made with React Native, Node, Express, and Socket.io. 

NOTE: If you want to run this project on your local pc do the following.
1. Clone the repo.
2. Run `npm install`.
3. Create a file in src/utilis called `api.js` and write the following code:
  ```
  const API_KEY = '<YOUR GOOGLE API KEY>';
  
  export default API_KEY;
  ```
  This is so the api calls made to google apis in the redux action goes through.
