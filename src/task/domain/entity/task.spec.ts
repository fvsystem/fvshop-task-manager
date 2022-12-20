import {
  UserEntity,
  NameValueObject,
  UserEntityFactory,
  RoleValueObject,
} from '@fvsystem/fvshop-user-manager';
import { TaskEntity } from '@root';

describe('TaskEntity', () => {
  it('should be created an overdue task', () => {
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
    const task = new TaskEntity({
      description: 'description',
      name: 'name',
      timeInDays: 1,
      startDate: new Date(2022, 1, 2),
      responsible: user,
      completed: false,
    });
    expect(task).toBeInstanceOf(TaskEntity);
    expect(task.description).toBe('description');
    expect(task.name).toBe('name');
    expect(task.timeInDays).toBe(1);
    expect(task.startDate).toBeInstanceOf(Date);
    expect(task.responsible).toBeInstanceOf(UserEntity);
    expect(task.deadline).toBeInstanceOf(Date);
    expect(task.deadline).toStrictEqual(new Date(2022, 1, 3));
    expect(task.responsible.name.fullName).toBe(name.fullName);
    expect(task.completed).toBe(false);
    expect(task.canceled).toBe(false);
    expect(task.status).toBe('overdue');
  });

  it('should be created a pending task', () => {
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
    const task = new TaskEntity({
      description: 'description',
      name: 'name',
      timeInDays: 1,
      startDate: new Date(2122, 1, 2),
      responsible: user,
      completed: false,
    });
    expect(task).toBeInstanceOf(TaskEntity);
    expect(task.description).toBe('description');
    expect(task.name).toBe('name');
    expect(task.timeInDays).toBe(1);
    expect(task.startDate).toBeInstanceOf(Date);
    expect(task.responsible).toBeInstanceOf(UserEntity);
    expect(task.deadline).toBeInstanceOf(Date);
    expect(task.deadline).toStrictEqual(new Date(2122, 1, 3));
    expect(task.responsible.name.fullName).toBe(name.fullName);
    expect(task.completed).toBe(false);
    expect(task.canceled).toBe(false);
    expect(task.status).toBe('pending');
  });

  it('should be created a completed task', () => {
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
    const task = new TaskEntity({
      description: 'description',
      name: 'name',
      timeInDays: 1,
      startDate: new Date(2122, 1, 2),
      responsible: user,
      completed: true,
      endDate: new Date(2122, 1, 4),
    });
    expect(task).toBeInstanceOf(TaskEntity);
    expect(task.description).toBe('description');
    expect(task.name).toBe('name');
    expect(task.timeInDays).toBe(1);
    expect(task.startDate).toBeInstanceOf(Date);
    expect(task.responsible).toBeInstanceOf(UserEntity);
    expect(task.deadline).toBeInstanceOf(Date);
    expect(task.deadline).toStrictEqual(new Date(2122, 1, 3));
    expect(task.responsible.name.fullName).toBe(name.fullName);
    expect(task.completed).toBe(true);
    expect(task.canceled).toBe(false);
    expect(task.status).toBe('completed');
  });

  it('should be created a canceled task', () => {
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
    const task = new TaskEntity({
      description: 'description',
      name: 'name',
      timeInDays: 1,
      startDate: new Date(2122, 1, 2),
      responsible: user,
      completed: false,
      canceled: true,
    });
    expect(task).toBeInstanceOf(TaskEntity);
    expect(task.description).toBe('description');
    expect(task.name).toBe('name');
    expect(task.timeInDays).toBe(1);
    expect(task.startDate).toBeInstanceOf(Date);
    expect(task.responsible).toBeInstanceOf(UserEntity);
    expect(task.deadline).toBeInstanceOf(Date);
    expect(task.deadline).toStrictEqual(new Date(2122, 1, 3));
    expect(task.responsible.name.fullName).toBe(name.fullName);
    expect(task.completed).toBe(false);
    expect(task.canceled).toBe(true);
    expect(task.status).toBe('canceled');
  });

  it('should not create an invalid task', () => {
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
    expect(
      () =>
        new TaskEntity({
          description: 'description',
          name: 'name',
          timeInDays: 0,
          startDate: new Date(2022, 1, 2),
          responsible: user,
          completed: false,
        })
    ).toThrow();
  });
});
