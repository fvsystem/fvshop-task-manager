import { v4 as uuid } from 'uuid';
import { TaskProps } from '@root';
import { UniqueEntityId } from '@fvsystem/fvshop-shared-entities';
import { TaskEntity } from './task';

interface TaskCreateProps extends Omit<TaskProps, 'startDate'> {
  startDate?: Date;
}

export class TaskFactory {
  static create(props: TaskCreateProps, id?: UniqueEntityId): TaskEntity {
    const uuidValue = id?.value || uuid();
    const uniqueId = new UniqueEntityId(uuidValue);
    const startDate = props.startDate || new Date();

    return new TaskEntity({ ...props, startDate }, uniqueId);
  }
}
