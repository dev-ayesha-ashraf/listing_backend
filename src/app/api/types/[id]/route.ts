// app/api/types/[id]/route.ts
import { updatePropertyType, deletePropertyType } from '@/app/controllers/propertyTypeController';
// import { adminOnly } from '@/app/middlewares/auth';

export const PUT = updatePropertyType;
export const DELETE = deletePropertyType;
