import { useCallback, useContext } from 'react';
import { Button, Dropdown } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { HiPlus } from '@react-icons/all-files/hi/HiPlus';
import { HiPencil } from '@react-icons/all-files/hi/HiPencil';

import { WorkContext } from '@/core/work/presentation/context/Work.context';

export const WorkTab = () => {
	const { workSelected, works, selectWork, unselectWork } = useContext(WorkContext);

	const navigate = useNavigate();

	const handleAddWork = useCallback(() => {
		unselectWork();
		navigate('/work/form');
	}, []);

	const handleEditWork = useCallback(() => {
		navigate('/work/form');
	}, []);

	return (
		<Button.Group>
			<Dropdown
				label={workSelected?.title.get() || 'Select a Work'}
				color="dark"
				size="sm"
				title="Select a Work Profile"
			>
				{works.map((work) => (
					<Dropdown.Item
						key={work.id.get()}
						className="flex items-center justify-center gap-2"
						onClick={() => selectWork(work)}
					>
						{work.title.get()}
					</Dropdown.Item>
				))}
				<Dropdown.Item
					key="work-profiles.options.default"
					className="flex items-center justify-center gap-2"
					onClick={handleAddWork}
				>
					<HiPlus />
					Add Work Profile
				</Dropdown.Item>
			</Dropdown>

			<Button
				color="dark"
				size="sm"
				className="!h-auto"
				title="Edit Work"
				disabled={!workSelected}
				onClick={handleEditWork}
			>
				<HiPencil />
			</Button>

			<Button color="dark" size="sm" className="!h-auto" title="Add Work" onClick={handleAddWork}>
				<HiPlus />
			</Button>
		</Button.Group>
	);
};
