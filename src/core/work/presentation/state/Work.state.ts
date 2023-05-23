import { StateStorage } from '@/core/common/helpers/StateStorage.helper';
import { Work } from '@/core/work/domain/Work.entity';

export interface WorkState {
	workSelected: Work | null;
}

export type WorkAction =
	| { type: 'work/selected'; payload: Work }
	| { type: 'work/unselected'; payload: null };

export type WorkActionType = 'work/selected' | 'work/unselected';
export type WorkActionPayload = Work | null;

export const WorkReducer = (state: WorkState, action: WorkAction): WorkState => {
	StateStorage.save<WorkActionType, WorkActionPayload>(action);

	if (action.type === 'work/selected') {
		return { ...state, workSelected: action.payload };
	}

	if (action.type === 'work/unselected') {
		return { ...state, workSelected: null };
	}

	return state;
};

export const WorkInitialState: WorkState = {
	workSelected: null,
};

export const WorkStateInitializer = (state: WorkState) => {
	const workState = StateStorage.value<WorkActionType, WorkActionPayload>();
	const workSelected = workState.get('work/selected') || null;

	return {
		...state,
		workSelected,
	};
};
