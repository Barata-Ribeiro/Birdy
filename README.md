# Birdy 🐦

Birdy is an Instagram-like social media platform for bird enthusiasts to share and explore various bird species through their photographs. This repository contains both the RESTful API and the Frontend implementation of Birdy, providing a robust social network for user interactions, photo uploads, comments, and more. The API is a robust and scalable backend service designed to support Birdy. It handles user authentication, photo uploads, comments, likes, followings, and provides essential security features to ensure user data protection. It's built with Node.js and TypeORM.

## Demo 🎥

![Birdy](screenshot_demo.jpg "Birdy")

**Live Demo**: [Birdy](https://birdy-social.vercel.app/)

## Main Technologies 🚀

### Backend

- [Node.js](https://nodejs.org/): JavaScript runtime built on Chrome's V8 JavaScript engine.
- [TypeORM](https://typeorm.io/): An ORM that can run in Node.js and supports multiple database systems.
- [Express.js](https://expressjs.com/): A minimal and flexible Node.js web application framework.
- [Postgres](https://www.postgresql.org/): A powerful, open-source object-relational database system.
- [Cloudinary](https://cloudinary.com/): Cloud-based image and video management services.
- [JWT(JSON Web Tokens)](https://jwt.io/): For secure user authentication.
- [Nodemailer](https://nodemailer.com/): For sending emails from Node.js applications.

### Frontend

- [Next.js](https://nextjs.org/): A React framework for building fast web applications.
- [React](https://react.dev/): A JavaScript library for building user interfaces.
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapid UI development.
- [Victory](https://commerce.nearform.com/open-source/victory/): A collection of composable React components for building interactive data visualizations.
- [Sharp](https://sharp.pixelplumbing.com/): High-performance image processing in Node.js.

## Setup 💻

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Barata-Ribeiro/Birdy.git
   cd Birdy/server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the `backend` directory and add the following variables:
   ```env
   # Database configuration
   POSTGRES_URI=postgres://USERNAME:PASSWORD@HOST:5432/DATABASE_NAME
   POSTGRES_DB=your_database_name

   # Server configuration
   PORT=your_port
   NODE_ENV=your_node_env
   CORS_ORIGIN=your_cors_origin
   BACKEND_ORIGIN=your_backend_origin

   # Other configurations
   JWT_SECRET_KEY=your_jwt_secret_key
   SESSION_SECRET_KEY=your_session_secret_key

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret

   # Nodemailer Configuration
   FRONTEND_ORIGIN=your_frontend_origin
   ORIGIN_HOST=your_origin_host
   ORIGIN_PORT=your_origin_port
   ORIGIN_AUTH_USER=your_origin_auth_user
   ORIGIN_AUTH_PASSWORD=your_origin_auth_password
   ORIGIN_MAIL_FROM=your_origin_mail_from

   # Seed Configuration
   ADMIN_USERNAME=your_admin_username
   ADMIN_EMAIL=your_admin_email
   ADMIN_PASSWORD=your_admin_password
   ```

4. Run the application:
   ```bash
   npm run build
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the `frontend` directory and add the following variables:
   ```env
   BACKEND_ORIGIN=your_backend_server_origin
   JWT_BACKEND_SECRET=your_backend_jwt_secret_key
   ```

4. Run the application:
   ```bash
   npm run dev
   ```

## Contributing 🤝

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Barata-Ribeiro/Birdy/issues) if you want to contribute.

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
