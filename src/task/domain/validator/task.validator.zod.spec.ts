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

  it('should not validate a task if completed is not sent in a task with end date', () => {
    const taskValidator = new TaskValidatorZod();
    const startDate = new Date(2022, 1, 1);
    const endDate = new Date(2023, 1, 1);
    const result = taskValidator.validate({
      description: 'description',
      name: 'name',
      timeInDays: 1,
      startDate,
      endDate,
      completed: false,
    });
    expect(result).toBeFalsy();
    expect(taskValidator.errors).toStrictEqual({
      completed: ['Completed must be true when end date is sent'],
    });
  });

  it('should not validate when end Date is bigger than start date', () => {
    const taskValidator = new TaskValidatorZod();
    const startDate = new Date(2022, 1, 1);
    const endDate = new Date(2021, 1, 1);
    const result = taskValidator.validate({
      description: 'description',
      name: 'name',
      timeInDays: 1,
      startDate,
      endDate,
      completed: true,
    });
    expect(result).toBeFalsy();
    expect(taskValidator.errors).toStrictEqual({
      endDate: ['end date must be bigger than start date'],
    });
  });
  it('should not validate when task is cancelled and has endDate or completed', () => {
    const taskValidator = new TaskValidatorZod();
    const startDate = new Date(2022, 1, 1);
    const endDate = new Date(2023, 1, 1);
    const result = taskValidator.validate({
      description: 'description',
      name: 'name',
      timeInDays: 1,
      startDate,
      endDate,
      completed: true,
      canceled: true,
    });
    expect(result).toBeFalsy();
    expect(taskValidator.errors).toStrictEqual({
      endDate: ['a task cannot have an end date if it is canceled'],
      completed: ['a task cannot be completed if it is canceled'],
    });
  });
});
