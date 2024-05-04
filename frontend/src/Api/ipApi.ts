import axios from "axios";
/**
 * @description Fetch User IP
 * @endpoint  https://api64.ipify.org?format=json
 * @return Promise<string>
 * @throws Error
 */

async function fetchUserIP(): Promise<string> {
  try {
    const response = await axios.get("https://api64.ipify.org?format=json");
    return response.data.ip;
  } catch (error) {
    console.error("Error fetching user IP:", error);
    throw error;
  }
}

export default fetchUserIP;
