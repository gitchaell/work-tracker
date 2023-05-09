import { useContext } from 'react';
import { Button, Label, Select, TextInput } from 'flowbite-react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { ExperienceYearsFactor, MarketDemandFactor, WorkProfile } from '.';
import { AppContext } from '@/app/App.context';

const WorkProfileSchema = Yup.object().shape({
	currencyId: Yup.string().required('is required'),
	title: Yup.string().required('is required'),
	minSalary: Yup.number()
		.min(0, 'must be greater than 0')
		.required('is required'),
	experience: Yup.string()
		.oneOf(Object.keys(ExperienceYearsFactor))
		.required('is required'),
	marketDemand: Yup.string()
		.oneOf(Object.keys(MarketDemandFactor))
		.required('is required'),
	indirectCostsMonthly: Yup.number()
		.min(0, 'must be greater than 0')
		.required('is required'),
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
});

export const WorkProfileForm = () => {
	const {
		currency,
		currencies,
		workProfile,
		saveWorkProfile,
		deleteWorkProfile,
		showWorkProfileForm,
	} = useContext(AppContext);

	const formik = useFormik({
		initialValues: {
			title: 'InStrategy Corp.',
			minSalary: 2250,
			experience: '4-5',
			marketDemand: 'Normal',
			indirectCostsMonthly: 1300,
			profitMargin: 0,
			workHoursPerDay: 8,
			workDaysPerWeek: 5,
			currencyId: currency?.id,
		} as WorkProfile,
		validationSchema: WorkProfileSchema,
		onSubmit: (newWorkProfile) => {
			if (workProfile) {
				saveWorkProfile({ ...workProfile, ...newWorkProfile } as WorkProfile);
			} else {
				saveWorkProfile(new WorkProfile(newWorkProfile));
			}
		},
	});

	return (
		<form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
			<div className="text-center text-xl font-medium text-white">
				Work Profile Form
			</div>

			<div className="flex flex-col gap-2">
				<Label
					htmlFor="currency"
					value={'Currency ' + (formik.errors.currencyId || '')}
					color={
						formik.errors.currencyId && formik.touched.currencyId
							? 'failure'
							: 'default'
					}
				/>
				<Select
					id="currency"
					required={true}
					color={
						formik.errors.currencyId && formik.touched.currencyId
							? 'failure'
							: 'default'
					}
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
					color={
						formik.errors.title && formik.touched.title ? 'failure' : 'default'
					}
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
					color={
						formik.errors.title && formik.touched.title ? 'failure' : 'default'
					}
					value={formik.values.title}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
			</div>

			<div className="flex flex-col gap-2">
				<Label
					htmlFor="minSalary"
					value={'Minimum Salary ' + (formik.errors.minSalary || '')}
					color={
						formik.errors.minSalary && formik.touched.minSalary
							? 'failure'
							: 'default'
					}
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
					color={
						formik.errors.minSalary && formik.touched.minSalary
							? 'failure'
							: 'default'
					}
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
						color={
							formik.errors.experience && formik.touched.experience
								? 'failure'
								: 'default'
						}
					/>
					<Select
						id="experience"
						required={true}
						color={
							formik.errors.experience && formik.touched.experience
								? 'failure'
								: 'default'
						}
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

						{Object.entries(ExperienceYearsFactor).map(([key]) => (
							<option key={key} value={key} label={key}></option>
						))}
					</Select>
				</div>

				<div className="flex flex-grow flex-col gap-2">
					<Label
						htmlFor="marketDemand"
						value={'Market Demand ' + (formik.errors.marketDemand || '')}
						color={
							formik.errors.marketDemand && formik.touched.marketDemand
								? 'failure'
								: 'default'
						}
					/>
					<Select
						id="marketDemand"
						required={true}
						color={
							formik.errors.marketDemand && formik.touched.marketDemand
								? 'failure'
								: 'default'
						}
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

						{Object.entries(MarketDemandFactor).map(([key]) => (
							<option key={key} value={key} label={key}></option>
						))}
					</Select>
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<Label
					htmlFor="indirectCostsMonthly"
					value={
						'Indirect Costs (Monthly) ' +
						(formik.errors.indirectCostsMonthly || '')
					}
					color={
						formik.errors.indirectCostsMonthly &&
						formik.touched.indirectCostsMonthly
							? 'failure'
							: 'default'
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
						formik.errors.indirectCostsMonthly &&
						formik.touched.indirectCostsMonthly
							? 'failure'
							: 'default'
					}
					value={formik.values.indirectCostsMonthly}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
			</div>

			<div className="flex flex-col gap-2">
				<Label
					htmlFor="profitMargin"
					value={
						'Profit Margin (0 - 100%) ' + (formik.errors.profitMargin || '')
					}
					color={
						formik.errors.profitMargin && formik.touched.profitMargin
							? 'failure'
							: 'default'
					}
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
					color={
						formik.errors.profitMargin && formik.touched.profitMargin
							? 'failure'
							: 'default'
					}
					value={formik.values.profitMargin}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
			</div>

			<div className="flex gap-2">
				<div className="flex flex-grow flex-col gap-2">
					<Label
						htmlFor="workHoursPerDay"
						value={
							'Work Hours (Daily) ' + (formik.errors.workHoursPerDay || '')
						}
						color={
							formik.errors.workHoursPerDay && formik.touched.workHoursPerDay
								? 'failure'
								: 'default'
						}
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
						color={
							formik.errors.workHoursPerDay && formik.touched.workHoursPerDay
								? 'failure'
								: 'default'
						}
						value={formik.values.workHoursPerDay}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
				</div>

				<div className="flex flex-grow flex-col gap-2">
					<Label
						htmlFor="workDaysPerWeek"
						value={
							'Work Days (Weekly) ' + (formik.errors.workDaysPerWeek || '')
						}
						color={
							formik.errors.workDaysPerWeek && formik.touched.workDaysPerWeek
								? 'failure'
								: 'default'
						}
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
						color={
							formik.errors.workDaysPerWeek && formik.touched.workDaysPerWeek
								? 'failure'
								: 'default'
						}
						value={formik.values.workDaysPerWeek}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
				</div>
			</div>

			<Button className="flex-grow" type="submit">
				Save
			</Button>

			<Button
				className="flex-grow"
				type="button"
				color="gray"
				onClick={() => showWorkProfileForm(false)}
			>
				Cancel
			</Button>

			{workProfile && (
				<Button
					className="flex-grow"
					type="button"
					color="failure"
					onClick={() => deleteWorkProfile(workProfile)}
				>
					Delete
				</Button>
			)}
		</form>
	);
};
