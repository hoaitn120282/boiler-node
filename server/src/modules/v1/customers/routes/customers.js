import express from "express";
import customerController from "src/modules/v1/customers/controllers/customers";
const router = express.Router();

/**
 * @apiVersion 1.0.0
 * @api {get} /customers Display the list of customers
 * @apiName customer list
 * @apiGroup customers
 * @apiParamExample {json} Request-Example:
 *    {items:[{
 *           "id": 1,
 *           "username": "hoaitn1987",
 *           "email": "hoaitn213@gmail.com",
 *           "avatar": null,
 *           "is_active": true,
 *           "status": true,
 *           "createdAt": "2021-10-30T20:18:50.000Z",
 *           "updatedAt": "2021-10-30T23:01:45.000Z",
 *           "deletedAt": null
 *     },
 *     "status": 200,
 *     "message": "users.list.success"
 *     ]
 *   }
 * @apiSuccess {Object} Items the list of customer information.
 */

router.get("/", customerController.index);

/**
 * @apiVersion 1.0.0
 * @api {get} /customers/:id Show customer information
 * @apiName Display customer information via ID
 * @apiParam {Integer} Id Mandatory the identify of customer information.
 * @apiGroup customers
 *
 *
 * @apiSuccess {Object} customer information.
 * @apiSuccess {Integer} Id Optional the identify of customer information
 * @apiSuccess {String} Username Optional  username of customer
 * @apiSuccess {String} Email Optional email of customer
 */
router.get("/:id", customerController.show);

/**
 * @apiVersion 1.0.0
 * @api {post} /customers Create a new customer
 * @apiName customer creation
 * @apiGroup customers
 * @apiParam {String} Username Optional The field unique username.
 * @apiParam {String} Email Optional The field unique email.
 *
 * @apiSuccess {Object} Items - customer information: username, email, status,...
 * @apiSuccess {String} Message.
 * @apiSuccess {String} Status.
 */
router.post("/", customerController.create);

/**
 * @apiVersion 1.0.0
 * @api {put} /customers/:id Update a customer
 * @apiName customer updation
 * @apiGroup customers
 * @apiParam {String} Username Users unique username.
 * @apiParam {String} Email Users email.
 *
 * @apiSuccess {Object} Items.
 * @apiSuccess {String} Message.
 * @apiSuccess {String} Status.
 */
router.put("/:id", customerController.update);

/**
 * @apiVersion 1.0.0
 * @api {delete} /customers/:id Delete a customer
 * @apiName customer Deletion
 * @apiGroup customers
 * @apiParam {Integer} id Users unique ID.
 *
 * @apiSuccess {String} Message.
 * @apiSuccess {String} Status.
 */
router.delete("/:id", customerController.delete);

/**
 * @apiVersion 1.0.0
 * @api {delete} /customers/undelete/:id Delete a customer
 * @apiName customer Deletion
 * @apiGroup customers
 * @apiParam {Integer} id Users unique ID.
 *
 * @apiSuccess {String} Message.
 * @apiSuccess {String} Status.
 */
router.delete("/undelete/:id", customerController.restore);

export default router;
