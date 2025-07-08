/**
 * @openapi
 * /api/listings/{id}:
 *   get:
 *     summary: Get a single listing
 *     description: Retrieve a specific listing by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The listing ID
 *     responses:
 *       200:
 *         description: Listing retrieved successfully
 *       404:
 *         description: Listing not found
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update a listing
 *     description: Update a specific listing by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The listing ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Listing updated successfully
 *       400:
 *         description: Invalid data
 *       404:
 *         description: Listing not found
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete a listing
 *     description: Delete a specific listing by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The listing ID
 *     responses:
 *       200:
 *         description: Listing deleted successfully
 *       404:
 *         description: Listing not found
 *       500:
 *         description: Server error
 */

import { getSingleListing, updateListing, deleteListing } from '@/app/controllers/listingController';

export const config = {
  api: {
    bodyParser: false, // Required to handle raw form data
  },
};

export const GET = getSingleListing;
export const PUT = updateListing;
export const DELETE = deleteListing;
