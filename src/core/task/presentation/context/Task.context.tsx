import { createContext } from 'react';
import { NotImplementedError } from '@/core/common/helpers/ErrorHandlers.helper';

import { Task } from '@/core/task/domain/Task.model';
import { TaskEntity } from '@/core/task/domain/entities/Task.entity';
import { FindTasksDTO } from '@/core/task/domain/dtos/FindTasks.dto';

interface TaskContextProps {
	tasks: Task[];
	taskSelected: Task | null;
	selectTask: (task: Task) => void;
	unselectTask: () => void;
	createTask: (task: TaskEntity) => Task;
	updateTask: (task: TaskEntity) => Task;
	deleteTask: (task: Task) => Task;
	startTask: (task: Task) => Task;
	stopTask: (task: Task) => Task;
	findTasks: (params: FindTasksDTO) => Task[];
}

export const TaskContext = createContext<TaskContextProps>({
	tasks: [],
	taskSelected: null,
	findTasks: () => {
		throw new NotImplementedError('TaskContext.findTasks() method not implemented.');
	},
	selectTask: () => {
		throw new NotImplementedError('TaskContext.selectTask() method not implemented.');
	},
	unselectTask: () => {
		throw new NotImplementedError('TaskContext.unselectTask() method not implemented.');
	},
	startTask: () => {
		throw new NotImplementedError('TaskContext.startTask() method not implemented.');
	},
	stopTask: () => {
		throw new NotImplementedError('TaskContext.stopTask() method not implemented.');
	},
	createTask: () => {
		throw new NotImplementedError('TaskContext.createTask() method not implemented.');
	},
	updateTask: () => {
		throw new NotImplementedError('TaskContext.updateTask() method not implemented.');
	},
	deleteTask: () => {
		throw new NotImplementedError('TaskContext.deleteTask() method not implemented.');
	},
});
