import { StateStorage } from '@/core/common/helpers/StateStorage.helper';
import { Task } from '@/core/task/domain/Task.entity';

export interface TaskState {
	taskSelected: Task | null;
	taskStarted: Task | null;
	taskStopped: Task | null;
	tasksTimed: Task[];
}

export type TaskAction =
	| { type: 'task/selected'; payload: Task }
	| { type: 'task/unselected'; payload: null }
	| { type: 'task/started'; payload: Task }
	| { type: 'task/stopped'; payload: Task };

export type TaskActionType = 'task/selected' | 'task/unselected' | 'task/started' | 'task/stopped';
export type TaskActionPayload = Task | null;

const TaskStateReducer = (state: TaskState, action: TaskAction): TaskState => {
	StateStorage.save<TaskActionType, TaskActionPayload>(action);

	if (action.type === 'task/selected') {
		return { ...state, taskSelected: action.payload };
	}

	if (action.type === 'task/unselected') {
		return { ...state, taskSelected: null };
	}

	if (action.type === 'task/started') {
		return { ...state, taskStarted: action.payload, tasksTimed: [...state.tasksTimed, action.payload] };
	}

	if (action.type === 'task/stopped') {
		return {
			...state,
			taskStopped: action.payload,
			tasksTimed: state.tasksTimed.filter((task) => task.id !== action.payload.id),
		};
	}

	return state;
};

const TaskInitialState: TaskState = {
	tasksTimed: [],
	taskSelected: null,
	taskStarted: null,
	taskStopped: null,
};

const TaskStateInitializer = (state: TaskState) => {
	const taskState = StateStorage.value<TaskActionType, TaskActionPayload>();
	const taskSelected = taskState.get('task/selected') || null;
	const taskStarted = taskState.get('task/started') || null;
	const taskStopped = taskState.get('task/stopped') || null;

	return {
		...state,
		taskSelected,
		taskStarted,
		taskStopped,
	};
};

export const TaskState = {
	reducer: TaskStateReducer,
	initialValues: TaskInitialState,
	initializer: TaskStateInitializer,
};
