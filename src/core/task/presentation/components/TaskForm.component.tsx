import { useContext } from 'react';
import { TextInput } from 'flowbite-react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { TaskContext } from '@/core/task/presentation/context/Task.context';
import { Task } from '@/core/task/domain/Task.entity';
import { WorkContext } from '@/core/work/presentation/context/Work.context';
import { HiPlus } from '@react-icons/all-files/hi/HiPlus';

const TaskValidationSchema = Yup.object().shape({
	id: Yup.string(),
	description: Yup.string().required('is required'),
	workId: Yup.string(),
});

export const TaskForm = () => {
	const { workSelected } = useContext(WorkContext);
	const { taskSelected, createTask } = useContext(TaskContext);

	const formik = useFormik<Task>({
		initialValues: {
			id: taskSelected ? taskSelected.id : '',
			description: taskSelected ? taskSelected.description : '',
			totalAmount: taskSelected ? taskSelected.totalAmount : 0,
			totalSeconds: taskSelected ? taskSelected.totalSeconds : 0,
			done: taskSelected ? taskSelected.done : false,
			status: taskSelected ? taskSelected.status : 'paused',
			workId: workSelected ? workSelected.id : '',
		},
		validationSchema: TaskValidationSchema,
		onSubmit: (taskData) => {
			createTask(taskData);
			formik.resetForm();
		},
	});

	return (
		<form className="flex gap-2" onSubmit={formik.handleSubmit}>
			<TextInput
				id="description"
				type="text"
				placeholder="Save the world ..."
				className="flex-grow"
				required={true}
				sizing="sm"
				rightIcon={HiPlus}
				theme={{
					field: { input: { base: 'bg-gray-800 text-white w-full' } },
				}}
				value={formik.values.description}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
			/>
		</form>
	);
};
