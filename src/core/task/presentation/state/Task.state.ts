import { StateStorage } from '@/core/common/helpers/StateStorage.helper';
import { TaskEntity } from '@/core/task/domain/entities/Task.entity';

export interface TaskState {
	taskSelected: TaskEntity | null;
}

export type TaskAction =
	| { type: 'task/selected'; payload: TaskEntity }
	| { type: 'task/unselected'; payload: null };

export type TaskActionType = 'task/selected' | 'task/unselected';
export type TaskActionPayload = TaskEntity | null;

const TaskStateReducer = (state: TaskState, action: TaskAction): TaskState => {
	StateStorage.save<TaskActionType, TaskActionPayload>(action);

	if (action.type === 'task/selected') {
		return { ...state, taskSelected: action.payload };
	}

	if (action.type === 'task/unselected') {
		return { ...state, taskSelected: null };
	}

	return state;
};

const TaskInitialState: TaskState = {
	taskSelected: null,
};

const TaskStateInitializer = (state: TaskState) => {
	const taskState = StateStorage.value<TaskActionType, TaskActionPayload>();
	const taskSelected = taskState.get('task/selected') || null;

	return {
		...state,
		taskSelected,
	};
};

export const TaskState = {
	reducer: TaskStateReducer,
	initialValues: TaskInitialState,
	initializer: TaskStateInitializer,
};
