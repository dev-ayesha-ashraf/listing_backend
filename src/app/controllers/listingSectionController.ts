import { NextRequest, NextResponse } from "next/server";
import ListingSection from "../models/ListingSection";
import connectDB from "../lib/db";

type Params = {
  params: {
    id: string;
  };
};

export const createListingSection = async (req: NextRequest) => {
  await connectDB();
  try {
    const body = await req.json();
    const { title, category, cardLimit } = body;

    if (!title || !category || cardLimit === undefined) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const newSection = await ListingSection.create({ title, category, cardLimit });
    return NextResponse.json(newSection, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create section" }, { status: 500 });
  }
};

export const getAllListingSections = async (_req: NextRequest) => {
  await connectDB();
  try {
    const sections = await ListingSection.find().sort({ createdAt: -1 });
    return NextResponse.json(sections);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch sections" }, { status: 500 });
  }
};

export const deleteListingSection = async (_req: NextRequest, { params }: Params) => {
  await connectDB();
  try {
    const deleted = await ListingSection.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete section" }, { status: 500 });
  }
};

export const updateListingSection = async (req: NextRequest, { params }: Params) => {
  await connectDB();
  try {
    const update = await req.json();
    const updated = await ListingSection.findByIdAndUpdate(params.id, update, { new: true });
    if (!updated) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Failed to update section" }, { status: 500 });
  }
};
