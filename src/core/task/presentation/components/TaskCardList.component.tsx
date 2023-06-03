import { useContext } from 'react';

import { TaskContext } from '@/core/task/presentation/context/Task.context';
import { TaskCard } from '@/core/task/presentation/components/TaskCard.component';

export const TaskCardList = () => {
	const { tasks } = useContext(TaskContext);

	return (
		<div className="flex flex-col gap-2">
			{tasks.map((task) => (
				<TaskCard key={task.id.get()} task={task} />
			))}
		</div>
	);
};
