// app/api/types/route.ts
import { getPropertyTypes, createPropertyType } from '@/app/controllers/propertyTypeController';
// import { adminOnly } from '@/app/middlewares/auth';

export const GET = getPropertyTypes;
export const POST = createPropertyType;
