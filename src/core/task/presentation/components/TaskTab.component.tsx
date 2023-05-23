import { useContext, useEffect } from 'react';
import { Button } from 'flowbite-react';

import { TaskContext } from '@/core/task/presentation/context/Task.context';
import { TaskCardList } from '@/core/task/presentation/components/TaskCardList.component';
import { TaskForm } from '@/core/task/presentation/components/TaskForm.component';

export const TaskTab = () => {
	const { findTasks } = useContext(TaskContext);

	useEffect(() => {
		findTasks({ status: 'all' });
	}, []);

	return (
		<section className="flex flex-col gap-2">
			<Button.Group className="w-full">
				<Button className="flex-grow" color="gray" onClick={() => findTasks({ status: 'all' })}>
					All Tasks
				</Button>

				<Button className="flex-grow" color="gray" onClick={() => findTasks({ status: 'pending' })}>
					Pending
				</Button>

				<Button className="flex-grow" color="gray" onClick={() => findTasks({ status: 'done' })}>
					Done
				</Button>
			</Button.Group>

			<TaskForm />
			<TaskCardList />
		</section>
	);
};
