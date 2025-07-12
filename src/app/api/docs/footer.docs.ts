/**
 * @openapi
 * /footers:
 *   get:
 *     summary: Get all footer data
 *     tags: [Footers]
 *     responses:
 *       200:
 *         description: A list of footer entries
 *   post:
 *     summary: Create a new footer entry
 *     tags: [Footers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - email
 *               - address
 *               - about
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
 *       201:
 *         description: Footer entry created
 */
