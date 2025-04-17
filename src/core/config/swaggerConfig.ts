import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation for CSEC ASTU Lab Portal',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Adjust for production
      },
    ],
  },
  apis: ['src/modules/**/*.ts', 'src/app.ts']

};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
