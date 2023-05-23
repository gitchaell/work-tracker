import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Label, Select, TextInput } from 'flowbite-react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { WorkExperienceYearsFactor, WorkMarketDemandFactor } from '@/core/work/domain/Work.constant';
import { WorkContext } from '@/core/work/presentation/context/Work.context';
import { CurrencyContext } from '@/core/currency/presentation/context/Currency.context';
import { Work } from '@/core/work/domain/Work.entity';

const WorkValidationSchema = Yup.object().shape({
	title: Yup.string().required('is required'),
	minSalary: Yup.number().min(0, 'must be greater than 0').required('is required'),
	experience: Yup.string().oneOf(Object.keys(WorkExperienceYearsFactor)).required('is required'),
	marketDemand: Yup.string().oneOf(Object.keys(WorkMarketDemandFactor)).required('is required'),
	indirectCostsMonthly: Yup.number().min(0, 'must be greater than 0').required('is required'),
	profitMargin: Yup.number()
		.min(0, 'must be greater than 0%')
		.max(100, 'must be less than 100%')
		.required('is required'),
	workHoursPerDay: Yup.number()
		.min(1, 'must be greater than 1 hour')
		.max(24, 'must be less than 24 hours')
		.required('is required'),
	workDaysPerWeek: Yup.number()
		.min(1, 'must be greater than 1 day')
		.max(7, 'must be less than 7 days')
		.required('is required'),
	currencyId: Yup.string().required('is required'),
});

export const WorkForm = () => {
	const { currencySelected, currencies } = useContext(CurrencyContext);
	const { workSelected, createWork, updateWork, deleteWork } = useContext(WorkContext);
	const navigate = useNavigate();

	const formik = useFormik<Work>({
		initialValues: {
			id: workSelected ? workSelected.id : '',
			title: workSelected ? workSelected.title : 'InStrategy Corp.',
			minSalary: workSelected ? workSelected.minSalary : 2250,
			experience: workSelected ? workSelected.experience : '4-5',
			marketDemand: workSelected ? workSelected.marketDemand : 'Normal',
			indirectCostsMonthly: workSelected ? workSelected.indirectCostsMonthly : 1300,
			profitMargin: workSelected ? workSelected.profitMargin : 0,
			workHoursPerDay: workSelected ? workSelected.workHoursPerDay : 8,
			workDaysPerWeek: workSelected ? workSelected.workDaysPerWeek : 5,
			rate: {
				perSecond: 0,
				perMinute: 0,
				perHour: 0,
				perDay: 0,
				perWeek: 0,
				perMonth: 0,
				perYear: 0,
			},
			currencyId: currencySelected ? currencySelected.id : '',
			date: workSelected ? workSelected.date : '',
		},
		validationSchema: WorkValidationSchema,
		onSubmit: (workData) => {
			if (workSelected) {
				updateWork({ ...workSelected, ...workData, id: workSelected.id });
			} else {
				createWork(workData);
			}
			navigate('/home');
		},
	});

	const handleDeleteWork = useCallback(() => {
		if (workSelected) {
			deleteWork({ id: workSelected.id });
			navigate('/home');
		}
	}, []);

	const handleCancelForm = useCallback(() => {
		navigate('/home');
	}, []);

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
					{currencies.map((currencyItem) => (
						<option
							key={currencyItem.id}
							value={currencyItem.id}
							label={currencyItem.code + ' - ' + currencyItem.name}
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

						{Object.entries(WorkExperienceYearsFactor).map(([key]) => (
							<option key={key} value={key} label={key}></option>
						))}
					</Select>
				</div>

				<div className="flex flex-grow flex-col gap-2">
					<Label
						htmlFor="marketDemand"
						value={'Market Demand ' + (formik.errors.marketDemand || '')}
						color={formik.errors.marketDemand && formik.touched.marketDemand ? 'failure' : 'default'}
					/>
					<Select
						id="marketDemand"
						required={true}
						color={formik.errors.marketDemand && formik.touched.marketDemand ? 'failure' : 'default'}
						theme={{
							field: { select: { base: 'bg-gray-800 text-white w-full' } },
						}}
						sizing="sm"
						placeholder="Normal"
						value={formik.values.marketDemand}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					>
						<option value=""></option>

						{Object.entries(WorkMarketDemandFactor).map(([key]) => (
							<option key={key} value={key} label={key}></option>
						))}
					</Select>
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<Label
					htmlFor="indirectCostsMonthly"
					value={'Indirect Costs (Monthly) ' + (formik.errors.indirectCostsMonthly || '')}
					color={
						formik.errors.indirectCostsMonthly && formik.touched.indirectCostsMonthly ? 'failure' : 'default'
					}
				/>
				<TextInput
					id="indirectCostsMonthly"
					type="number"
					placeholder="1300"
					required={true}
					sizing="sm"
					theme={{
						field: { input: { base: 'bg-gray-800 text-white w-full' } },
					}}
					color={
						formik.errors.indirectCostsMonthly && formik.touched.indirectCostsMonthly ? 'failure' : 'default'
					}
					value={formik.values.indirectCostsMonthly}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
			</div>

			<div className="flex flex-col gap-2">
				<Label
					htmlFor="profitMargin"
					value={'Profit Margin (0 - 100%) ' + (formik.errors.profitMargin || '')}
					color={formik.errors.profitMargin && formik.touched.profitMargin ? 'failure' : 'default'}
				/>
				<TextInput
					id="profitMargin"
					type="number"
					placeholder="0"
					required={true}
					sizing="sm"
					theme={{
						field: { input: { base: 'bg-gray-800 text-white w-full' } },
					}}
					color={formik.errors.profitMargin && formik.touched.profitMargin ? 'failure' : 'default'}
					value={formik.values.profitMargin}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
			</div>

			<div className="flex gap-2">
				<div className="flex flex-grow flex-col gap-2">
					<Label
						htmlFor="workHoursPerDay"
						value={'Work Hours (Daily) ' + (formik.errors.workHoursPerDay || '')}
						color={formik.errors.workHoursPerDay && formik.touched.workHoursPerDay ? 'failure' : 'default'}
					/>
					<TextInput
						id="workHoursPerDay"
						type="number"
						placeholder="8"
						required={true}
						sizing="sm"
						theme={{
							field: { input: { base: 'bg-gray-800 text-white w-full' } },
						}}
						color={formik.errors.workHoursPerDay && formik.touched.workHoursPerDay ? 'failure' : 'default'}
						value={formik.values.workHoursPerDay}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
				</div>

				<div className="flex flex-grow flex-col gap-2">
					<Label
						htmlFor="workDaysPerWeek"
						value={'Work Days (Weekly) ' + (formik.errors.workDaysPerWeek || '')}
						color={formik.errors.workDaysPerWeek && formik.touched.workDaysPerWeek ? 'failure' : 'default'}
					/>
					<TextInput
						id="workDaysPerWeek"
						type="number"
						placeholder="5"
						required={true}
						sizing="sm"
						theme={{
							field: { input: { base: 'bg-gray-800 text-white w-full' } },
						}}
						color={formik.errors.workDaysPerWeek && formik.touched.workDaysPerWeek ? 'failure' : 'default'}
						value={formik.values.workDaysPerWeek}
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
