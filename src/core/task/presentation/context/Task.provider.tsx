import { useCallback, useEffect, useReducer, useState } from 'react';

import { Task } from '@/core/task/domain/Task.entity';
import { TaskService } from '@/core/task/application/Task.service';
import {
	TaskInitialState,
	TaskReducer,
	TaskStateInitializer,
} from '@/core/task/presentation/state/Task.state';
import { TaskContext } from '@/core/task/presentation/context/Task.context';
import { CreateTaskDTO, DeleteTaskDTO, FindTasksDTO, UpdateTaskDTO } from '@/core/task/domain/Task.dto';
import { TaskCreatedEvent, TaskCreatedEventListener } from '@/core/task/application/events/TaskCreated.event';
import { TaskUpdatedEvent, TaskUpdatedEventListener } from '@/core/task/application/events/TaskUpdated.event';
import { TaskDeletedEvent, TaskDeletedEventListener } from '@/core/task/application/events/TaskDeleted.event';
import { TaskTimedEvent, TaskTimedEventListener } from '@/core/task/application/events/TaskTimed.event';
import { Work } from '@/core/work/domain/Work.entity';

export const TaskProvider = ({ children }: { children: JSX.Element }) => {
	const [{ tasksTimed, taskSelected }, dispatch] = useReducer(
		TaskReducer,
		TaskInitialState,
		TaskStateInitializer
	);

	const [tasks, setTasks] = useState([] as Task[]);

	const findTasks = useCallback((params: FindTasksDTO) => {
		const tasks = TaskService.findTasks(params);
		setTasks(tasks);
		return tasks;
	}, []);

	const selectTask = useCallback((task: Task) => {
		dispatch({ type: 'task/selected', payload: task });
	}, []);

	const unselectTask = useCallback(() => {
		dispatch({ type: 'task/unselected', payload: null });
	}, []);

	const startTask = useCallback((task: Task, work: Work) => {
		TaskService.startTask(task, work);
		dispatch({ type: 'task/started', payload: task });
	}, []);

	const stopTask = useCallback((task: Task) => {
		TaskService.stopTask(task);
		dispatch({ type: 'task/stopped', payload: task });
	}, []);

	const createTask = useCallback((task: CreateTaskDTO) => {
		return TaskService.createTask(task);
	}, []);

	const updateTask = useCallback((task: UpdateTaskDTO) => {
		return TaskService.updateTask(task);
	}, []);

	const deleteTask = useCallback((task: DeleteTaskDTO) => {
		return TaskService.deleteTask(task);
	}, []);

	useEffect(() => {
		const handleTaskCreated: TaskCreatedEventListener = (event) => {
			const { task } = event.detail;
			setTasks((previous) => [...previous, task]);
		};

		const handleTaskUpdated: TaskUpdatedEventListener = (event) => {
			const { task } = event.detail;
			setTasks((previous) => previous.map((t) => (t.id === task.id ? task : t)));
		};

		const handleTaskDeleted: TaskDeletedEventListener = (event) => {
			const { task } = event.detail;
			setTasks((previous) => previous.filter((t) => t.id !== task.id));
		};

		const handleTaskTimed: TaskTimedEventListener = (event) => {
			const { task } = event.detail;
			const taskUpdated = TaskService.updateTask(task);
			setTasks((previous) => previous.map((t) => (t.id === taskUpdated.id ? taskUpdated : t)));
		};

		TaskCreatedEvent.subscribe(handleTaskCreated);
		TaskUpdatedEvent.subscribe(handleTaskUpdated);
		TaskDeletedEvent.subscribe(handleTaskDeleted);

		TaskTimedEvent.subscribe(handleTaskTimed);

		return () => {
			TaskCreatedEvent.unsubscribe(handleTaskCreated);
			TaskUpdatedEvent.unsubscribe(handleTaskUpdated);
			TaskDeletedEvent.unsubscribe(handleTaskDeleted);

			TaskTimedEvent.unsubscribe(handleTaskTimed);
		};
	}, []);

	return (
		<TaskContext.Provider
			value={{
				tasks,
				tasksTimed,
				taskSelected,
				selectTask,
				unselectTask,
				startTask,
				stopTask,
				findTasks,
				createTask,
				updateTask,
				deleteTask,
			}}
		>
			{children}
		</TaskContext.Provider>
	);
};
