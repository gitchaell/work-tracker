import { createContext, useEffect, useReducer, useState } from 'react';
import { Currency } from './core/currency/currency.entity';
import { AppReducer, AppState } from './App.reducer';
import { WorkProfile } from './core/work-profile/work-profile.entity';
import { GeolocationRepository } from './core/geolocation/geolocation.repository';
import { CurrencyRepository } from './core/currency/currency.repository';
import { WorkProfileRepository } from './core/work-profile/work-profile.repository';
import { WorkProfilesRepository } from './core/work-profile/work-profiles.repository';
import { CurrenciesRepository } from './core/currency/currencies.repository';
import { TaskFilter } from './core/task/task.entity';

interface AppContextProps {
	loading: boolean;
	setLoading: (loading: boolean) => void;
	currency: Currency;
	currencies: Currency[];
	selectCurrency: (currency: Currency) => void;
	workProfile: WorkProfile | null;
	workProfiles: WorkProfile[];
	selectWorkProfile: (workProfile: WorkProfile) => void;
	taskFilter: TaskFilter;
	setTaskFilter: (taskFilter: TaskFilter) => void;
}

const AppContext = createContext<AppContextProps>({} as AppContextProps);

const AppProvider = ({ children }: { children: JSX.Element }) => {
	const [loading, setLoading] = useState(true);
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

	const selectWorkProfile = (workProfile: WorkProfile | null) => {
		WorkProfileRepository.save(workProfile);
		dispatch({ type: 'SELECT_WORK_PROFILE', payload: workProfile });
	};

	useEffect(() => {
		setInitialState();
	}, []);

	return (
		<AppContext.Provider
			value={{
				loading,
				setLoading,
				currency: state.currency,
				currencies: CurrenciesRepository.getAll(),
				selectCurrency,
				workProfile: state.workProfile,
				workProfiles: WorkProfilesRepository.getAll(),
				selectWorkProfile,
				taskFilter,
				setTaskFilter,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export { AppContext, AppProvider };
