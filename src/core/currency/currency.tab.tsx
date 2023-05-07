import { ChevronDownIcon } from '../../assets/icons/ChevronDownIcon';
import { Currency } from './currency.entity';
import { CurrencyIcon } from './currency.icon';

export const CurrencyTab = ({ currency }: { currency: Currency }) => {
	return (
		<>
			<button
				id="dropdownAvatarNameButton"
				data-dropdown-toggle="dropdownAvatarName"
				className="flex items-center rounded-full text-sm font-medium text-gray-900 hover:text-blue-600 focus:ring-4 focus:ring-gray-100 dark:text-white dark:hover:text-blue-500 dark:focus:ring-gray-700 md:mr-0"
				type="button"
			>
				<CurrencyIcon code={currency?.code || 'USD'} />
				{currency.code || 'USD'}
				<ChevronDownIcon />
			</button>

			<div
				id="dropdownUsers"
				className="z-10 hidden w-60 rounded-lg bg-white shadow dark:bg-gray-700"
			>
				<ul
					className="h-48 overflow-y-auto py-2 text-gray-700 dark:text-gray-200"
					aria-labelledby="dropdownUsersButton"
				>
					<li>
						<a
							href="#"
							className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							<img
								className="mr-2 h-6 w-6 rounded-full"
								src="/docs/images/people/profile-picture-1.jpg"
								alt="Jese image"
							/>
							Jese Leos
						</a>
					</li>
				</ul>
			</div>
		</>
	);
};
