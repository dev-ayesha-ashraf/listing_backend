import Footer from '../models/Footer';
import connectDB from '../lib/db';
import { NextRequest, NextResponse } from 'next/server';
import Category from '../models/Category';

type ParamsContext = {
    params: {
        id: string;
    };
};

// GET all footers (optionally filter by category)
export const getAllFooters = async (req: NextRequest) => {
    await connectDB();

    const categoryId = req.nextUrl.searchParams.get('categoryId');
    const query = categoryId ? { categoryId } : {};

    const footers = await Footer.find(query)
        .populate('categoryId', 'name slug')
        .sort({ createdAt: -1 });

    return NextResponse.json(footers);
};

// GET a single footer by ID
export const getFooterById = async (_req: NextRequest, context: ParamsContext) => {
    await connectDB();

    const footer = await Footer.findById(context.params.id)
        .populate('categoryId', 'name slug');

    if (!footer) {
        return NextResponse.json({ error: 'Footer not found' }, { status: 404 });
    }

    return NextResponse.json(footer);
};

// POST create a new footer
export const createFooter = async (req: NextRequest) => {
    await connectDB();
    const body = await req.json();

    const requiredFields = ['phone', 'email', 'address', 'about', 'categoryId'];
    for (const field of requiredFields) {
        if (!body[field]) {
            return NextResponse.json({ error: `${field} is required` }, { status: 400 });
        }
    }

    const categoryExists = await Category.findById(body.categoryId);
    if (!categoryExists) {
        return NextResponse.json({ error: 'Invalid categoryId: category does not exist' }, { status: 400 });
    }

    const newFooter = await Footer.create(body);
    await newFooter.populate('categoryId', 'name slug');

    return NextResponse.json(newFooter, { status: 201 });
};

// PUT update footer by ID
export const updateFooter = async (req: NextRequest, context: ParamsContext) => {
    await connectDB();
    const body = await req.json();

    if (body.categoryId) {
        const categoryExists = await Category.findById(body.categoryId);
        if (!categoryExists) {
            return NextResponse.json({ error: 'Invalid categoryId: category does not exist' }, { status: 400 });
        }
    }

    const updatedFooter = await Footer.findByIdAndUpdate(context.params.id, body, {
        new: true,
    });

    if (!updatedFooter) {
        return NextResponse.json({ error: 'Footer not found' }, { status: 404 });
    }

    await updatedFooter.populate('categoryId', 'name slug');

    return NextResponse.json(updatedFooter);
};

// DELETE footer by ID
export const deleteFooter = async (_req: NextRequest, context: ParamsContext) => {
    await connectDB();

    const deleted = await Footer.findByIdAndDelete(context.params.id);
    if (!deleted) {
        return NextResponse.json({ error: 'Footer not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Footer deleted successfully' });
};
