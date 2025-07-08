// controllers/dropdown/locationDropdownController.ts
import connectDB from '@/app/lib/db';
import Location from '@/app/models/Location';
import { NextRequest, NextResponse } from 'next/server';

export const getLocationDropdown = async (req: NextRequest) => {
  await connectDB();
  const categoryId = req.nextUrl.searchParams.get('category');
  const filter = categoryId ? { categoryId } : {};
  const locations = await Location.find(filter).select('name _id slug image categoryId');
  return NextResponse.json(locations);
};
