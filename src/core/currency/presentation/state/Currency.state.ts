import { LocalStateAdapter } from '@/core/common/adapters/LocalState.adapter';
import { Currency } from '@/core/currency/domain/Currency.entity';

export interface CurrencyState {
	currencySelected: Currency | null;
}

export type CurrencyAction =
	| { type: 'currency/selected'; payload: Currency }
	| { type: 'currency/unselected'; payload: null };

export type CurrencyActionType = 'currency/selected' | 'currency/unselected';
export type CurrencyActionPayload = Currency | null;

export const CurrencyReducer = (state: CurrencyState, action: CurrencyAction): CurrencyState => {
	if (action.type === 'currency/unselected') {
		LocalStateAdapter.save(action);
		return { ...state, currencySelected: null };
	}

	if (action.type === 'currency/selected') {
		LocalStateAdapter.save(action);
		return { ...state, currencySelected: action.payload };
	}

	return state;
};

export const CurrencyInitialState: CurrencyState = {
	currencySelected: null,
};

export const CurrencyStateInitializer = (state: CurrencyState) => {
	const currencyState = LocalStateAdapter.value<CurrencyActionType, CurrencyActionPayload>();
	return {
		...state,
		currencySelected: currencyState.get('currency/selected') || null,
	};
};
