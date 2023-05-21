import { StateStorage } from '@/core/common/helpers/StateStorage.helper';
import { Currency } from '@/core/currency/domain/Currency.entity';
import { CurrencyRepository } from '@/core/currency/infrastructure/Currency.repository';

export interface CurrencyState {
	currencySelected: Currency | null;
}

export type CurrencyAction =
	| { type: 'currency/selected'; payload: Currency }
	| { type: 'currency/unselected'; payload: null };

export type CurrencyActionType = 'currency/selected' | 'currency/unselected';
export type CurrencyActionPayload = Currency | null;

export const CurrencyReducer = (state: CurrencyState, action: CurrencyAction): CurrencyState => {
	StateStorage.save<CurrencyActionType, CurrencyActionPayload>(action);

	if (action.type === 'currency/unselected') {
		return { ...state, currencySelected: null };
	}

	if (action.type === 'currency/selected') {
		return { ...state, currencySelected: action.payload };
	}

	return state;
};

export const CurrencyInitialState: CurrencyState = {
	currencySelected: null,
};

export const CurrencyStateInitializer = (state: CurrencyState) => {
	const currencyState = StateStorage.value<CurrencyActionType, CurrencyActionPayload>();
	const currencySelected =
		currencyState.get('currency/selected') ||
		CurrencyRepository.findById('8ea4c831-b37b-4f1c-abe4-12361dd890f5');

	StateStorage.save<CurrencyActionType, CurrencyActionPayload>({
		type: 'currency/selected',
		payload: currencySelected,
	});

	return {
		...state,
		currencySelected,
	};
};
