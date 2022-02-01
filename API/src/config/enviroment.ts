import dotenv from "dotenv";

// If running locally, utilize the .env-file for setting environment variables
if (process.env.NODE_ENV === "development") {
  dotenv.config({  path: `src/config/config.env`});
}

const environment = {
  port: process.env.PORT,
};

export default environment;