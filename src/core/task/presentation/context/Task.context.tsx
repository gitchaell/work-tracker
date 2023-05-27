import { createContext } from 'react';

import { Response } from '@/core/common/interfaces/Response.interface';
import { NotImplementedError } from '@/core/common/helpers/ErrorHandlers.helper';
import { Task } from '@/core/task/domain/Task.entity';
import { CreateTaskDTO, DeleteTaskDTO, FindTasksDTO, UpdateTaskDTO } from '@/core/task/domain/Task.dto';
import { Work } from '@/core/work/domain/Work.entity';

interface TaskContextProps {
	tasks: Task[];
	tasksTimed: Task[];
	taskSelected: Task | null;
	selectTask: (task: Task) => void;
	unselectTask: () => void;
	createTask: (task: CreateTaskDTO) => Response<Task | null>;
	updateTask: (task: UpdateTaskDTO) => Response<Task | null>;
	deleteTask: (task: DeleteTaskDTO) => Response<Task | null>;
	startTask: (task: Task, work: Work) => Response<Task>;
	stopTask: (task: Task) => Response<Task>;
	findTasks: (params: FindTasksDTO) => Response<Task[]>;
}

export const TaskContext = createContext<TaskContextProps>({
	tasks: [],
	tasksTimed: [],
	taskSelected: null,
	findTasks: () => {
		throw new NotImplementedError('findTasks() method not implemented.');
	},
	selectTask: () => {
		throw new NotImplementedError('selectTask() method not implemented.');
	},
	unselectTask: () => {
		throw new NotImplementedError('unselectTask() method not implemented.');
	},
	startTask: () => {
		throw new NotImplementedError('startTask() method not implemented.');
	},
	stopTask: () => {
		throw new NotImplementedError('stopTask() method not implemented.');
	},
	createTask: () => {
		throw new NotImplementedError('createTask() method not implemented.');
	},
	updateTask: () => {
		throw new NotImplementedError('updateTask() method not implemented.');
	},
	deleteTask: () => {
		throw new NotImplementedError('deleteTask() method not implemented.');
	},
});
