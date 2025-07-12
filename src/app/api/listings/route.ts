/**
  * @openapi
 * /api/listings:
 *   get:
 *     summary: Get all listings
 *     tags: [Listings]
 *     responses:
 *       200:
 *         description: A list of all listings
 *   post:
 *     summary: Create a new listing
 *     tags: [Listings]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - price
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
 *       201:
 *         description: Listing created
 */

// import { adminOnly } from "@/app/middlewares/auth";
import { getAllListings, createListing } from "@/app/controllers/listingController";
export const config = {
  api: {
    bodyParser: false, // Required to handle raw form data
  },
};


export const GET = getAllListings;
export const POST = createListing;
