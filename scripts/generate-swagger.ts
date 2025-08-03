import swaggerJSDoc from "swagger-jsdoc";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
    },
  },
  apis: ["./pages/api/**/*.ts"], // Only works during build time
};

const swaggerSpec = swaggerJSDoc(options);

const outputPath = path.join(__dirname, "../public/swagger.json");
fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2));

console.log(`✅ Swagger spec written to ${outputPath}`);
