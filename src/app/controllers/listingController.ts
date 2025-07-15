import { NextRequest, NextResponse } from "next/server";
import { parseFormAppRouter } from "../lib/parseFormAppRouter";
import Listing from "../models/listing";
import connectDB from "../lib/db";
import type { Fields, Files, File as FormidableFile } from "formidable";

export const getAllListings = async () => {
  await connectDB();
  const listings = await Listing.find().populate("categoryId sellerId");
  console.log("📥 [GET] Fetching all listings");
  return NextResponse.json(listings);
};

type ParamsContext = {
  params: {
    id: string;
  };
};
export const createListing = async (req: NextRequest) => {
  await connectDB();

  const {
    fields,
    files,
    categorySlug,
  }: { fields: Fields; files: Files; categorySlug: string } =
    await parseFormAppRouter(req);

  const uploadedImages = Array.isArray(files.images)
    ? files.images
    : files.images
    ? [files.images]
    : [];

  const imagePaths = uploadedImages.map((file: FormidableFile) => {
    const filename = file.newFilename || file.originalFilename;
    return `/uploads/${categorySlug}/${filename}`;
  });

  const listingId = `LIST-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

  const getField = (field: string | string[] | undefined): string =>
    Array.isArray(field) ? field[0] : field ?? "";

  const listing = await Listing.create({
    title: getField(fields.title),
    description: getField(fields.description),
    images: imagePaths,
    price: Number(getField(fields.price)),
    listingId,
    categoryId: getField(fields.categoryId),
    sellerId: getField(fields.sellerId),
    listingType: getField(fields.listingType).toLowerCase(),
    badge: getField(fields.badge),
    purpose: getField(fields.purpose),
  });

  return NextResponse.json(listing);
};

export const getSingleListing = async (
  _req: NextRequest,
  context: ParamsContext
) => {
  await connectDB();
  const { id } = context.params;
  const listing = await Listing.findById(id).populate("categoryId"); 
  console.log(`🔍 [GET] Fetching listing by ID: ${id}`);
  if (!listing)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(listing);
};

export const updateListing = async (
  req: NextRequest,
  context: ParamsContext
) => {
  await connectDB();
  const updateData = await req.json();
  const { id } = context.params;

  console.log(`✏️ [PUT] Updating listing ID: ${id}`);
  const updated = await Listing.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  if (!updated)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
};

export const deleteListing = async (
  _req: NextRequest,
  context: ParamsContext
) => {
  await connectDB();
  const { id } = context.params;
  const deleted = await Listing.findByIdAndDelete(id);
  if (!deleted)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  console.log(`🗑️ [DELETE] Deleting listing ID: ${id}`);
  return NextResponse.json({ success: true });
};
