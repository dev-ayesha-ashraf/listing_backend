// app/api/locations/route.ts
import { getLocations, createLocation } from '@/app/controllers/locationController';
// import { adminOnly } from '@/app/middlewares/auth';

export const GET = getLocations;
export const POST = createLocation;
