import { updateSeller, deleteSeller } from "@/app/controllers/sellerController";
// import { adminOnly } from "@/app/middlewares/auth";

console.log('✅ [PUT, DELETE] /api/sellers/:id loaded');

/**
 
 * /api/sellers/{id}:
 *   put:
 *     summary: Update a seller by ID
 *     tags: [Sellers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Seller updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Seller'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Seller not found
 *       500:
 *         description: Server error
 *
 *   delete:
 *     summary: Delete a seller by ID
 *     tags: [Sellers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Seller deleted successfully
 *       404:
 *         description: Seller not found
 *       500:
 *         description: Server error
 */

export const PUT = updateSeller;
export const DELETE = deleteSeller;
