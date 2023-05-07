import { ListGroup } from 'flowbite-react';
import { useContext } from 'react';
import { AppContext } from '../../App.context';

export const TaskList = () => {
	const { taskFilter } = useContext(AppContext);

	return (
		<ListGroup title={taskFilter}>
			<ListGroup.Item active={true}>Task #1</ListGroup.Item>
			<ListGroup.Item>Task #2</ListGroup.Item>
			<ListGroup.Item>Task #3</ListGroup.Item>
			<ListGroup.Item>Task #4</ListGroup.Item>
		</ListGroup>
	);
};
