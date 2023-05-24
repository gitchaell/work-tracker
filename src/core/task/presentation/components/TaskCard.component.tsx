import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImCheckboxChecked } from '@react-icons/all-files/im/ImCheckboxChecked';
import { ImCheckboxUnchecked } from '@react-icons/all-files/im/ImCheckboxUnchecked';
import { FaPlayCircle } from '@react-icons/all-files/fa/FaPlayCircle';
import { FaStopCircle } from '@react-icons/all-files/fa/FaStopCircle';

import { Task } from '@/core/task/domain/Task.entity';
import { CurrencyContext } from '@/core/currency/presentation/context/Currency.context';
import { WorkContext } from '@/core/work/presentation/context/Work.context';
import { TaskContext } from '@/core/task/presentation/context/Task.context';
import { TaskTimerFormatter } from '@/core/task/application/helpers/TaskTimerFormatter.helper';
import { CurrencyFormatter } from '@/core/currency/application/helpers/CurrencyFormatter.helper';

export const TaskCard = ({ task }: { task: Task }) => {
	const { currencySelected } = useContext(CurrencyContext);
	const { workSelected } = useContext(WorkContext);
	const { updateTask, startTask, stopTask, selectTask } = useContext(TaskContext);
	const navigate = useNavigate();

	const handleToggleDone = useCallback(() => {
		updateTask({ ...task, done: !task.done });
	}, [task]);

	const handleSelectTask = useCallback(() => {
		selectTask(task);
		navigate('/task/form');
	}, [task]);

	const handleToggleTimer = useCallback(() => {
		if (!workSelected) {
			return;
		}

		if (task.status === 'paused') {
			startTask(task, workSelected);
		} else {
			stopTask(task);
		}
	}, [task]);

	return (
		<div className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 p-2" key={task.id}>
			{!task.done && (
				<ImCheckboxUnchecked className="cursor-pointer text-gray-300" onClick={handleToggleDone} />
			)}
			{task.done && <ImCheckboxChecked className="cursor-pointer text-blue-500" onClick={handleToggleDone} />}

			<div className="flex flex-grow cursor-pointer flex-col" onClick={handleSelectTask}>
				<div className="text-sm text-white">{task.description}</div>
				<div className="text-xs text-gray-400">
					{`${TaskTimerFormatter.toTimer(task.totalSeconds)} / ${CurrencyFormatter.format(
						task.totalAmount,
						currencySelected
					)}`}
				</div>
			</div>

			{task.status === 'paused' && (
				<FaPlayCircle className="cursor-pointer text-white" onClick={handleToggleTimer} />
			)}
			{task.status === 'running' && (
				<FaStopCircle className="cursor-pointer text-white" onClick={handleToggleTimer} />
			)}
		</div>
	);
};