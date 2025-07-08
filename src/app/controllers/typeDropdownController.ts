// controllers/dropdown/propertyTypeDropdownController.ts
import connectDB from '@/app/lib/db';
import PropertyType from '@/app/models/PropertyType';
import { NextRequest, NextResponse } from 'next/server';

export const getPropertyTypeDropdown = async (req: NextRequest) => {
  await connectDB();

  const categoryId = req.nextUrl.searchParams.get('category');
  const filter = categoryId ? { categoryId } : {};

  const types = await PropertyType.find(filter).select('name _id slug image categoryId');
  return NextResponse.json(types);
};
