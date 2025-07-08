// controllers/categoryController.ts
import connectDB from '@/app/lib/db';
import Category from '@/app/models/Category';
import { NextRequest, NextResponse } from 'next/server';
import { generateSlug } from '@/app/utils/slugify';

interface CategoryInput {
  name: string;
  description: string;
}

interface ParamsContext {
  params: {
    id: string;
  };
}

export const getAllCategories = async () => {
  await connectDB();
  const categories = await Category.find();
  return NextResponse.json(categories);
};

export const createCategory = async (req: NextRequest) => {
  await connectDB();
  const { name, description }: CategoryInput = await req.json();
  const slug = generateSlug(name);

  const exists = await Category.findOne({ slug });
  if (exists) {
    return NextResponse.json({ error: 'Category already exists' }, { status: 400 });
  }

  const category = await Category.create({ name, slug, description });
  return NextResponse.json(category);
};

export const getCategoryById = async (_req: NextRequest, context: ParamsContext) => {
  await connectDB();
  const { id } = context.params;

  const category = await Category.findById(id);
  if (!category) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  }

  return NextResponse.json(category);
};

export const updateCategory = async (req: NextRequest, context: ParamsContext) => {
  await connectDB();
  const { id } = context.params;
  const { name, description } = await req.json();
  const slug = generateSlug(name);

  const category = await Category.findByIdAndUpdate(
    id,
    { name, slug, description },
    { new: true }
  );

  if (!category) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  }

  return NextResponse.json(category);
};

export const deleteCategory = async (_req: NextRequest, context: ParamsContext) => {
  await connectDB();
  const { id } = context.params;

  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
};
