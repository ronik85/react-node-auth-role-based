# Authentication Service

This project provides a simple user authentication system with **email verification** and **login functionality** for two roles: **admin** and **customer**. It includes features for:

- User registration with validation
- Email verification with an expiry time
- Admin and customer login with role-based authentication
- Password encryption using **bcryptjs**
- Request data validation using **Joi**

## Features

- **Registration**: Users can register by providing their first name, last name, email, password, and role.
- **Email Verification**: A verification code is sent to the user's email after registration. The code is valid for 15 minutes.
- **Login**: Users can log in as either `admin` or `customer`. Admin-only access is enforced.
- **Password Security**: Passwords are hashed using **bcryptjs** before being saved to the database.
- **Rate Limiting**: To protect against brute-force attacks, login attempts are limited using **express-rate-limit**.
- **Validation**: All inputs are validated using **Joi**.

## Prerequisites

- Node.js v14+ and npm
- Sequelize (ORM for interacting with the database)
- A relational database (e.g., MySQL)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/authentication-service.git
cd authentication-service
