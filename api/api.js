import axios from "axios";
import { getAuth } from "firebase/auth";

// -----------------------------------------------------------------------------------------------------------------------
// API Configuration
// --------------------------------------------------
// For React Native apps, 'localhost' won't work on physical devices or some emulators.
// Use your machine's local IP address instead. Find it with:
// - Windows: Run 'ipconfig' in CMD and look for IPv4 Address
// - Replace 'localhost' with your machine's IP (e.g., "http://192.168.1.5:3000/api")
// Ensure your backend server accepts connections from all network interfaces, not just localhost

const api = axios.create({
  // baseURL: "http://localhost:3000/api",
  // baseURL: "http://192.168.0.106:3000/api",
  baseURL: "https://strandbyme-api-prod.vercel.app/api",
});

// -----------------------------------------------------------------------------------------------------------------------
// Request interceptor
api.interceptors.request.use(
  async (config) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// -----------------------------------------------------------------------------------------------------------------------
// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Response Error:", error.response.data);
      console.error("Status:", error.response.status);
      console.error("Headers:", error.response.headers);

      // Custom handling for specific status codes
      if (error.response.status === 401) {
        // Unauthorized access - maybe redirect to login
        console.error("Unauthorized access - redirecting to login");
        // Perform your redirection or other custom handling here
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Request setup error:", error.message);
    }

    // Log the error to your server logs if needed
    // For example, you could send the error to an error logging service

    // Add any custom error handling here, such as showing a notification to the user
    // or redirecting to an error page

    return Promise.reject(error);
  }
);

// -----------------------------------------------------------------------------------------------------------------------
export default api;
