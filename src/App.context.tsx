import { createContext } from 'react';

interface AppContextState {
	version: string;
	author: string;
	year: string;
}

const initialAppContextState: AppContextState = {
	version: '1.0.0',
	author: 'Michaell Alavedra',
	year: new Date().getFullYear().toString(),
};

const AppContext = createContext<AppContextState>(initialAppContextState);

const AppProvider = ({ children }: { children: JSX.Element }) => {
	return <AppContext.Provider value={initialAppContextState}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
