import { createClient } from "@supabase/supabase-js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config({ path: "../.env" });

const app = express();
app.use(express.json());
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

const frontend_url_prod = process.env.FRONTEND_URL_PROD;
// const frontend_url_dev = process.env.FRONTEND_URL_DEV || "";

// Allow CORS
const corsOptions = {
  origin: frontend_url_prod,
  credentials: true,
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

// Use CORS middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

const url = process.env.SUPABASE_URL || "";
const key = process.env.SUPABASE_KEY || "";

// Create a single supabase client for interacting with your database
const supabase = createClient(url, key, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
});
console.log("Supabase client created");

app.post("/api/auth/signup", async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  if (error) {
    res.status(400).json({ error: error.message });
  } else {
    res
      .status(200)
      .json({ userData: data.user, message: "User signed up successfully" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  // console.log(req.body);
  const { email, password, auth_type } = req.body;
  if (!email || !auth_type) {
    res.status(400).json({ error: "Email and auth_type are required" });
  }
  if (auth_type === "password") {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      res.status(400).json({ error: error.message });
    } else {
      res
        .status(200)
        .json({
          userData: data.user,
          sessionData: data.session,
          message: "User logged in successfully",
        });
    }
  }
  //   if (auth_type === "otp") {
  //     const { data, error } = await supabase.auth.signInWithOtp({
  //       email: email,
  //       options: {
  //         emailRedirectTo: "http://localhost:5173",
  //       },
  //     });
  //     if (error) {
  //       res.status(400).json({ error: error.message });
  //     } else {
  //       res.status(200).json({ userData: data.user, sessionData: data.session });
  //     }
  //   }
});

app.post("/api/auth/logout", async (req, res) => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(200).json({ message: "User logged out successfully" });
  }
});

app.post("/api/auth/forgot-password", async (req, res) => {
  const { email } = req.body;
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${frontend_url_prod}/reset-password`,
  });

  if (error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(200).json({ data, message: "Password reset email sent" });
  }
});

app.post("/api/auth/update-password", async (req, res) => {
  const { new_password } = req.body;
  const { data, error } = await supabase.auth.updateUser({
    password: new_password,
  });
  if (error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(200).json({ data, message: "Password updated successfully" });
  }
});

app.post("/api/auth/update-session", async (req, res) => {
  const { access_token, refresh_token } = req.body;
  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
  if (error) {
    res.status(400).json({ error: error.message });
  }
  res
    .status(200)
    .json({
      sessionData: data.session,
      message: "Session updated successfully",
    });
});
