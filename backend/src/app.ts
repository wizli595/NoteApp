import "dotenv/config";
import express from "express";
import { errorhandler, notFound } from "./middleware/ErrorHandler";
import noteRouter from "./routes/note-route";
import userRouter from "./routes/user-route";
import morgan from "morgan";
import { accessLogStream } from "./utils/accessLogStream";
import cors from "cors";
import cookieSession from "cookie-session";
import env from "./utils/validateEnv";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();
const front = env.FRONT_END_URL;

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Notes/Users API",
      version: "1.0.0",
      description: "Notes/Users API Information",
      contact: {
        name: "Abdessalam Ouazri",
      },
      servers: ["http://localhost:5000"],
    },
  },
  apis: ["./src/routes/*.ts"],
};

app.use(
  cors({
    origin: front,
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(morgan("combined", { stream: accessLogStream(__dirname) }));

app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);
app.use(express.json());
const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/notes", noteRouter);
app.use("/api/users", userRouter);

app.use(notFound);
app.use(errorhandler);

export default app;
