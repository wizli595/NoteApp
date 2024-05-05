import axios from "axios";
import { User } from "@prisma/client";
import { UpdateInfo } from "../components/UpdateUser";
import { Password } from "../components/ChangePassword";

export type UserInfo = {
  email: string;
  password: string;
};

/**
 * @description Login with email and password
 * @endpiont POST api/users/
 * @param UserInfo
 * @returns Promise<User>
 * @access Public
 */
const login = async ({ email, password }: UserInfo): Promise<User> => {
  try {
    const result = await axios.post<User>("/api/users", { email, password });
    const user = result.data;
    return user;
  } catch (err) {
    if (!axios.isAxiosError(err)) {
      console.error("An unexpected error occurred:", err);
      throw new Error("An unexpected error occurred");
    }
    // console.log(err.response?.data);
    throw err;
  }
};
/**
 * @description Log out
 * @endpiont POST api/users/loggout
 * @returns Promise<void>
 * @access Private
 *
 */
const logout = async () => {
  try {
    await axios.post("/api/users/loggout");
  } catch (err) {
    if (!axios.isAxiosError(err)) {
      console.error("An unexpected error occurred:", err);
      throw new Error("An unexpected error occurred");
    }
    throw err;
  }
};
/**
 * @description Update user
 * @endpiont PUT api/users
 * @param user UpdateInfo
 * @returns Promise<void>
 * @access Private
 */
const updateUser = async (user: UpdateInfo) => {
  try {
    await axios.put("/api/users/", user);
  } catch (err) {
    if (!axios.isAxiosError(err)) {
      console.error("An unexpected error occurred:", err);
      throw new Error("An unexpected error occurred");
    }
    throw err;
  }
};
const changePassword = async ({ password, newPassword }: Password) => {
  try {
    await axios.put("/api/users/password", { password, newPassword });
  } catch (err) {
    if (!axios.isAxiosError(err)) {
      console.error("An unexpected error occurred:", err);
      throw new Error("An unexpected error occurred");
    }
    throw err;
  }
};
export { login, logout, updateUser, changePassword };
