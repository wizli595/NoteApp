import axios from "axios";
import { ErrorResponse } from "../pages/LoginPage";
import { toast } from "react-toastify";

export const formatError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        const errorData = error.response?.data as ErrorResponse;
        const serverMessage = errorData.message || "Something went wrong!";
        toast.error(serverMessage);
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred");
      }
}