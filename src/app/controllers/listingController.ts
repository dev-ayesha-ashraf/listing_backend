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

  const { fields, files }: { fields: Fields; files: Files } =
    await parseFormAppRouter(req);

  // Safely extract uploaded images
  const uploadedImages = Array.isArray(files.images)
    ? files.images
    : files.images
    ? [files.images]
    : [];

  const imagePaths = uploadedImages.map((file: FormidableFile) => {
    const filename = file.newFilename || file.originalFilename;
    return `/${filename}`;
  });

  const listingId = `LIST-${Math.random()
    .toString(36)
    .substring(2, 9)
    .toUpperCase()}`;

  // Safe helper function to extract single string field from Fields
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
    // locationId: getField(fields.locationId),
    // propertyTypeId: getField(fields.propertyTypeId),
    listingType: getField(fields.listingType).toLowerCase(),
    // status: getField(fields.status).toLowerCase(),
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
  const listing = await Listing.findById(id).populate("categoryId"); // ✅ FIXED
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
