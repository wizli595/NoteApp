import { config } from "dotenv";
import { cleanEnv } from "envalid";
import { port, str } from "envalid/dist/validators";

// Load environment variables from .env file
config();

export default cleanEnv(process.env, {
  PORT: port(),
  NODE_ENV: str(),
  FRONT_END_URL: str(),
  JWT_KEY: str(),
  SENDINBLUE_PASSWORD: str(),
});
