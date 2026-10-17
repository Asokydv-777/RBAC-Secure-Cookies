const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser()); 

function requireRole(role) {
  return function (req, res, next) {
    
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({
        error: { message: "Insufficient permissions", code: "Forbidden" },
      });
    }
    next();
  };
}

app.post("/login-user", (req, res) => {
  res.cookie("session_id", "user-session-123", {
    httpOnly: true, 
    secure: false, 
    sameSite: "strict", 
    maxAge: 1000 * 60 * 60,
  });
  res.json({ message: "Logged in as regular user" });
});

app.post("/login-admin", (req, res) => {

  res.cookie("session_id", "admin-session-999", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60,
  });
  res.json({ message: "Logged in as admin" });
});


function mockAuth(req, res, next) {
  const sessionId = req.cookies.session_id;

  if (sessionId === "admin-session-999") {
    req.user = { name: "Admin Bob", role: "admin" };
  } else if (sessionId === "user-session-123") {
    req.user = { name: "Normal Alice", role: "user" };
  }

  next();
}


app.get("/admin/dashboard", mockAuth, requireRole("admin"), (req, res) => {
  res.json({ message: "Welcome to the admin dashboard!", user: req.user });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
