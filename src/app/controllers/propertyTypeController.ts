// controllers/propertyTypeController.ts
import connectDB from '@/app/lib/db';
import PropertyType from '@/app/models/PropertyType';
import { generateSlug } from '@/app/utils/slugify';
import { NextRequest, NextResponse } from 'next/server';
import { parseFormAppRouter } from '@/app/lib/parseFormAppRouter';

type Context = {
  params: { id: string };
};

type UpdatePropertyTypeInput = {
  name: string;
  slug: string;
  categoryId: string;
  image?: string;
};

export const getPropertyTypes = async (req: NextRequest) => {
  await connectDB();
  const categoryId = req.nextUrl.searchParams.get('category');
  const filter = categoryId ? { categoryId } : {};
  const types = await PropertyType.find(filter);
  return NextResponse.json(types);
};

export const getSinglePropertyType = async (_req: NextRequest, { params }: Context) => {
  await connectDB();
  const { id } = params;
  const type = await PropertyType.findById(id).populate('categoryId');
  if (!type) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(type);
};

export const createPropertyType = async (req: NextRequest) => {
  await connectDB();
  const { fields, files } = await parseFormAppRouter(req, 'property-types');

  const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
  const categoryId = Array.isArray(fields.categoryId) ? fields.categoryId[0] : fields.categoryId;

  if (!name || !categoryId) {
    return NextResponse.json({ error: 'Name and Category ID are required' }, { status: 400 });
  }

  const slug = generateSlug(name);
  const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
  const imagePath = imageFile ? `/property-types/${imageFile.newFilename}` : '';

  const newType = await PropertyType.create({
    name,
    slug,
    categoryId,
    image: imagePath,
  });

  return NextResponse.json(newType);
};

export const updatePropertyType = async (req: NextRequest, { params }: Context) => {
  await connectDB();
  const { fields, files } = await parseFormAppRouter(req, 'property-types');
  const { id } = params;

  const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
  const categoryId = Array.isArray(fields.categoryId) ? fields.categoryId[0] : fields.categoryId;

  if (!name || !categoryId) {
    return NextResponse.json({ error: 'Name and Category ID are required' }, { status: 400 });
  }

  const slug = generateSlug(name);
  const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
 const imagePath = imageFile ? `/property-types/${imageFile.newFilename}` : undefined;

  const updateData: UpdatePropertyTypeInput = {
    name,
    slug,
    categoryId,
  };

  if (imagePath) updateData.image = imagePath;

  const updated = await PropertyType.findByIdAndUpdate(id, updateData, { new: true });
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
