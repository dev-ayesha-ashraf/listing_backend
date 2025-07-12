/**
  * @openapi
 * /api/sellers:
 *   get:
 *     summary: Get all sellers
 *     tags: [Sellers]
 *     responses:
 *       200:
 *         description: A list of sellers
 *   post:
 *     summary: Create a new seller
 *     tags: [Sellers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Seller created
 */


import { getAllSellers , createSeller } from "@/app/controllers/sellerController";
// import { adminOnly } from "@/app/middlewares/auth";

console.log('✅ [GET, POST] /api/sellers loaded');

export const GET = getAllSellers;
export const POST = createSeller;