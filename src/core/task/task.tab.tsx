import { useContext } from 'react';
import { Button } from 'flowbite-react';
import { AppContext } from '@/app/App.context';
import { TaskList } from '.';

export const TaskTab = () => {
	const { setTaskFilter } = useContext(AppContext);

	return (
		<section className="flex flex-col gap-2">
			<Button.Group className="w-full">
				<Button
					className="flex-grow"
					color="gray"
					onClick={() => setTaskFilter('all')}
				>
					All Tasks
				</Button>

				<Button
					className="flex-grow"
					color="gray"
					onClick={() => setTaskFilter('pending')}
				>
					Pending
				</Button>
				<Button
					className="flex-grow"
					color="gray"
					onClick={() => setTaskFilter('done')}
				>
					Done
				</Button>
			</Button.Group>
			<TaskList />
		</section>
	);
};
