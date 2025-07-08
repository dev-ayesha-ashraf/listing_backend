// app/api/locations/[id]/route.ts
import { updateLocation, deleteLocation } from '@/app/controllers/locationController';
// import { adminOnly } from '@/app/middlewares/auth';

export const PUT = updateLocation;
export const DELETE = deleteLocation;
