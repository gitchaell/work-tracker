import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Label, Select, TextInput } from 'flowbite-react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { CurrencyContext } from '@/core/currency/presentation/context/Currency.context';
import { WorkContext } from '@/core/work/presentation/context/Work.context';
import { WorkExperiences } from '@/core/work/domain/constants/WorkExperiences.constant';
import { WorkDemands } from '@/core/work/domain/constants/WorkDemands.constant';
import { WorkEntity } from '@/core/work/domain/entities/Work.entity';

const WorkValidationSchema = Yup.object().shape({
	title: Yup.string().required('is required'),
	minSalary: Yup.number().min(0, 'must be greater than 0').required('is required'),
	experience: Yup.string().oneOf(Object.keys(WorkExperiences)).required('is required'),
	demand: Yup.string().oneOf(Object.keys(WorkDemands)).required('is required'),
	costs: Yup.object().shape({
		perMonth: Yup.number().min(0, 'must be greater than 0').required('is required'),
	}),
	profitMargin: Yup.object().shape({
		perMonth: Yup.number()
			.min(0, 'must be greater than 0%')
			.max(100, 'must be less than 100%')
			.required('is required'),
	}),
	workHours: Yup.object().shape({
		perDay: Yup.number()
			.min(1, 'must be greater than 1 hour')
			.max(24, 'must be less than 24 hours')
			.required('is required'),
	}),
	workDays: Yup.object().shape({
		perWeek: Yup.number()
			.min(1, 'must be greater than 1 day')
			.max(7, 'must be less than 7 days')
			.required('is required'),
	}),
});

export const WorkForm = () => {
	const { currencySelected, currencies } = useContext(CurrencyContext);
	const { workSelected, createWork, updateWork, deleteWork, selectWork, unselectWork } =
		useContext(WorkContext);
	const navigate = useNavigate();

	const formik = useFormik<WorkEntity>({
		initialValues: {
			id: workSelected?.id.get() || '',
			title: workSelected?.title.get() || '',
			minSalary: workSelected?.minSalary.get() || 0,
			experience: workSelected?.experience.get() || '0-1',
			demand: workSelected?.demand.get() || 'Normal',
			costs: {
				perMonth: workSelected?.costs.perMonth.get() || 0,
			},
			profitMargin: {
				perMonth: workSelected?.profitMargin.perMonth.get() || 0,
			},
			workHours: {
				perDay: workSelected?.workHours.perDay.get() || 0,
			},
			workDays: {
				perWeek: workSelected?.workDays.perWeek.get() || 0,
			},
			rate: {
				perSecond: workSelected?.rate.perSecond.get() || 0,
				perMinute: workSelected?.rate.perMinute.get() || 0,
				perHour: workSelected?.rate.perHour.get() || 0,
				perDay: workSelected?.rate.perDay.get() || 0,
				perWeek: workSelected?.rate.perWeek.get() || 0,
				perMonth: workSelected?.rate.perMonth.get() || 0,
				perYear: workSelected?.rate.perYear.get() || 0,
			},
			currencyId: currencySelected?.id.get() || '',
			createdAt: workSelected?.createdAt.get() || new Date().toISOString(),
		},
		validationSchema: WorkValidationSchema,
		onSubmit: (work) => {
			let workSaved = null;

			if (work.id) {
				workSaved = updateWork(work);
			} else {
				workSaved = createWork(work);
			}

			selectWork(workSaved);
			navigate('/');
		},
	});

	const handleDeleteWork = useCallback(() => {
		if (workSelected) {
			deleteWork(workSelected);
			unselectWork();
			navigate('/');
		}
	}, [workSelected]);

	const handleCancelForm = useCallback(() => {
		navigate('/');
	}, []);

	if (!currencySelected) {
		return null;
	}

	return (
		<form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
			<div className="text-center text-xl font-medium text-white">Work Form</div>

			<div className="flex flex-col gap-2">
				<Label
					htmlFor="currency"
					value={'Currency ' + (formik.errors.currencyId || '')}
					color={formik.errors.currencyId && formik.touched.currencyId ? 'failure' : 'default'}
				/>
				<Select
					id="currency"
					required={true}
					color={formik.errors.currencyId && formik.touched.currencyId ? 'failure' : 'default'}
					theme={{
						field: { select: { base: 'bg-gray-800 text-white w-full' } },
					}}
					sizing="sm"
					placeholder="BOB - Boliviano"
					value={formik.values.currencyId}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				>
					<option value=""></option>
					{currencies.map((currency) => (
						<option
							key={currency.id.get()}
							value={currency.id.get()}
							label={currency.code.get() + ' - ' + currency.name.get()}
						></option>
					))}
				</Select>
			</div>

			<div className="flex flex-col gap-2">
				<Label
					htmlFor="title"
					value={'Title ' + (formik.errors.title || '')}
					color={formik.errors.title && formik.touched.title ? 'failure' : 'default'}
				/>
				<TextInput
					id="title"
					type="text"
					placeholder="InStrategy Inc."
					required={true}
					sizing="sm"
					theme={{
						field: { input: { base: 'bg-gray-800 text-white w-full' } },
					}}
					color={formik.errors.title && formik.touched.title ? 'failure' : 'default'}
					value={formik.values.title}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
			</div>

			<div className="flex flex-col gap-2">
				<Label
					htmlFor="minSalary"
					value={'Minimum Salary ' + (formik.errors.minSalary || '')}
					color={formik.errors.minSalary && formik.touched.minSalary ? 'failure' : 'default'}
				/>
				<TextInput
					id="minSalary"
					type="number"
					placeholder="2250"
					required={true}
					sizing="sm"
					theme={{
						field: { input: { base: 'bg-gray-800 text-white w-full' } },
					}}
					color={formik.errors.minSalary && formik.touched.minSalary ? 'failure' : 'default'}
					value={formik.values.minSalary}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
			</div>

			<div className="flex gap-2">
				<div className="flex flex-grow flex-col gap-2">
					<Label
						htmlFor="experience"
						value={'Experience (years) ' + (formik.errors.experience || '')}
						color={formik.errors.experience && formik.touched.experience ? 'failure' : 'default'}
					/>
					<Select
						id="experience"
						required={true}
						color={formik.errors.experience && formik.touched.experience ? 'failure' : 'default'}
						theme={{
							field: { select: { base: 'bg-gray-800 text-white w-full' } },
						}}
						sizing="sm"
						placeholder="4-5"
						value={formik.values.experience}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					>
						<option value=""></option>

						{Object.entries(WorkExperiences).map(([key]) => (
							<option key={key} value={key} label={key}></option>
						))}
					</Select>
				</div>

				<div className="flex flex-grow flex-col gap-2">
					<Label
						htmlFor="demand"
						value={'Market Demand ' + (formik.errors.demand || '')}
						color={formik.errors.demand && formik.touched.demand ? 'failure' : 'default'}
					/>
					<Select
						id="demand"
						required={true}
						color={formik.errors.demand && formik.touched.demand ? 'failure' : 'default'}
						theme={{
							field: { select: { base: 'bg-gray-800 text-white w-full' } },
						}}
						sizing="sm"
						placeholder="Normal"
						value={formik.values.demand}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					>
						<option value=""></option>

						{Object.entries(WorkDemands).map(([key]) => (
							<option key={key} value={key} label={key}></option>
						))}
					</Select>
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<Label
					htmlFor="costs.perMonth"
					value={'Indirect Costs (Monthly) ' + (formik.errors.costs?.perMonth || '')}
					color={formik.errors.costs?.perMonth && formik.touched.costs?.perMonth ? 'failure' : 'default'}
				/>
				<TextInput
					id="costs.perMonth"
					type="number"
					placeholder="1300"
					required={true}
					sizing="sm"
					theme={{
						field: { input: { base: 'bg-gray-800 text-white w-full' } },
					}}
					color={formik.errors.costs?.perMonth && formik.touched.costs?.perMonth ? 'failure' : 'default'}
					value={formik.values.costs.perMonth}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
			</div>

			<div className="flex flex-col gap-2">
				<Label
					htmlFor="profitMargin.perMonth"
					value={'Profit Margin (0 - 100%) ' + (formik.errors.profitMargin?.perMonth || '')}
					color={
						formik.errors.profitMargin?.perMonth && formik.touched.profitMargin?.perMonth
							? 'failure'
							: 'default'
					}
				/>
				<TextInput
					id="profitMargin.perMonth"
					type="number"
					placeholder="0"
					required={true}
					sizing="sm"
					theme={{
						field: { input: { base: 'bg-gray-800 text-white w-full' } },
					}}
					color={
						formik.errors.profitMargin?.perMonth && formik.touched.profitMargin?.perMonth
							? 'failure'
							: 'default'
					}
					value={formik.values.profitMargin.perMonth}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
			</div>

			<div className="flex gap-2">
				<div className="flex flex-grow flex-col gap-2">
					<Label
						htmlFor="workHours.perDay"
						value={'Work Hours (Daily) ' + (formik.errors.workHours?.perDay || '')}
						color={
							formik.errors.workHours?.perDay && formik.touched.workHours?.perDay ? 'failure' : 'default'
						}
					/>
					<TextInput
						id="workHours.perDay"
						type="number"
						placeholder="8"
						required={true}
						sizing="sm"
						theme={{
							field: { input: { base: 'bg-gray-800 text-white w-full' } },
						}}
						color={
							formik.errors.workHours?.perDay && formik.touched.workHours?.perDay ? 'failure' : 'default'
						}
						value={formik.values.workHours.perDay}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
				</div>

				<div className="flex flex-grow flex-col gap-2">
					<Label
						htmlFor="workDays.perWeek"
						value={'Work Days (Weekly) ' + (formik.errors.workDays?.perWeek || '')}
						color={
							formik.errors.workDays?.perWeek && formik.touched.workDays?.perWeek ? 'failure' : 'default'
						}
					/>
					<TextInput
						id="workDays.perWeek"
						type="number"
						placeholder="5"
						required={true}
						sizing="sm"
						theme={{
							field: { input: { base: 'bg-gray-800 text-white w-full' } },
						}}
						color={
							formik.errors.workDays?.perWeek && formik.touched.workDays?.perWeek ? 'failure' : 'default'
						}
						value={formik.values.workDays.perWeek}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
				</div>
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
