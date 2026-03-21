import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Map raw technical errors to user-friendly messages
const sanitizeError = (raw: any): string => {
  const msg = (typeof raw === "string" ? raw : String(raw)).toLowerCase();
  if (
    msg.includes("buffering timed out") ||
    msg.includes("econnrefused") ||
    msg.includes("503") ||
    msg.includes("database connection")
  )
    return "Server connection issue. Please try again.";
  if (msg.includes("network") || msg.includes("failed to fetch"))
    return "Network error. Please check your connection.";
  if (msg.includes("invalid email or password"))
    return "Invalid email or password.";
  if (msg.includes("already exists"))
    return "An account with this email already exists.";
  // Pass through clean short messages from the server
  if (typeof raw === "string" && raw.length < 120 && !raw.includes("at Object") && !raw.includes(".js:"))
    return raw;
  return "Something went wrong. Please try again.";
};

interface AuthState {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
};

export const APIURL = import.meta.env.VITE_BACKEND_URL;

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${APIURL}/api/students/login`, userData);
      return res.data;
    } catch (error: any) {
      const msg = error.response?.data?.message || error.message || "Login failed";
      return rejectWithValue(sanitizeError(msg));
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${APIURL}/api/students/register`, userData);
      return res.data;
    } catch (error: any) {
      const msg = error.response?.data?.message || error.message || "Registration failed";
      return rejectWithValue(sanitizeError(msg));
    }
  },
);

export const getMe = createAsyncThunk(
  "auth/getMe",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState() as { auth: AuthState };
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const res = await axios.get(`${APIURL}/api/students/me`, config);
      return res.data;
    } catch (error: any) {
      const msg = error.response?.data?.message || error.message || "Failed to fetch user";
      return rejectWithValue(sanitizeError(msg));
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || action.payload;
        if (action.payload?.token) {
          state.token = action.payload.token;
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || action.payload;
        if (action.payload?.token) {
          state.token = action.payload.token;
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get Me
      .addCase(getMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.token = null;
        localStorage.removeItem("token");
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
