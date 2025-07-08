import Seller from '../models/Seller';
import connectDB from '../lib/db';
import { NextRequest, NextResponse } from 'next/server';

type ParamsContext = {
  params: {
    id: string;
  };
};

// GET all sellers
export const getAllSellers = async () => {
  await connectDB();
  const sellers = await Seller.find().sort({ createdAt: -1 });
  return NextResponse.json(sellers);
};

// POST create seller
export const createSeller = async (req: NextRequest) => {
  await connectDB();
  const body = await req.json();
  const newSeller = await Seller.create(body);
  return NextResponse.json(newSeller, { status: 201 });
};

// PUT update seller
export const updateSeller = async (req: NextRequest, context: ParamsContext) => {
  await connectDB();
  const body = await req.json();
  const { id } = context.params;
  const seller = await Seller.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(seller);
};

// DELETE seller
export const deleteSeller = async (_req: NextRequest, context: ParamsContext) => {
  await connectDB();
  const { id } = context.params;
  await Seller.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Seller deleted' });
};
