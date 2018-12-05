import express from "express";
import homeController from "src/modules/v2/demo/controllers/home";
const router = express.Router();

/**
 * Import home controller.
 */

/**
 * @api {get} /home/ Welcome screen
 * @apiName Welcome
 * @apiGroup Home
 *
 *
 * @apiSuccess {String} Welcome message.
 */
router.get("/", homeController.index);

export default router;
