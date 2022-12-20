import { UserEntity } from '@fvsystem/fvshop-user-manager';
import { TaskFactory, TaskEntity } from '@root';

export interface AssignTaskToUserProps {
  description: string;
  name: string;
  timeInDays: number;
  responsible: UserEntity;
}

export class TaskService {
  static assignTaskToUser(props: AssignTaskToUserProps): TaskEntity {
    const { description, name, timeInDays, responsible } = props;
    const startDate = new Date();
    const task = TaskFactory.create({
      description,
      name,
      startDate,
      timeInDays,
      responsible,
      completed: false,
    });
    return task;
  }

  static completeTask(task: TaskEntity): TaskEntity {
    task.complete();
    return task;
  }

  static cancelTask(task: TaskEntity): TaskEntity {
    task.cancel();
    return task;
  }

  static postponeTask(task: TaskEntity, days: number): TaskEntity {
    task.postpone(days);
    return task;
  }

  static changeTaskResponsible(
    task: TaskEntity,
    responsible: UserEntity
  ): TaskEntity {
    task.changeResponsible(responsible);
    return task;
  }
}
