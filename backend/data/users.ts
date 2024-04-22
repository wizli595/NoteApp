import bycrypt from "bcryptjs";
const users = [
  {
    username: "johndoe",
    email: "john.doe@example.com",
    password: bycrypt.hashSync("pass", 10),
  },
  {
    username: "janedoe",
    email: "jane.doe@example.com",
    password: bycrypt.hashSync("pass", 1),
  },
];
export default users;
