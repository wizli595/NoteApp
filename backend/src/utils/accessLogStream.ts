import fs from "fs";
import path from "path";

export const accessLogStream = (dirname: string) =>
  fs.createWriteStream(path.join(dirname, "access.log"), { flags: "a" });
