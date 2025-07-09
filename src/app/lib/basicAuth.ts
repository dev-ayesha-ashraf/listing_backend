// lib/basicAuth.ts
import auth from 'basic-auth';
import { NextApiRequest, NextApiResponse } from 'next';

const USERNAME = process.env.SWAGGER_USER;
const PASSWORD = process.env.SWAGGER_PASS;

export function basicAuth(req: NextApiRequest, res: NextApiResponse, next: () => void) {
  const credentials = auth(req);

  if (!credentials || credentials.name !== USERNAME || credentials.pass !== PASSWORD) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="Swagger Docs"');
    res.end('Access denied');
    return;
  }

  next();
}
