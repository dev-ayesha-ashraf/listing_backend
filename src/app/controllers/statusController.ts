// controllers/statusController.ts
import { NextResponse } from 'next/server';

export const getStatuses = () => {
  const statuses = [
    { value: 'available', label: 'Available' },
    { value: 'pending', label: 'Pending' },
    { value: 'sold', label: 'Sold' },
    { value: 'rented', label: 'Rented' }
  ];

  return NextResponse.json(statuses);
};
