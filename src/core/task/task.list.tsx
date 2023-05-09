import { useContext, useState } from 'react';
import { ListGroup } from 'flowbite-react';
import { AppContext } from '@/app/App.context';
import { Task } from '.';
import { WorkProfile } from '../work-profile';

export const TaskList = () => {
	const { workProfile, taskFilter } = useContext(AppContext);
	const [task] = useState(
		new Task({
			description: 'Work of 3 May',
			workProfileId: workProfile?.id || '',
		})
	);

	return (
		<ListGroup title={taskFilter}>
			<ListGroup.Item
				active={true}
				onClick={() => {
					if (task.status === 'paused') {
						task.start(workProfile as WorkProfile);
					} else {
						task.stop();
					}
				}}
			>
				{task.description}
			</ListGroup.Item>
			<ListGroup.Item>Task #2</ListGroup.Item>
			<ListGroup.Item>Task #3</ListGroup.Item>
			<ListGroup.Item>Task #4</ListGroup.Item>
		</ListGroup>
	);
};
