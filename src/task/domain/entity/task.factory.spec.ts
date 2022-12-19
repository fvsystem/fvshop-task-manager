import { v4 as uuid, validate as validateUuid } from 'uuid';
import {
  NameValueObject,
  RoleValueObject,
  UserEntity,
  UserEntityFactory,
} from '@fvsystem/fvshop-user-manager';
import { TaskFactory, TaskEntity } from '@root';
import { UniqueEntityId } from '@fvsystem/fvshop-shared-entities';

describe('TaskFactory', () => {
  it('should create a task', () => {
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
      email: 'teste@teste.com',
    });
    const task = TaskFactory.create({
      description: 'description',
      name: 'name',
      timeInDays: 1,
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
    expect(validateUuid(task.id)).toBe(true);
  });

  it('should create a task', () => {
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
      email: 'teste@teste.com',
    });
    const uuidValue = uuid();
    const uniqueId = new UniqueEntityId(uuidValue);
    const task = TaskFactory.create(
      {
        description: 'description',
        name: 'name',
        timeInDays: 1,
        responsible: user,
        completed: false,
        startDate: new Date(2022, 1, 2),
      },
      uniqueId
    );

    expect(task).toBeInstanceOf(TaskEntity);
    expect(task.description).toBe('description');
    expect(task.name).toBe('name');
    expect(task.timeInDays).toBe(1);
    expect(task.startDate).toBeInstanceOf(Date);
    expect(task.responsible).toBeInstanceOf(UserEntity);
    expect(task.deadline).toBeInstanceOf(Date);
    expect(task.deadline).toStrictEqual(new Date(2022, 1, 3));
    expect(task.id).toBe(uuidValue);
  });
});
