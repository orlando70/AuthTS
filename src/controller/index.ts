import { Request } from 'express'

interface Session {
    userId: string;
}

export interface AuthenticatedRequest extends Request{
    session: Session;
}

export function successResponse (result: { message?: string; data: any }) {
  return {
    status: 'success',
    ...result
  }
};
