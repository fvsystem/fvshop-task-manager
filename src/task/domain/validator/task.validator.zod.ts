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
        canceled: z.boolean().optional(),
      })
      .refine((schema) => (schema.completed ? !!schema.endDate : true), {
        message: 'End date is required when task is completed',
        path: ['endDate'],
      })
      .refine((schema) => (schema.endDate ? !!schema.completed : true), {
        message: 'Completed must be true when end date is sent',
        path: ['completed'],
      })
      .refine(
        (schema) =>
          schema.endDate
            ? schema.endDate.getTime() > schema.startDate.getTime()
            : true,
        {
          message: 'end date must be bigger than start date',
          path: ['endDate'],
        }
      )
      .refine((schema) => (schema.canceled ? !schema.endDate : true), {
        message: 'a task cannot have an end date if it is canceled',
        path: ['endDate'],
      })
      .refine((schema) => (schema.canceled ? !schema.completed : true), {
        message: 'a task cannot be completed if it is canceled',
        path: ['completed'],
      });
  }
}
