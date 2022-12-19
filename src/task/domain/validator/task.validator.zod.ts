import { z } from 'zod';
import { ValidatorFieldsZod } from '@fvsystem/fvshop-shared-entities';
import { TaskProps } from '@root';

export class TaskValidatorZod extends ValidatorFieldsZod<TaskProps> {
  constructor() {
    super();
    this.schema = z
      .object({
        description: z.string().min(3).max(255),
        name: z.string().min(3).max(50),
        timeInDays: z.number().min(1).max(100),
        startDate: z.date(),
        endDate: z.date().optional(),
        completed: z.boolean(),
      })
      .refine((schema) => (schema.completed ? !!schema.endDate : true), {
        message: 'End date is required when task is completed',
        path: ['endDate'],
      });
  }
}
