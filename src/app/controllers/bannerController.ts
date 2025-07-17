import connectDB from '@/app/lib/db';
import Banner, { IBanner } from '../models/Banner';
import { generateSlug } from '@/app/utils/slugify';
import { NextRequest, NextResponse } from 'next/server';
import { parseFormAppRouter } from '@/app/lib/parseFormAppRouter';
import type { Fields, Files } from 'formidable';
import { Types } from 'mongoose';

type Context = {
  params: { id: string };
};

export const getBanners = async (req: NextRequest) => {
  await connectDB();
  const categoryId = req.nextUrl.searchParams.get('category');
  const filter = categoryId ? { categoryId } : {};
  const banners = await Banner.find(filter);
  return NextResponse.json(banners);
};

export const getSingleBanner = async (_req: NextRequest, { params }: Context) => {
  await connectDB();
  const { id } = params;
  const banner = await Banner.findById(id).populate('categoryId');
  if (!banner) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(banner);
};

export const createBanner = async (req: NextRequest) => {
  await connectDB();
  const { fields, files }: { fields: Fields; files: Files } = await parseFormAppRouter(req);

  const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
  const categoryIdStr = Array.isArray(fields.categoryId) ? fields.categoryId[0] : fields.categoryId;

  if (!name || !categoryIdStr) {
    return NextResponse.json({ error: 'Name and Category ID are required' }, { status: 400 });
  }

  const slug = generateSlug(name);
  const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
  const imagePath = imageFile ? `/uploads/banners/${imageFile.newFilename}` : '';

  const newBanner = await Banner.create({
    name,
    slug,
    categoryId: new Types.ObjectId(categoryIdStr),
    image: imagePath,
  });

  return NextResponse.json(newBanner);
};

export const updateBanner = async (req: NextRequest, { params }: Context) => {
  await connectDB();
  const { fields, files }: { fields: Fields; files: Files } = await parseFormAppRouter(req);
  const { id } = params;

  const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
  const categoryIdStr = Array.isArray(fields.categoryId) ? fields.categoryId[0] : fields.categoryId;

  if (!name || !categoryIdStr) {
    return NextResponse.json({ error: 'Name and Category ID are required' }, { status: 400 });
  }

  const slug = generateSlug(name);
  const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
  const imagePath = imageFile ? `/uploads/banners/${imageFile.newFilename}` : undefined;

  const updateData: Partial<Pick<IBanner, 'name' | 'slug' | 'categoryId' | 'image'>> = {
    name,
    slug,
    categoryId: new Types.ObjectId(categoryIdStr),
  };

  if (imagePath) updateData.image = imagePath;

  const updatedBanner = await Banner.findByIdAndUpdate(id, updateData, { new: true });
  if (!updatedBanner) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(updatedBanner);
};

export const deleteBanner = async (_req: NextRequest, { params }: Context) => {
  await connectDB();
  const { id } = params;
  const deleted = await Banner.findByIdAndDelete(id);
  if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true });
};
