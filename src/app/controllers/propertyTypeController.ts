// controllers/propertyTypeController.ts
import connectDB from '@/app/lib/db';
import PropertyType from '@/app/models/PropertyType';
import { generateSlug } from '@/app/utils/slugify';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: {
    id: string;
  };
};

export const getPropertyTypes = async (req: NextRequest) => {
  await connectDB();
  const categoryId = req.nextUrl.searchParams.get('category');
  const filter = categoryId ? { categoryId } : {};
  const types = await PropertyType.find(filter);
  return NextResponse.json(types);
};

export const createPropertyType = async (req: NextRequest) => {
  await connectDB();
  const { name, image, categoryId } = await req.json();
  const slug = generateSlug(name);
  const type = await PropertyType.create({ name, slug, image, categoryId });
  return NextResponse.json(type);
};

export const updatePropertyType = async (req: NextRequest, { params }: Context) => {
  await connectDB();
  const { id } = params;
  const { name, image, categoryId } = await req.json();
  const slug = generateSlug(name);

  const updated = await PropertyType.findByIdAndUpdate(
    id,
    { name, slug, image, categoryId },
    { new: true }
  );
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(updated);
};

export const deletePropertyType = async (_req: NextRequest, { params }: Context) => {
  await connectDB();
  const { id } = params;
  const deleted = await PropertyType.findByIdAndDelete(id);
  if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true });
};
