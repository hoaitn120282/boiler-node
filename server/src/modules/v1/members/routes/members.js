import express from "express";
import memberController from "src/modules/v1/members/controllers/members";
const router = express.Router();

/**
 * @apiVersion 1.0.0
 * @api {get} /members Display the list of members
 * @apiName Member list
 * @apiGroup Members
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
 * @apiSuccess {Object} Items the list of member information.
 */

router.get("/", memberController.index);

/**
 * @apiVersion 1.0.0
 * @api {get} /members/:id Show member information
 * @apiName Display member information via ID
 * @apiParam {Integer} Id Mandatory the identify of member information.
 * @apiGroup Members
 *
 *
 * @apiSuccess {Object} Member information.
 * @apiSuccess {Integer} Id Optional the identify of member information
 * @apiSuccess {String} Username Optional  username of member
 * @apiSuccess {String} Email Optional email of member
 */
router.get("/:id", memberController.show);

/**
 * @apiVersion 1.0.0
 * @api {post} /members Create a new member
 * @apiName Member creation
 * @apiGroup Members
 * @apiParam {String} Username Optional The field unique username.
 * @apiParam {String} Email Optional The field unique email.
 *
 * @apiSuccess {Object} Items - member information: username, email, status,...
 * @apiSuccess {String} Message.
 * @apiSuccess {String} Status.
 */
router.post("/", memberController.create);

/**
 * @apiVersion 1.0.0
 * @api {put} /members Update a member
 * @apiName Member updation
 * @apiGroup Members
 * @apiParam {String} Username Users unique username.
 * @apiParam {String} Email Users email.
 *
 * @apiSuccess {Object} Items.
 * @apiSuccess {String} Message.
 * @apiSuccess {String} Status.
 */
router.put("/:id", memberController.update);

/**
 * @apiVersion 1.0.0
 * @api {delete} /members Delete a member
 * @apiName Member Deletion
 * @apiGroup Members
 * @apiParam {Integer} id Users unique ID.
 *
 * @apiSuccess {String} Message.
 * @apiSuccess {String} Status.
 */
router.delete("/", memberController.delete);

/**
 * @apiVersion 1.0.0
 * @api {delete} /members/undelete/:id Delete a customer
 * @apiName customer Deletion
 * @apiGroup members
 * @apiParam {Integer} id Users unique ID.
 *
 * @apiSuccess {String} Message.
 * @apiSuccess {String} Status.
 */
router.delete("/undelete/:id", memberController.restore);

export default router;
