// controllers/locationController.ts
import connectDB from '@/app/lib/db';
import Location from '@/app/models/Location';
import { generateSlug } from '@/app/utils/slugify';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: {
    id: string;
  };
};

export const getLocations = async (req: NextRequest) => {
  await connectDB();
  const categoryId = req.nextUrl.searchParams.get('category');
  const filter = categoryId ? { categoryId } : {};
  const locations = await Location.find(filter);
  return NextResponse.json(locations);
};

export const createLocation = async (req: NextRequest) => {
  await connectDB();
  const { name, image, categoryId } = await req.json();
  const slug = generateSlug(name);
  const location = await Location.create({ name, slug, image, categoryId });
  return NextResponse.json(location);
};

export const updateLocation = async (req: NextRequest, { params }: Context) => {
  await connectDB();
  const { id } = params;
  const { name, image, categoryId } = await req.json();
  const slug = generateSlug(name);

  const updated = await Location.findByIdAndUpdate(
    id,
    { name, slug, image, categoryId },
    { new: true }
  );

  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(updated);
};

export const deleteLocation = async (_req: NextRequest, { params }: Context) => {
  await connectDB();
  const { id } = params;

  const deleted = await Location.findByIdAndDelete(id);
  if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true });
};
