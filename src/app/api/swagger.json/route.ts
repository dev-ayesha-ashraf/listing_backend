import { readFileSync } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';

// Set your credentials here or pull from environment variables
const USERNAME = process.env.SWAGGER_USER || 'admin';
const PASSWORD = process.env.SWAGGER_PASS || 'supersecret';

function unauthorizedResponse() {
  return new NextResponse('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Swagger Docs"',
    },
  });
}

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return unauthorizedResponse();
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [user, pass] = credentials.split(':');

  if (user !== USERNAME || pass !== PASSWORD) {
    return unauthorizedResponse();
  }

  try {
    const filePath = join(process.cwd(), 'public', 'swagger.json');
    const json = JSON.parse(readFileSync(filePath, 'utf-8'));
    return NextResponse.json(json);
  } catch (error) {
    console.error('Failed to read swagger.json:', error);
    return NextResponse.json({ error: 'Swagger file not found' }, { status: 404 });
  }
}
