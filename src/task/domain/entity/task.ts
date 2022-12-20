import { UserEntity } from '@fvsystem/fvshop-user-manager';
import {
  Entity,
  EntityValidationError,
  UniqueEntityId,
} from '@fvsystem/fvshop-shared-entities';
import { TaskValidatorFactory } from '../validator';

export type TaskStatus = 'pending' | 'completed' | 'canceled' | 'overdue';

export interface TaskProps {
  description: string;
  name: string;
  timeInDays: number;
  startDate: Date;
  responsible: UserEntity;
  completed: boolean;
  endDate?: Date;
  canceled?: boolean;
}

export class TaskEntity extends Entity<TaskProps> {
  constructor(props: TaskProps, id?: UniqueEntityId) {
    super(props, id);
    TaskEntity.validate({
      description: props.description,
      name: props.name,
      timeInDays: props.timeInDays,
      startDate: props.startDate,
      completed: props.completed,
      endDate: props.endDate,
    });
    this.props.description = props.description;
    this.props.name = props.name;
    this.props.timeInDays = props.timeInDays;
    this.props.startDate = props.startDate;
    this.props.responsible = props.responsible;
    this.props.completed = props.completed;
    this.props.endDate = props.endDate;
    this.props.canceled = props.canceled || false;
  }

  get description(): string {
    return this.props.description;
  }

  get canceled(): boolean {
    return this.props.canceled || false;
  }

  get status(): TaskStatus {
    if (this.canceled) {
      return 'canceled';
    }
    if (this.completed) {
      return 'completed';
    }
    if (this.deadline < new Date()) {
      return 'overdue';
    }
    return 'pending';
  }

  get name(): string {
    return this.props.name;
  }

  get timeInDays(): number {
    return this.props.timeInDays;
  }

  get completed(): boolean {
    return this.props.completed;
  }

  get startDate(): Date {
    return this.props.startDate;
  }

  get responsible(): UserEntity {
    return this.props.responsible;
  }

  get deadline(): Date {
    return new Date(
      this.startDate.getTime() + this.timeInDays * 24 * 60 * 60 * 1000
    );
  }

  static validate(props: Omit<TaskProps, 'responsible'>) {
    const validator = TaskValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
