// Dependency Imports
import bodyParser from "body-parser"
import compression from "compression"
import cookieParser from "cookie-parser"
import cors from "cors"
import "dotenv/config"
import errorHandler from "errorhandler"
import express from "express"
import session from "express-session"
import helmet from "helmet"
import methodOverride from "method-override"
import logger from "morgan"
import path from "path"
import favicon from "serve-favicon"

// Other Imports
import { corsOptions, sessionOptions } from "./utils/server-options"

// Database Import
import { AppDataSource } from "./database/data-source"

// Database Type Check
if (AppDataSource.options.type !== "postgres")
    throw new Error("Invalid Database Type: Only 'postgres' is supported.")

const startServer = async () => {
    try {
        // Database Initialization
        await AppDataSource.initialize()

        // Express App Initialization
        let app = express()
        const PORT = process.env.PORT || 3000
        let ENV = process.env.NODE_ENV || "development"

        // Express App Middlewares
        app.set("port", PORT)
        app.set("trust proxy", 1)
        app.use(cors(corsOptions))
        app.use(favicon(path.join(__dirname, "..", "public", "favicon.ico")))
        app.use(logger("dev"))
        app.use(methodOverride())
        app.use(session(sessionOptions))
        app.use(cookieParser())
        app.use(helmet({ crossOriginResourcePolicy: false }))
        app.use(helmet.noSniff())
        app.use(helmet.xssFilter())
        app.use(helmet.ieNoOpen())
        app.disable("x-powered-by")
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(compression({ level: 6, threshold: 100 * 1000 }))
        app.use(express.static(path.join(__dirname, "public")))

        // Routes
        app.get("/", (req, res) => {
            res.send("Hello World!")
        })

        if (app.get("env") === "development") app.use(errorHandler())

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}, enjoy!`)
            if (ENV === "production")
                console.log("Server is running in production mode.")
            else console.log(`Server in running in ${ENV} mode.`)
        })
    } catch (error) {
        console.error("Error while starting the server:", error)
    }
}

startServer().catch((err) => console.error("Failed to start the server:", err))
