import { TaskValidatorZod } from '@root';

describe('TaskValidator', () => {
  it('should validate a task', () => {
    const taskValidator = new TaskValidatorZod();
    const result = taskValidator.validate({
      description: 'description',
      name: 'name',
      timeInDays: 1,
      startDate: new Date(),
      completed: false,
    });
    expect(result).toBeTruthy();
    expect(taskValidator.errors).toBeNull();
  });
  it('should not validate a task', () => {
    const taskValidator = new TaskValidatorZod();
    const result = taskValidator.validate({
      description: '',
      name: '',
      timeInDays: 0,
      startDate: 2,
      completed: 3,
    });
    expect(result).toBeFalsy();
    expect(taskValidator.errors).toStrictEqual({
      description: ['String must contain at least 3 character(s)'],
      name: ['String must contain at least 3 character(s)'],
      timeInDays: ['Number must be greater than or equal to 1'],
      startDate: ['Expected date, received number'],
      completed: ['Expected boolean, received number'],
    });
  });

  it('should not validate a task if end date is not sent in a completed task', () => {
    const taskValidator = new TaskValidatorZod();
    const result = taskValidator.validate({
      description: 'description',
      name: 'name',
      timeInDays: 1,
      startDate: new Date(),
      completed: true,
    });
    expect(result).toBeFalsy();
    expect(taskValidator.errors).toStrictEqual({
      endDate: ['End date is required when task is completed'],
    });
  });
});
