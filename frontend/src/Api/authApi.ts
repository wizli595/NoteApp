import axios from "axios";
import { User, Session } from "@prisma/client";
import { UpdateInfo } from "../components/UpdateUser";
import { Password } from "../components/ChangePassword";
import apiClient from "./baseApi";

export type UserInfo = {
  email: string;
  password: string;
  userAgent?: string;
};

/**
 * @description Login with email and password
 * @endpiont POST api/users/
 * @param UserInfo
 * @returns Promise<User>
 * @access Public
 */
const login = async ({
  email,
  password,
  userAgent,
}: UserInfo): Promise<User> => {
  try {
    const result = await apiClient.post<User>("/users", {
      email,
      password,
      userAgent,
    });
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
    await apiClient.post("/users/loggout");
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
    await apiClient.put("/users/", user);
  } catch (err) {
    if (!axios.isAxiosError(err)) {
      console.error("An unexpected error occurred:", err);
      throw new Error("An unexpected error occurred");
    }
    throw err;
  }
};

/**
 * @description Change password
 * @endpiont PUT api/users/password
 * @param Password
 * @returns Promise<void>
 * @access Private
 */
const changePassword = async ({ password, newPassword }: Password) => {
  try {
    await apiClient.put("/users/password", { password, newPassword });
  } catch (err) {
    if (!axios.isAxiosError(err)) {
      console.error("An unexpected error occurred:", err);
      throw new Error("An unexpected error occurred");
    }
    throw err;
  }
};

/**
 * @description Get my session
 * @endpiont GET api/users/sessions
 * @returns Promise<Session[]>
 * @access Private
 */
const getMysession = async () => {
  try {
    const result = await apiClient.get<Session[]>("/users/sessions");
    return result.data;
  } catch (err) {
    if (!axios.isAxiosError(err)) {
      console.error("An unexpected error occurred:", err);
      throw new Error("An unexpected error occurred");
    }
    throw err;
  }
};

/**
 * @description Log out all my sessions
 * @endpiont DELETE api/users/sessions
 * @returns Promise<void>
 * @access Private
 */

const loggoutAllMySessions = async () => {
  try {
    await apiClient.delete("/users/sessions");
  } catch (err) {
    if (!axios.isAxiosError(err)) {
      console.error("An unexpected error occurred:", err);
      throw new Error("An unexpected error occurred");
    }
    throw err;
  }
}
export { login, logout, updateUser, changePassword, getMysession , loggoutAllMySessions};
