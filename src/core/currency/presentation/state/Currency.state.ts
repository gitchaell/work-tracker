import { StateStorage } from '@/core/common/helpers/StateStorage.helper';
import { CurrencyEntity } from '@/core/currency/domain/entities/Currency.entity';

export interface CurrencyState {
	currencySelected: CurrencyEntity | null;
}

export type CurrencyAction =
	| { type: 'currency/selected'; payload: CurrencyEntity }
	| { type: 'currency/unselected'; payload: null };

export type CurrencyActionType = 'currency/selected' | 'currency/unselected';
export type CurrencyActionPayload = CurrencyEntity | null;

const CurrencyReducer = (state: CurrencyState, action: CurrencyAction): CurrencyState => {
	StateStorage.save<CurrencyActionType, CurrencyActionPayload>(action);

	if (action.type === 'currency/unselected') {
		return { ...state, currencySelected: null };
	}

	if (action.type === 'currency/selected') {
		return { ...state, currencySelected: action.payload };
	}

	return state;
};

const CurrencyInitialState: CurrencyState = {
	currencySelected: null,
};

const CurrencyStateInitializer = (state: CurrencyState) => {
	const currencyState = StateStorage.value<CurrencyActionType, CurrencyActionPayload>();
	const currencySelected = currencyState.get('currency/selected') || null;

	StateStorage.save<CurrencyActionType, CurrencyActionPayload>({
		type: 'currency/selected',
		payload: currencySelected,
	});

	return {
		...state,
		currencySelected,
	};
};

export const CurrencyState = {
	reducer: CurrencyReducer,
	initialState: CurrencyInitialState,
	initializer: CurrencyStateInitializer,
};
