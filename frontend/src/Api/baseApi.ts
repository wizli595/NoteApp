// apiClientWithUserAgent.js
import axios from "axios";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Get the user-agent string from the browser
const userAgent = navigator.userAgent;

// Helper function to format the current date/time
const getFormattedDateTime = () => {
  const date = new Date();
  const formattedDate = date
    .toISOString()
    .replace("T", " ")
    .replace(/\..+/, "");
  return `[${formattedDate}]`;
};

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    const logEntry = `${getFormattedDateTime()} "${(config.method as string).toUpperCase()} ${config.url} HTTP/1.1" "${userAgent}"`;
    console.log(logEntry);
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for logging
apiClient.interceptors.response.use(
  (response) => {
    const logEntry = `${getFormattedDateTime()} "${response.config.method!.toUpperCase()} ${response.config.url} HTTP/1.1" ${response.status} "${userAgent}"`;
    console.log(logEntry);
    return response;
  },
  (error) => {
    if (error.response) {
      const logEntry = `${getFormattedDateTime()} "${error.config.method.toUpperCase()} ${error.config.url} HTTP/1.1" ${error.response.status} "${userAgent}"`;
      console.error(logEntry, error.response.data);
    } else {
      console.error("Response Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
