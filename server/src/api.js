import express from "express";
import path from "path";
// import DynamicRoutes from "dynamic-routes";
/**
 * Create Express server.
 */
const app = express();
app.disable("etag");

/**
 * Import all routes.
 */
// You should change version folder in the below config. For example: v1/v2/vx
const reqRoutes = require.context(
    "./",
    true,
    /^\.\/modules\/v1\/.*\/routes\/([\w]+\.js)$/
);
reqRoutes.keys().map(file => {
    const fileName = path.basename(file);
    const routes = reqRoutes(file);
    const [routeName] = fileName.split(".");
    const { routePath = `/${routeName}` } = routes;
    app.use(routePath, routes.default);
});

export default app;
