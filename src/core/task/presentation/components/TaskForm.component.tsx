import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Label, TextInput } from 'flowbite-react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { TaskContext } from '@/core/task/presentation/context/Task.context';
import { Task } from '@/core/task/domain/Task.entity';
import { WorkContext } from '@/core/work/presentation/context/Work.context';

const TaskValidationSchema = Yup.object().shape({
	id: Yup.string(),
	description: Yup.string().required('is required'),
	workId: Yup.string(),
});

export const TaskForm = () => {
	const { workSelected } = useContext(WorkContext);
	const { taskSelected, createTask, updateTask, deleteTask, unselectTask } = useContext(TaskContext);
	const navigate = useNavigate();

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
			if (taskData.id) {
				updateTask(taskData);
			} else {
				createTask(taskData);
			}
			navigate('/home');
			unselectTask();
		},
	});

	const handleDeleteWork = useCallback(() => {
		if (taskSelected) {
			deleteTask({ id: taskSelected.id });
			navigate('/home');
			unselectTask();
		}
	}, []);

	const handleCancelForm = useCallback(() => {
		navigate('/home');
		unselectTask();
	}, []);

	return (
		<form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
			<div className="text-center text-xl font-medium text-white">Task Form</div>

			<div className="flex flex-col gap-2">
				<Label
					htmlFor="description"
					value={'Description ' + (formik.errors.description || '')}
					color={formik.errors.description && formik.touched.description ? 'failure' : 'default'}
				/>
				<TextInput
					id="description"
					type="text"
					placeholder="Save the world ..."
					className="flex-grow"
					required={true}
					sizing="sm"
					theme={{
						field: { input: { base: 'bg-gray-800 text-white w-full' } },
					}}
					value={formik.values.description}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
			</div>

			<Button className="flex-grow" type="submit">
				Save
			</Button>

			<Button className="flex-grow" type="button" color="gray" onClick={handleCancelForm}>
				Cancel
			</Button>

			<Button
				className="flex-grow"
				type="button"
				color="failure"
				onClick={handleDeleteWork}
				style={{ display: formik.values.id ? 'visible' : 'none' }}
			>
				Delete
			</Button>
		</form>
	);
};