import { TaskValidatorZod } from '@root';

export class TaskValidatorFactory {
  static create(): TaskValidatorZod {
    return new TaskValidatorZod();
  }
}
