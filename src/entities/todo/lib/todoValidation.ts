import { z } from 'zod';
import { TODO_STATUS } from '../model/todo-constants';

export const todoBaseSchema = z.object({
  title: z.string().min(1, 'Title is required').max(30, 'Title must be at most 30 characters'),
  description: z.string().max(200, 'Description must be at most 200 characters').optional(),
  manualLocation: z.string().max(100, 'Location must be at most 100 characters').optional(),
  mapLocation: z.string().max(100, 'Location must be at most 100 characters').optional(),
  executionDateTime: z.number().refine(val => val > Date.now(), 'Execution date must be in the future'),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export const todoCreateSchema = todoBaseSchema;
export const todoEditSchema = todoBaseSchema.extend({
  status: z.nativeEnum(TODO_STATUS),
});