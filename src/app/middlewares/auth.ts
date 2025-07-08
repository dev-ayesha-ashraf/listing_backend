import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

interface DecodedToken extends JwtPayload {
  role?: string;
}

export const verifyToken = (req: NextRequest): DecodedToken | null => {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    return decoded;
  } catch {
    return null;
  }
};

type RouteHandler<TContext = { params: Record<string, string> }> = (
  req: NextRequest,
  context: TContext
) => Promise<NextResponse>;

export const adminOnly = <TContext = { params: Record<string, string> }>(
  handler: RouteHandler<TContext>
): RouteHandler<TContext> => {
  return async (req: NextRequest, context: TContext) => {
    const decoded = verifyToken(req);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return handler(req, context);
  };
};