/* eslint no-console: 0 */
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import path from "path";
import fs from "fs";
import chalk from "chalk";
import errorHandler from "errorhandler";
import Logger from "src/common/Logger";
import compression from "compression";
import cors from "cors-express";
import morgan from "morgan";
import corsOptions from "src/config/cors.json";
import models from "src/database/Initialize";
import api from "./api";
import rfs from "rotating-file-stream";

corsOptions.options = function (req, res, next) {
    if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Credentials", true);
        res.status(200).end();
    } else {
        next();
    }
};

/**
 * Import models(It will be created database structure if it is not Production environment).
 */
models.sequelize
    .authenticate()
    .then(() => {
        if (process.env.NODE_APP_ENV == "production") {
            console.log(
                "%s Forced sync is disabled in production",
                chalk.red("x")
            );
        } else {
            models.sequelize
                .sync({ alter: true })
                .then(function () {
                    console.log(
                        "%s Database table was altered successfully",
                        chalk.green("✓")
                    );
                })
                .catch(err => {
                    models.sequelize
                        .sync()
                        .then(function () {
                            console.log(
                                "%s Database table was created successfully",
                                chalk.green("✓")
                            );
                        })
                        .catch(err => {
                            models.sequelize
                                .sync({ force: true })
                                .then(function () {
                                    console.log(
                                        "%s Database was forced update successful, plsease check your new strcture!",
                                        chalk.red("x")
                                    );
                                });
                        });
                    Logger.error("Unable to connect to the database:", err);
                });
        }
        console.log("%s Database connect successful!", chalk.green("✓"));
    })
    .catch(err => {
        Logger.error("Unable to connect to the database:", err);
    });
/**
 * Create Express server.
 */
const app = express();

const logDirectory = path.join(process.cwd(), "logs");

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream = rfs("access.log", {
    size: "10M", // rotate every 10 MegaBytes written
    interval: "1d", // rotate daily
    path: logDirectory,
    compress: "gzip" // compress rotated files
});

/**
 * Express configuration.
 */
app.set("host", process.env.NODE_APP_HOST || "0.0.0.0");
app.set("port", process.env.NODE_APP_PORT || 8080);
app.use(helmet());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

// parse some custom thing into a Buffer
app.use(bodyParser.raw());

// parse an HTML body into a string
app.use(
    bodyParser.text({
        type: "text/html"
    })
);
app.use(compression());
app.use(cors(corsOptions));
app.use(
    morgan("combined", {
        stream: accessLogStream
    })
);

app.use("/api/v1", api);
app.use("/", express.static("public"));

/**
 * Error Handler.
 */
if (process.env.NODE_ENV === "development") {
    // only use in development
    app.use(errorHandler());
}

/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
    console.log(
        "%s Your app is running at http://localhost:%d in %s mode",
        chalk.green("✓"),
        app.get("port"),
        app.get("env")
    );
});

export default app;
