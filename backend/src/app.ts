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

const app = express();
const front = env.FRONT_END_URL;

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

app.use("/api/notes", noteRouter);
app.use("/api/users", userRouter);

app.use(notFound);
app.use(errorhandler);

export default app;
