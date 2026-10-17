RBAC + Secure Cookies

## Project Overview
This project implements server-side Role-Based Access Control (RBAC) and secure session cookie configurations to protect against unauthorized access, XSS (Cross-Site Scripting), and CSRF (Cross-Site Request Forgery) attacks. 

It contains a mock login system to simulate regular users and admin users, demonstrating that a protected route is accessible only by users with the correct role.

## Prerequisites
- Node.js installed
- npm (Node Package Manager)

## Installation & Setup

1. Clone this repository and navigate into the folder:
   ```bash
   cd Assignment_7.2
Install the required dependencies:

bash
npm install express cookie-parser
Start the server:

bash
node app.js
The server will run on http://localhost:3000

How to Test (Proof of Both Cases)
You can test the protected route /admin/dashboard using Postman, Insomnia, or curl.

Case 1: Non-Admin User (Expect 403 Forbidden)
Make a POST request to http://localhost:3000/login-user to receive a regular user session cookie.

Make a GET request to http://localhost:3000/admin/dashboard.

Expected Result: The server responds with 403 Forbidden and the message "Insufficient permissions".

Case 2: Admin User (Expect 200 OK)
Make a POST request to http://localhost:3000/login-admin to receive an admin session cookie.

Make a GET request to http://localhost:3000/admin/dashboard.

Expected Result: The server responds with 200 OK and the message "Welcome to the admin dashboard!".

Secure Cookie Configuration
The session cookie is configured with the following flags in app.js:

httpOnly: true: Prevents JavaScript (including malicious XSS scripts) from reading the session cookie via document.cookie.

secure: false (for local dev): Ensures the cookie is only sent over HTTPS. (Note: This is temporarily set to false to allow testing over local HTTP. It must be set to true in production).

sameSite: 'strict': Prevents the browser from sending the cookie along with cross-site requests, acting as a primary defense against CSRF attacks.
# RBAC-Secure-Cookies
