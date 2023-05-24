import { useCallback, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { HiPlus } from '@react-icons/all-files/hi/HiPlus';

import { TaskContext } from '@/core/task/presentation/context/Task.context';
import { TaskCardList } from '@/core/task/presentation/components/TaskCardList.component';
import { WorkContext } from '@/core/work/presentation/context/Work.context';

export const TaskTab = () => {
	const { workSelected } = useContext(WorkContext);
	const { findTasks, unselectTask } = useContext(TaskContext);
	const navigate = useNavigate();

	const handleAddTask = useCallback(() => {
		unselectTask();
		navigate('/task/form');
	}, []);

	useEffect(() => {
		findTasks({ status: 'all', workId: workSelected?.id || '' });
	}, [workSelected]);

	if (!workSelected) return null;

	return (
		<section className="flex flex-col gap-2">
			<Button.Group className="w-full">
				<Button
					className="flex-grow"
					color="gray"
					onClick={() => findTasks({ status: 'all', workId: workSelected.id })}
				>
					All Tasks
				</Button>

				<Button
					className="flex-grow"
					color="gray"
					onClick={() => findTasks({ status: 'pending', workId: workSelected.id })}
				>
					Pending
				</Button>

				<Button
					className="flex-grow"
					color="gray"
					onClick={() => findTasks({ status: 'done', workId: workSelected.id })}
				>
					Done
				</Button>
			</Button.Group>

			<Button color="dark" size="sm" title="Add Task" onClick={handleAddTask}>
				<HiPlus />
				Add Task
			</Button>

			<TaskCardList />
		</section>
	);
};
