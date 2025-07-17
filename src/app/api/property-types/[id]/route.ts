/**
 * @openapi
 * /api/property-types/{id}:
 *   get:
 *     summary: Get a single property type
 *     tags: [PropertyTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The property type ID
 *     responses:
 *       200:
 *         description: Property type retrieved successfully
 *       404:
 *         description: Property type not found
 *   put:
 *     summary: Update a property type
 *     tags: [PropertyTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The property type ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Property type updated successfully
 *       400:
 *         description: Invalid data
 *       404:
 *         description: Property type not found
 *   delete:
 *     summary: Delete a property type
 *     tags: [PropertyTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The property type ID
 *     responses:
 *       200:
 *         description: Property type deleted successfully
 *       404:
 *         description: Property type not found
 */
import {
  getSinglePropertyType,
  updatePropertyType,
  deletePropertyType,
} from '@/app/controllers/propertyTypeController';

export const GET = getSinglePropertyType;
export const PUT = updatePropertyType;
export const DELETE = deletePropertyType;
