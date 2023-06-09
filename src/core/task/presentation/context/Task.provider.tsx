import { useCallback, useEffect, useReducer, useState } from 'react';

import { Task } from '@/core/task/domain/Task.model';
import { TaskEntity } from '@/core/task/domain/entities/Task.entity';
import { FindTasksDTO } from '@/core/task/domain/dtos/FindTasks.dto';
import { TaskCreatedEvent, TaskCreatedEventListener } from '@/core/task/application/events/TaskCreated.event';
import { TaskUpdatedEvent, TaskUpdatedEventListener } from '@/core/task/application/events/TaskUpdated.event';
import { TaskDeletedEvent, TaskDeletedEventListener } from '@/core/task/application/events/TaskDeleted.event';
import { UnloadEvent, UnloadEventListener } from '@/core/common/events/Unload.event';
import { TaskTimedEvent } from '@/core/task/application/events/TaskTimed.event';
import { TaskService } from '@/core/task/application/Task.service';
import { TaskContext } from '@/core/task/presentation/context/Task.context';
import { TaskState } from '@/core/task/presentation/state/Task.state';
import { TaskMapper } from '@/core/task/infrastructure/Task.mapper';

export const TaskProvider = ({ children }: { children: JSX.Element }) => {
	const [{ taskSelected }, dispatch] = useReducer(
		TaskState.reducer,
		TaskState.initialValues,
		TaskState.initializer
	);

	const [tasks, setTasks] = useState([] as Task[]);

	const findTasks = useCallback((params: FindTasksDTO) => {
		const tasks = TaskService.findTasks(params).map(TaskMapper.toModel);
		setTasks(tasks);
		return tasks;
	}, []);

	const selectTask = useCallback((task: Task | TaskEntity) => {
		if (task instanceof Task) {
			task = TaskMapper.toEntity(task);
		}

		dispatch({ type: 'task/selected', payload: task });
	}, []);

	const unselectTask = useCallback(() => {
		dispatch({ type: 'task/unselected', payload: null });
	}, []);

	const startTask = useCallback((task: Task | TaskEntity) => {
		const taskStarted = TaskService.startTask(task);
		return taskStarted;
	}, []);

	const stopTask = useCallback((task: Task | TaskEntity) => {
		const taskStopped = TaskService.stopTask(task);
		return taskStopped;
	}, []);

	const createTask = useCallback((task: Task | TaskEntity) => {
		const taskCreated = TaskService.createTask(task);
		const taskModel = TaskMapper.toModel(taskCreated);

		return taskModel;
	}, []);

	const updateTask = useCallback((task: Task | TaskEntity) => {
		const taskUpdated = TaskService.updateTask(task);
		const taskModel = TaskMapper.toModel(taskUpdated);

		return taskModel;
	}, []);

	const deleteTask = useCallback((task: Task | TaskEntity) => {
		const taskDeleted = TaskService.deleteTask(task);
		const taskModel = TaskMapper.toModel(taskDeleted);

		return taskModel;
	}, []);

	useEffect(() => {
		const handleTaskCreated: TaskCreatedEventListener = (event) => {
			const taskModel = TaskMapper.toModel(event.detail.task);
			setTasks((previous) => [...previous, taskModel]);
		};

		const handleTaskUpdated: TaskUpdatedEventListener = (event) => {
			const taskModel = TaskMapper.toModel(event.detail.task);
			setTasks((previous) =>
				previous.map((task) => (task.id.get() === taskModel.id.get() ? taskModel : task))
			);
		};

		const handleTaskDeleted: TaskDeletedEventListener = (event) => {
			const taskModel = TaskMapper.toModel(event.detail.task);
			setTasks((previous) => previous.filter((task) => task.id.get() !== taskModel.id.get()));
		};

		const handleUnload: UnloadEventListener = (event) => {
			event.preventDefault();
			TaskService.stopAllTasks();
		};

		TaskCreatedEvent.subscribe(handleTaskCreated);
		TaskUpdatedEvent.subscribe(handleTaskUpdated);
		TaskDeletedEvent.subscribe(handleTaskDeleted);

		TaskTimedEvent.subscribe(handleTaskUpdated);

		UnloadEvent.subscribe(handleUnload);

		return () => {
			TaskCreatedEvent.unsubscribe(handleTaskCreated);
			TaskUpdatedEvent.unsubscribe(handleTaskUpdated);
			TaskDeletedEvent.unsubscribe(handleTaskDeleted);

			TaskTimedEvent.unsubscribe(handleTaskUpdated);

			UnloadEvent.unsubscribe(handleUnload);
		};
	}, []);

	return (
		<TaskContext.Provider
			value={{
				tasks,
				taskSelected: taskSelected ? TaskMapper.toModel(taskSelected) : null,
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
