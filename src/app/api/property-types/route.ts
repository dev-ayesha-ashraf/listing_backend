/**
 * @openapi
 * /api/property-types:
 *   get:
 *     summary: Get all property types
 *     tags:
 *       - PropertyTypes
 *     responses:
 *       200:
 *         description: A list of all property types
 *   post:
 *     summary: Create a new property type
 *     tags:
 *       - PropertyTypes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Property type created
 */

import { getPropertyTypes, createPropertyType } from '@/app/controllers/propertyTypeController';

console.log('✅ [GET, POST] /api/property-types loaded');

export const GET = getPropertyTypes;
export const POST = createPropertyType;
