import { readFileSync } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';

export function GET() {
  try {
    const filePath = join(process.cwd(), 'public', 'swagger.json');
    const json = JSON.parse(readFileSync(filePath, 'utf-8'));
    return NextResponse.json(json);
  } catch (error) {
    console.error('Failed to read swagger.json:', error);
    return NextResponse.json({ error: 'Swagger file not found' }, { status: 404 });
  }
}
