import { useCallback, useEffect, useReducer, useState } from 'react';

import { Task } from '@/core/task/domain/Task.model';
import { TaskEntity } from '@/core/task/domain/entities/Task.entity';
import { FindTasksDTO } from '@/core/task/domain/dtos/FindTasks.dto';
import { TaskCreatedEvent, TaskCreatedEventListener } from '@/core/task/application/events/TaskCreated.event';
import { TaskUpdatedEvent, TaskUpdatedEventListener } from '@/core/task/application/events/TaskUpdated.event';
import { TaskDeletedEvent, TaskDeletedEventListener } from '@/core/task/application/events/TaskDeleted.event';
import { TaskTimedEvent } from '@/core/task/application/events/TaskTimed.event';
import { TaskService } from '@/core/task/application/Task.service';
import { TaskContext } from '@/core/task/presentation/context/Task.context';
import { TaskState } from '@/core/task/presentation/state/Task.state';

export const TaskProvider = ({ children }: { children: JSX.Element }) => {
	const [{ taskSelected }, dispatch] = useReducer(
		TaskState.reducer,
		TaskState.initialValues,
		TaskState.initializer
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

	const startTask = useCallback((task: Task) => {
		return TaskService.startTask(task);
	}, []);

	const stopTask = useCallback((task: Task) => {
		return TaskService.stopTask(task);
	}, []);

	const createTask = useCallback((task: TaskEntity) => {
		const taskCreated = TaskService.createTask(task);
		setTasks((previous) => [...previous, taskCreated]);
		return taskCreated;
	}, []);

	const updateTask = useCallback((task: TaskEntity) => {
		const taskUpdated = TaskService.updateTask(task);
		setTasks((previous) => previous.map((task) => (task.id === taskUpdated.id ? taskUpdated : task)));
		return taskUpdated;
	}, []);

	const deleteTask = useCallback((task: Task) => {
		const taskDeleted = TaskService.deleteTask(task);
		setTasks((previous) => previous.filter((task) => task.id !== taskDeleted.id));
		return taskDeleted;
	}, []);

	useEffect(() => {
		const handleTaskCreated: TaskCreatedEventListener = (event) => {
			createTask(event.detail.task);
		};

		const handleTaskUpdated: TaskUpdatedEventListener = (event) => {
			updateTask(event.detail.task);
		};

		const handleTaskDeleted: TaskDeletedEventListener = (event) => {
			deleteTask(event.detail.task);
		};

		TaskCreatedEvent.subscribe(handleTaskCreated);
		TaskUpdatedEvent.subscribe(handleTaskUpdated);
		TaskDeletedEvent.subscribe(handleTaskDeleted);

		TaskTimedEvent.subscribe(handleTaskUpdated);

		return () => {
			TaskCreatedEvent.unsubscribe(handleTaskCreated);
			TaskUpdatedEvent.unsubscribe(handleTaskUpdated);
			TaskDeletedEvent.unsubscribe(handleTaskDeleted);

			TaskTimedEvent.unsubscribe(handleTaskUpdated);
		};
	}, []);

	return (
		<TaskContext.Provider
			value={{
				tasks,
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
