import { Button, Dropdown } from 'flowbite-react';
import { useContext } from 'react';
import { HiPlus } from '@react-icons/all-files/hi/HiPlus';
import { HiPencil } from '@react-icons/all-files/hi/HiPencil';
import { AppContext } from '@/app/App.context';

export const WorkProfileTab = () => {
	const {
		workProfile,
		workProfiles,
		selectWorkProfile,
		loading,
		showWorkProfileForm,
	} = useContext(AppContext);

	return (
		<Button.Group>
			<Dropdown
				label={!loading && (workProfile?.title || 'Select a Work Profile')}
				isProcessing={loading}
				color="dark"
				size="sm"
				title="Select a Work Profile"
			>
				{workProfiles.map((workProfile) => (
					<Dropdown.Item
						key={workProfile.id}
						className="flex items-center justify-center gap-2"
						onClick={() => selectWorkProfile(workProfile)}
					>
						{workProfile.title}
					</Dropdown.Item>
				))}
				<Dropdown.Item
					key="work-profiles.options.default"
					className="flex items-center justify-center gap-2"
					onClick={() => showWorkProfileForm(true)}
				>
					<HiPlus />
					Add Work Profile
				</Dropdown.Item>
			</Dropdown>

			<Button
				color="dark"
				size="sm"
				className="!h-auto"
				title="Edit Work Profile"
				disabled={!workProfile}
				onClick={() => showWorkProfileForm(true)}
			>
				<HiPencil />
			</Button>

			<Button
				color="dark"
				size="sm"
				className="!h-auto"
				title="Add Work Profile"
				onClick={() => showWorkProfileForm(true)}
			>
				<HiPlus />
			</Button>
		</Button.Group>
	);
};
