import { createContext, useEffect, useReducer, useState } from 'react';
import { CurrenciesRepository, Currency, CurrencyRepository } from '@/currency';
import { TaskFilter } from '@/task';
import {
	WorkProfile,
	WorkProfileRepository,
	WorkProfilesRepository,
} from '@/work-profile';
import { AppReducer, AppState } from './App.reducer';
import { GeolocationRepository } from '@/geolocation';

interface AppContextProps {
	loading: boolean;
	setLoading: (loading: boolean) => void;
	workProfileFormIsVisible: boolean;
	showWorkProfileForm: (showWorkProfileForm: boolean) => void;
	currency: Currency;
	currencies: Currency[];
	selectCurrency: (currency: Currency) => void;
	workProfile: WorkProfile | null;
	workProfiles: WorkProfile[];
	selectWorkProfile: (workProfile: WorkProfile) => void;
	saveWorkProfile: (workProfile: WorkProfile) => void;
	deleteWorkProfile: (workProfile: WorkProfile) => void;
	taskFilter: TaskFilter;
	setTaskFilter: (taskFilter: TaskFilter) => void;
}

const AppContext = createContext<AppContextProps>({} as AppContextProps);

const AppProvider = ({ children }: { children: JSX.Element }) => {
	const [loading, setLoading] = useState(true);
	const [workProfileFormIsVisible, showWorkProfileForm] = useState(false);
	const [taskFilter, setTaskFilter] = useState('all' as TaskFilter);

	const [state, dispatch] = useReducer(AppReducer, {} as AppState);

	const setInitialState = async (): Promise<void> => {
		const geolocation = await GeolocationRepository.search();
		GeolocationRepository.save(geolocation);

		Promise.all([
			CurrenciesRepository.getBy(geolocation.country),
			CurrenciesRepository.getAll(),
			WorkProfileRepository.get(),
		]).then(([currency, currencies, workProfile]) => {
			CurrencyRepository.save(currency);
			CurrenciesRepository.bulk(currencies);

			selectCurrency(currency);
			selectWorkProfile(workProfile);

			setLoading(false);
		});
	};

	const selectCurrency = (currency: Currency) => {
		CurrencyRepository.save(currency);
		dispatch({ type: 'SELECT_CURRENCY', payload: currency });
	};

	const saveWorkProfile = (workProfile: WorkProfile) => {
		WorkProfileRepository.save(workProfile);
		WorkProfilesRepository.save(workProfile);
		dispatch({ type: 'SAVE_WORK_PROFILE', payload: workProfile });
		showWorkProfileForm(false);
	};

	const selectWorkProfile = (workProfile: WorkProfile | null) => {
		WorkProfileRepository.save(workProfile);
		dispatch({ type: 'SELECT_WORK_PROFILE', payload: workProfile });
	};

	const deleteWorkProfile = (workProfile: WorkProfile) => {
		WorkProfileRepository.clear();
		WorkProfilesRepository.delete(workProfile);
		dispatch({ type: 'SELECT_WORK_PROFILE', payload: null });
		showWorkProfileForm(false);
	};

	useEffect(() => {
		setInitialState();
	}, []);

	return (
		<AppContext.Provider
			value={{
				loading,
				setLoading,
				showWorkProfileForm,
				workProfileFormIsVisible,
				currency: state.currency,
				currencies: CurrenciesRepository.getAll(),
				selectCurrency,
				workProfile: state.workProfile,
				workProfiles: WorkProfilesRepository.getAll(),
				saveWorkProfile,
				selectWorkProfile,
				deleteWorkProfile,
				taskFilter,
				setTaskFilter,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export { AppContext, AppProvider };
