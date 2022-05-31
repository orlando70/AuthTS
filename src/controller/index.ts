import {Request} from 'express';
import {plainToInstance, ClassConstructor} from 'class-transformer'
import {validate} from 'class-validator';
import { ValidationError } from '../lib/errors';

interface Session {
    userId: string;
}

export interface AuthenticatedRequest extends Request{
    session: Session;
}

export function successResponse(result: { message?: string; data: any }) {
    return {
      status: 'success',
      ...result,
    };  
  };