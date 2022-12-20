import {
  NameValueObject,
  RoleValueObject,
  UserEntityFactory,
} from '@fvsystem/fvshop-user-manager';
import { TaskService, TaskFactory, SameResponsibleChangeError } from '@root';

describe('TaskService', () => {
  it('should assign a task to a user', () => {
    jest.useFakeTimers().setSystemTime(new Date(2022, 1, 2));
    const name = new NameValueObject({
      firstName: 'John',
      lastName: 'Doe',
    });
    const role = new RoleValueObject({
      name: 'admin',
    });
    const user = UserEntityFactory.create({
      name,
      role,
      email: 'test@test.com',
    });
    const task = TaskService.assignTaskToUser({
      description: 'description',
      name: 'name',
      timeInDays: 1,
      responsible: user,
    });

    expect(task.canceled).toBe(false);
    expect(task.completed).toBe(false);
    expect(task.description).toBe('description');
    expect(task.deadline).toStrictEqual(new Date(2022, 1, 3));
    expect(task.name).toBe('name');
    expect(task.responsible).toBe(user);
    expect(task.startDate).toStrictEqual(new Date(2022, 1, 2));
    expect(task.status).toBe('pending');
  });

  it('should complete a task', () => {
    jest.useFakeTimers().setSystemTime(new Date(2022, 1, 2));
    const name = new NameValueObject({
      firstName: 'John',
      lastName: 'Doe',
    });
    const role = new RoleValueObject({
      name: 'admin',
    });
    const user = UserEntityFactory.create({
      name,
      role,
      email: 'test@test.com',
    });
    const task = TaskFactory.create({
      description: 'description',
      name: 'name',
      timeInDays: 1,
      responsible: user,
      completed: false,
      startDate: new Date(2022, 1, 1),
    });

    TaskService.completeTask(task);
    expect(task.canceled).toBe(false);
    expect(task.completed).toBe(true);
    expect(task.endDate).toStrictEqual(new Date(2022, 1, 2));
  });

  it('should cancel a task', () => {
    jest.useFakeTimers().setSystemTime(new Date(2022, 1, 2));
    const name = new NameValueObject({
      firstName: 'John',
      lastName: 'Doe',
    });
    const role = new RoleValueObject({
      name: 'admin',
    });
    const user = UserEntityFactory.create({
      name,
      role,
      email: 'test@test.com',
    });
    const task = TaskFactory.create({
      description: 'description',
      name: 'name',
      timeInDays: 1,
      responsible: user,
      completed: false,
      startDate: new Date(2022, 1, 1),
    });

    TaskService.cancelTask(task);
    expect(task.canceled).toBe(true);
    expect(task.completed).toBe(false);
    expect(task.endDate).toBeNull();
  });

  it('should postpone a task', () => {
    jest.useFakeTimers().setSystemTime(new Date(2022, 1, 2));
    const name = new NameValueObject({
      firstName: 'John',
      lastName: 'Doe',
    });
    const role = new RoleValueObject({
      name: 'admin',
    });
    const user = UserEntityFactory.create({
      name,
      role,
      email: 'test@test.com',
    });
    const task = TaskFactory.create({
      description: 'description',
      name: 'name',
      timeInDays: 1,
      responsible: user,
      completed: false,
      startDate: new Date(2022, 1, 1),
    });

    TaskService.postponeTask(task, 1);
    expect(task.canceled).toBe(false);
    expect(task.completed).toBe(false);
    expect(task.endDate).toBeNull();
    expect(task.deadline).toStrictEqual(new Date(2022, 1, 3));
  });

  it('should change responsible', () => {
    jest.useFakeTimers().setSystemTime(new Date(2022, 1, 2));
    const name = new NameValueObject({
      firstName: 'John',
      lastName: 'Doe',
    });

    const name2 = new NameValueObject({
      firstName: 'Mary',
      lastName: 'Jane',
    });
    const role = new RoleValueObject({
      name: 'admin',
    });
    const user = UserEntityFactory.create({
      name,
      role,
      email: 'test@test.com',
    });
    const user2 = UserEntityFactory.create({
      name: name2,
      role,
      email: 'test2@test.com',
    });
    const task = TaskFactory.create({
      description: 'description',
      name: 'name',
      timeInDays: 1,
      responsible: user,
      completed: false,
      startDate: new Date(2022, 1, 1),
    });

    expect(task.responsible).toBe(user);
    TaskService.changeTaskResponsible(task, user2);
    expect(task.responsible).toBe(user2);
  });

  it('should not change responsability to same user', () => {
    jest.useFakeTimers().setSystemTime(new Date(2022, 1, 2));
    const name = new NameValueObject({
      firstName: 'John',
      lastName: 'Doe',
    });

    const role = new RoleValueObject({
      name: 'admin',
    });
    const user = UserEntityFactory.create({
      name,
      role,
      email: 'test@test.com',
    });
    const task = TaskFactory.create({
      description: 'description',
      name: 'name',
      timeInDays: 1,
      responsible: user,
      completed: false,
      startDate: new Date(2022, 1, 1),
    });

    expect(task.responsible).toBe(user);
    expect(() => TaskService.changeTaskResponsible(task, user)).toThrowError(
      SameResponsibleChangeError
    );
  });
});
