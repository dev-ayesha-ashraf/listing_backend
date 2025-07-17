import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Next.js App Router API',
      version: '1.0.0',
      description: 'Swagger API documentation for App Router backend',
    },
    servers: [
      {
        url: '/api', 
      },
    ],
  },
  apis: ['./src/app/api/**/*.ts']
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
