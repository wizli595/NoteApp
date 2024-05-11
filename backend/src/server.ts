import env from "./utils/validateEnv";
import app from "./app";
console.clear();
const PORT = env.PORT;
// const HOST = '::1';

app.listen(PORT, () => {
  console.log("APPs IS RUNNING " + PORT);
});
