import axios from "axios";
import { User } from "@prisma/client";

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
export { login };
