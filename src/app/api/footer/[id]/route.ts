import { updateFooter, deleteFooter } from "@/app/controllers/footerController";
// import { adminOnly } from "@/app/middlewares/auth";

console.log("✅ [PUT, DELETE] /api/footers/:id loaded");

/**
 * @openapi
 * /api/footers/{id}:
 *   put:
 *     summary: Update footer by ID
 *     tags: [Footers]
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
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *               about:
 *                 type: string
 *     responses:
 *       200:
 *         description: Footer updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Footer not found
 *       500:
 *         description: Server error
 *
 *   delete:
 *     summary: Delete footer by ID
 *     tags: [Footers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Footer deleted successfully
 *       404:
 *         description: Footer not found
 *       500:
 *         description: Server error
 */

export const PUT = updateFooter;
export const DELETE = deleteFooter;
