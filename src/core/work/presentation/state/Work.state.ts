import { StateStorage } from '@/core/common/helpers/StateStorage.helper';
import { WorkEntity } from '@/core/work/domain/entities/Work.entity';

export interface WorkState {
	workSelected: WorkEntity | null;
}

export type WorkAction =
	| { type: 'work/selected'; payload: WorkEntity }
	| { type: 'work/unselected'; payload: null };

export type WorkActionType = 'work/selected' | 'work/unselected';
export type WorkActionPayload = WorkEntity | null;

const WorkReducer = (state: WorkState, action: WorkAction): WorkState => {
	StateStorage.save<WorkActionType, WorkActionPayload>(action);

	if (action.type === 'work/selected') {
		return { ...state, workSelected: action.payload };
	}

	if (action.type === 'work/unselected') {
		return { ...state, workSelected: null };
	}

	return state;
};

const WorkInitialState: WorkState = {
	workSelected: null,
};

const WorkStateInitializer = (state: WorkState) => {
	const workState = StateStorage.value<WorkActionType, WorkActionPayload>();
	const workSelected = workState.get('work/selected') || null;

	return {
		...state,
		workSelected,
	};
};

export const WorkState = {
	reducer: WorkReducer,
	initialState: WorkInitialState,
	initializer: WorkStateInitializer,
};
