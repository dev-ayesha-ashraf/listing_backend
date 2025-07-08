import { updateSeller, deleteSeller } from "@/app/controllers/sellerController";
// import { adminOnly } from "@/app/middlewares/auth";

console.log('✅ [PUT, DELETE] /api/sellers/:id loaded');

export const PUT = updateSeller;
export const DELETE = deleteSeller;
