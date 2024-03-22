import type { CorsOptions } from "cors"
import type { SessionOptions } from "express-session"

export const corsOptions: CorsOptions = {
    origin: process.env.CORS_ORIGIN || true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: [
        "Accept",
        "Authorization",
        "Cache-Control",
        "Content-Type",
        "X-Refresh-Token"
    ],
    credentials: true,
    preflightContinue: false
}

export const sessionOptions: SessionOptions = {
    name: "session_id",
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET_KEY || "session_secret_test_key",
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 86400000 // 24 hours
    }
}
