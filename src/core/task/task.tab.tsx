import { Button } from 'flowbite-react';
import { useContext } from 'react';
import { AppContext } from '../../App.context';
import { TaskList } from './task.list';

export const TaskTab = () => {
	const { setTaskFilter } = useContext(AppContext);

	return (
		<div className="flex flex-col gap-2">
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
		</div>
	);
};
