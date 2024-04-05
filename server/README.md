# Birdy - RESTFUL API 📝

The Birdy API is a robust and scalable backend service designed to support
Birdy. It handles user authentication, photo uploads, comments, likes,
followings, and provides essential security features to ensure user data
protection. It's built with Node.js and TypeORM.

## 🛠️ Tech Used

-   [Node.js](https://nodejs.org/)
-   [Express](https://expressjs.com/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [TypeORM](https://typeorm.io/)
-   [PostgreSQL](https://www.postgresql.org/)
-   [Cloudinary](https://cloudinary.com/)
-   [bcrypt](https://www.npmjs.com/package/bcrypt)
-   [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
-   And other awesome libraries and tools listed in
    [package.json](/package.json)

## 🌟 Main Features

-   **User Authentication:** Secure registration and login using bcrypt and JSON
    Web Tokens.
-   **User Profile Creation:** Users can create and customize their profiles.
-   **Photo Uploads:** Users can upload and share their bird photos, along with
    information about the bird's size and habitat.
-   **Comments and Likes:** Users can comment on and like the photos shared by
    others.
-   **Followings:** users can follow one another.
-   **Exploration:** Users can explore and interact with posts from other users.
-   **Dedicated Page for User Posts:** Users can view all their posts on a
    dedicated page.
-   **Security:** Implements security best practices using cors and helmet.
-   **Error Handling:** Efficient error handling using express-async-errors.
-   **Caching:** Implements IORedis for certain query requests.

## 🚀 Getting Started

These instructions will get you a copy of the project up and running on your
local machine for development and testing purposes.

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Barata-Ribeiro/Birdy.git
    ```

2. Navigate into project folder:

    ```bash
    cd Birdy/server
    ```

3. Install NPM packages:

    ```bash
    npm install
    ```

4. Fill in the `.env` file:

    ```bash
    # Database configuration
    POSTGRES_URI=postgres://username:password@localhost:5432/database_name
    POSTGRES_DB=your_database_name

    # IORedis Configuration
    REDIS_HOST=your_redis_host
    REDIS_PASSWORD=your_redis_password
    REDIS_HOST_PORT=your_redis_port

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

5. Run the develoment server:

    ```bash
    npm run dev
    ```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check
[issues page](https://github.com/Barata-Ribeiro/Birdy/issues) if you want to
contribute.

## 📄 License

This project is licensed under the MIT License - see the
[License](https://github.com/Barata-Ribeiro/Birdy/blob/main/LICENSE) file for
details.
