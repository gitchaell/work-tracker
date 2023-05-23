import { createContext } from 'react';

import { Task } from '@/core/task/domain/Task.entity';
import { CreateTaskDTO, DeleteTaskDTO, FindTasksDTO, UpdateTaskDTO } from '@/core/task/domain/Task.dto';
import { Work } from '@/core/work/domain/Work.entity';

interface TaskContextProps {
	tasks: Task[];
	tasksTimed: Task[];
	taskSelected: Task | null;
	findTasks: (params: FindTasksDTO) => Task[];
	selectTask: (task: Task) => void;
	unselectTask: () => void;
	startTask: (task: Task, work: Work) => void;
	stopTask: (task: Task) => void;
	createTask: (task: CreateTaskDTO) => void;
	updateTask: (task: UpdateTaskDTO) => void;
	deleteTask: (task: DeleteTaskDTO) => void;
}

export const TaskContext = createContext<TaskContextProps>({
	tasks: [],
	tasksTimed: [],
	taskSelected: null,
	findTasks: () => {
		throw new Error('findTasks() method not implemented.');
	},
	selectTask: () => {
		throw new Error('selectTask() method not implemented.');
	},
	unselectTask: () => {
		throw new Error('unselectTask() method not implemented.');
	},
	startTask: () => {
		throw new Error('startTask() method not implemented.');
	},
	stopTask: () => {
		throw new Error('stopTask() method not implemented.');
	},
	createTask: () => {
		throw new Error('createTask() method not implemented.');
	},
	updateTask: () => {
		throw new Error('updateTask() method not implemented.');
	},
	deleteTask: () => {
		throw new Error('deleteTask() method not implemented.');
	},
});
