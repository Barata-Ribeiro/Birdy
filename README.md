# Birdy 🐦

Birdy is an Instagram-like social media platform for bird enthusiasts to share and explore various bird species through their photographs. As of today, this repository contains the RESTful API for Birdy, providing backend support for user interactions, photo uploads, comments, and more. Soon, it'll feature the front-end implementation of Birdy, where both instances will communicate and provide the user with a robust social network.

## The API 📝

The Birdy API is a robust and scalable backend service designed to support Birdy, an Instagram-like social media platform for bird enthusiasts. It handles user authentication, photo uploads, comments, likes, and provides essential security features to ensure user data protection. It was built using Express, 'a minimal and flexible Node.js web application framework.'

## API Built With 🛠️

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Cloudinary](https://cloudinary.com/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- And other awesome libraries and tools listed in [package.json](./api/package.json)

## Features 🌟

- **User Authentication:** Secure registration and login using bcrypt and JSON Web Tokens.
- **Photo Uploads:** Users can upload and share their bird photos.
- **Comments and Likes:** Users can comment on and like the photos shared by others.
- **Rate Limiting:** Protects the API from abuse with express-rate-limit.
- **Security:** Implements security best practices using helmet.
- **Error Handling:** Efficient error handling using express-async-errors.

## API Setup 🚀

1. Clone the repository:

   ```bash
   git clone https://github.com/Barata-Ribeiro/Birdy.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Birdy/api
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Setup environment variables:

   - Copy the `.env.example` file and rename it to `.env`.
   - Fill in the required environment variables.

   ```bash
   # Database Configuration - User DOCKER Container
   DB_HOST=YOUR_DATABASE_HOST
   DB_PORT=YOUR_DATABASE_PORT
   DB_USERNAME=YOUR_DATABASE_USERNAME
   DB_PASSWORD=YOUR_DATABASE_PASSWORD
   DB_DATABASE=YOUR_DATABASE_NAME

   # CORS Configuration
   CORS_ORIGIN=YOUR_ALLOWED_ORIGIN

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_CLOUD_NAME
   CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY
   CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_API_SECRET

   # JWT Configuration
   JWT_SECRET=YOUR_JWT_SECRET

   # Refresh Token Configuration
   REFRESH_TOKEN_SECRET=YOUR_REFRESH_TOKEN_SECRET
   ```

5. Run the development server for the API:

   ```bash
   npm start
   ```

## Current Folder Structure 📂

```sh
api
├── node_modules
├── src
│   ├── @types
│   ├── controllers
│   ├── database
│   ├── dto
│   ├── entities
│   ├── helpers
│   ├── middlewares
│   ├── repositories
│   ├── routes
│   ├── services
│   ├── constants.ts
│   └── index.ts
├── .editorconfig
├── .env
├── .eslintignore
├── .eslintrc.cjs
├── .gitignore
├── nodemon.json
├── package-lock.json
├── package.json
└── tsconfig.json
```

## Contributing 🤝

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/Barata-Ribeiro/Birdy/issues) if you want to contribute.

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
