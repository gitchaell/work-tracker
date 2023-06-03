import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Avatar } from 'flowbite-react';

import { AppContext } from '@/App.context';

export const Layout = () => {
	const { version, author, year } = useContext(AppContext);

	return (
		<>
			<Outlet />

			<footer className="mt-64 flex items-center justify-center gap-2 bg-gray-900 px-2 py-8 text-white">
				<Avatar img="https://avatars.githubusercontent.com/u/37460957?s=40&v=4" rounded={true}>
					<div className="space-y-1 font-medium dark:text-white">
						<div>{author}</div>
						<div className="text-sm text-gray-500 dark:text-gray-400">
							v{version} - {year}
						</div>
					</div>
				</Avatar>
			</footer>
		</>
	);
};
