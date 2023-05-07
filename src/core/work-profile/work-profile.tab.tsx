import { Button, Dropdown } from 'flowbite-react';
import { useContext } from 'react';
import { AppContext } from '../../App.context';
import { HiPlus } from '@react-icons/all-files/hi/HiPlus';

export const WorkProfileTab = () => {
	const { workProfile, workProfiles, selectWorkProfile, loading } =
		useContext(AppContext);

	const navigateToWorkProfileFormPage = () => {
		throw new Error('Method not implemented.');
	};

	return (
		<Button.Group>
			<Dropdown
				label={!loading && (workProfile?.title || 'Select a Work Profile')}
				isProcessing={loading}
				color="dark"
				size="sm"
				title="Select a Work Profile"
			>
				{workProfiles.length === 0 && (
					<Dropdown.Item
						key="work-profiles.options.default"
						className="flex items-center justify-center gap-2"
						onClick={() => navigateToWorkProfileFormPage()}
					>
						<HiPlus />
						Add Work Profile
					</Dropdown.Item>
				)}
				{workProfiles.map((workProfile) => (
					<Dropdown.Item
						key={workProfile.id}
						className="flex items-center justify-center gap-2"
						onClick={() => selectWorkProfile(workProfile)}
					>
						{workProfile.title}
					</Dropdown.Item>
				))}
			</Dropdown>
			<Button
				color="dark"
				size="sm"
				className="!h-auto"
				title="Add Work Profile"
			>
				<HiPlus />
			</Button>
		</Button.Group>
	);
};
