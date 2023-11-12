# Birdy 🐦

Birdy is an Instagram-like social media platform for bird enthusiasts to share and explore various bird species through their photographs. This repository contains both the RESTful API and the Frontend implementation of Birdy, providing a robust social network for user interactions, photo uploads, comments, and more.

## The API 📝

The Birdy API is a robust and scalable backend service designed to support Birdy. It handles user authentication, photo uploads, comments, likes, and provides essential security features to ensure user data protection. It was built using Express, 'a minimal and flexible Node.js web application framework.'

### API Built With 🛠️

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Cloudinary](https://cloudinary.com/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- And other awesome libraries and tools listed in [package.json](./api/package.json)

### Main Features 🌟

- **User Authentication:** Secure registration and login using bcrypt and JSON Web Tokens.
- **User Profile Creation:** Users can create and customize their profiles.
- **Photo Uploads:** Users can upload and share their bird photos, along with information about the bird's size and habitat.
- **Comments and Likes:** Users can comment on and like the photos shared by others.
- **Exploration:** Users can explore and interact with posts from other users.
- **Dedicated Page for User Posts:** Users can view all their posts on a dedicated page.
- **Rate Limiting:** Protects the API from abuse with express-rate-limit.
- **Security:** Implements security best practices using cors and helmet.
- **Error Handling:** Efficient error handling using express-async-errors.
- **Caching:** Implements IORedis for certain query requests, avoiding unnecessary requesting when users refresh the page.

### API Setup 🚀

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
   # Database Configuration
    DB_HOST=YOUR_DATABASE_HOST
    DB_PORT=YOUR_DATABASE_PORT
    DB_USERNAME=YOUR_DATABASE_USERNAME
    DB_PASSWORD=YOUR_DATABASE_PASSWORD
    DB_DATABASE=YOUR_DATABASE_NAME

    # IORedis Configuration
    REDIS_HOST=YOUR_REDIS_HOST
    REDIS_HOST_PORT=YOUR_REDIS_HOST_PORT
    REDIS_PASSWORD=YOUR_REDIS_HOST_PASSWORD

    # CORS Configuration
    CORS_ORIGIN=YOUR_ALLOWED_ORIGIN

    # Cloudinary Configuration
    CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_CLOUD_NAME
    CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY
    CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_API_SECRET

    # Nodemailer Configuration
    ORIGIN_HOST=YOUR_ALLOWED_ORIGIN_HOST
    ORIGIN_PORT=YOUR_ALLOWED_ORIGIN_PORT
    ORIGIN_AUTH_USER=YOUR_ALLOWED_ORIGIN_AUTH_USER
    ORIGIN_AUTH_PASSWORD=YOUR_ALLOWED_ORIGIN_AUTH_PASSWORD
    ORIGIN_MAIL_FROM=YOUR_ALLOWED_ORIGIN_MAIL_FROM

    # JWT Configuration
    JWT_SECRET=YOUR_JWT_SECRET

    # Refresh Token Configuration
    REFRESH_TOKEN_SECRET=YOUR_REFRESH_TOKEN_SECRET

    # Seed Configuration
    ADMIN_USERNAME=YOUR_ADMIN_USERNAME
    ADMIN_EMAIL=YOUR_ADMIN_EMAIL
    ADMIN_PASSWORD=YOUR_ADMIN_PASSWORD
   ```

5. Run the development server for the API:

   ```bash
   npm start
   ```

6. (Optional) Cors configuration:

   If you want to set your own cors origin, make use the CORS_ORIGIN environment variable to set the origin. It can be easily change in the index.ts file for the API.

   ```javascript
    // change:
    const corsOptions: cors.CorsOptions = {
      origin: true,

    // to:
    const corsOptions: cors.CorsOptions = {
      origin: process.env.CORS_ORIGIN,
   ```

### API Folder Structure 📂

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
│   ├── seeds
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

## The Frontend 🖥️

The front end of Birdy is designed to provide users with an intuitive and responsive interface to interact with the platform. It is built using React, allowing for a dynamic and efficient user experience. The project is based on the 'Dogs' social network, which is also an Instagram-like app for photo sharing, with the difference being that 'Birdy' is for bird enthusiasts while 'Dogs' is for dog enthusiasts.

### Frontend Built With 🛠️

- [Vite.js](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [React Router](https://reactrouter.com/en/main)
- [Redux](https://redux.js.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Victory Charts](https://formidable.com/open-source/victory/)

### Frontend Setup 🚀

1. Navigate to the project directory:

   ```bash
   cd Birdy
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Run the development server for the Frontend:

   ```bash
   npm run dev
   ```

### Frontend Folder Structure 📂

```sh
public
src
├── assets
├── components
├── hooks
├── pages
├── store
├── App.jsx
├── constants.js
├── index.css
├── main.jsx
.editorconfig
.env
.eslintignore
.eslintrc.cjs
.gitignore
.postcssrc.json
.prettierignore
.prettierrc.json
index.html
LICENSE
package-lock.json
package.json
README.md
tailwind.config.js
vite.config.js
```

## Contributing 🤝

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/Barata-Ribeiro/Birdy/issues) if you want to contribute.

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
