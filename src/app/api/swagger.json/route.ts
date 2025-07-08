import { NextResponse } from 'next/server';
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
    },
  },
  apis: ['src/app/api/**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export function GET() {
  return NextResponse.json(swaggerSpec);
}
