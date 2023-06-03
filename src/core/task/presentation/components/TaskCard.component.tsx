import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImCheckboxChecked } from '@react-icons/all-files/im/ImCheckboxChecked';
import { ImCheckboxUnchecked } from '@react-icons/all-files/im/ImCheckboxUnchecked';
import { FaPlayCircle } from '@react-icons/all-files/fa/FaPlayCircle';
import { FaStopCircle } from '@react-icons/all-files/fa/FaStopCircle';

import { Task } from '@/core/task/domain/Task.model';
import { TaskContext } from '@/core/task/presentation/context/Task.context';
import { TaskMapper } from '@/core/task/infrastructure/Task.mapper';

export const TaskCard = ({ task }: { task: Task }) => {
	const { updateTask, startTask, stopTask, selectTask } = useContext(TaskContext);
	const navigate = useNavigate();

	const handleToggleDone = useCallback(() => {
		task.done.set(!task.done.get());
		updateTask(TaskMapper.toEntity(task));
	}, [task]);

	const handleSelectTask = useCallback(() => {
		selectTask(task);
		navigate('/task/form');
	}, [task]);

	const handleToggleTimer = useCallback(() => {
		if (task.status.get() === 'paused') {
			startTask(task);
		} else {
			stopTask(task);
		}
	}, [task]);

	return (
		<div
			className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 p-2"
			key={task.id.get()}
		>
			{!task.done.get() && (
				<ImCheckboxUnchecked className="cursor-pointer text-gray-300" onClick={handleToggleDone} />
			)}
			{task.done.get() && (
				<ImCheckboxChecked className="cursor-pointer text-blue-500" onClick={handleToggleDone} />
			)}

			<div className="flex flex-grow cursor-pointer flex-col" onClick={handleSelectTask}>
				<div className="text-sm text-white">{task.description.get()}</div>
				<div className="text-xs text-gray-400">
					{`${task.seconds.format()} / ${task.amount.format(task.work.currency)}`}
				</div>
			</div>

			{task.status.get() === 'paused' && (
				<FaPlayCircle className="cursor-pointer text-white" onClick={handleToggleTimer} />
			)}
			{task.status.get() === 'running' && (
				<FaStopCircle className="cursor-pointer text-white" onClick={handleToggleTimer} />
			)}
		</div>
	);
};
