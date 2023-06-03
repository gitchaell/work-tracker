import { FallbackProps } from 'react-error-boundary';

export const ErrorPage = ({ error }: FallbackProps) => {
	return <div className="p-2 text-center text-white">Oops! something went wrong: {error.message}</div>;
};
