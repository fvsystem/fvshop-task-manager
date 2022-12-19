import { TaskValidatorFactory, TaskValidatorZod } from '@root';

describe('TaskValidatorFactory', () => {
  it('should create a TaskValidator', () => {
    const taskValidator = TaskValidatorFactory.create();
    expect(taskValidator).toBeInstanceOf(TaskValidatorZod);
  });
});
