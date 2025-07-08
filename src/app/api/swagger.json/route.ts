import { NextResponse } from 'next/server';
import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';

const isProd = process.env.NODE_ENV === 'production';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
    },
  },
  apis: isProd
    ? [path.resolve(__dirname, '../../../../src/app/api/**/*.ts')] // relative to compiled file
    : ['src/app/api/**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export function GET() {
  return NextResponse.json(swaggerSpec);
}
