import { Currency } from './core/currency/currency.entity';
import { WorkProfile } from './core/work-profile/work-profile.entity';

export interface AppState {
	currency: Currency;
	workProfile: WorkProfile | null;
}

type AppAction =
	| { type: 'SELECT_CURRENCY'; payload: Currency }
	| { type: 'SAVE_WORK_PROFILE'; payload: WorkProfile }
	| { type: 'SELECT_WORK_PROFILE'; payload: WorkProfile | null };

export const AppReducer = (state: AppState, action: AppAction): AppState => {
	switch (action.type) {
		case 'SELECT_CURRENCY':
			return { ...state, currency: action.payload };
		case 'SAVE_WORK_PROFILE':
			return { ...state, workProfile: action.payload };
		case 'SELECT_WORK_PROFILE':
			return { ...state, workProfile: action.payload };
		default:
			return state;
	}
};
