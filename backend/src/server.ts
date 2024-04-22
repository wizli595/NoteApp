import env from "./utils/validateEnv";
import app from "./app";
console.clear();
const PORT = env.PORT;

app.listen(PORT, () => {
  console.log("APPs IS RUNNING " + PORT);
});
