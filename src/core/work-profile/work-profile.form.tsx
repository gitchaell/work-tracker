import { Button, Label, Select } from 'flowbite-react';
import * as Yup from 'yup';
import {
	EXPERIENCE_YEARS_FACTOR,
	MARKET_DEMAND_FACTOR,
	WorkProfile,
} from './work-profile.entity';
import { Formik } from 'formik';
import { useContext } from 'react';
import { AppContext } from '../../App.context';

const WorkProfileSchema = Yup.object().shape({
	currencyId: Yup.string().required('This field is required'),
	title: Yup.string().required('Title is required'),
	minSalary: Yup.number()
		.min(0, 'Minimum salary must be greater than 0')
		.required('This field is required'),
	experience: Yup.string()
		.oneOf(Object.keys(EXPERIENCE_YEARS_FACTOR))
		.required('This field is required'),
	marketDemand: Yup.string()
		.oneOf(Object.keys(MARKET_DEMAND_FACTOR))
		.required('This. field is required'),
	indirectCostsMonthly: Yup.number().required('This field is required'),
	profitMargin: Yup.number()
		.min(0, 'Must be greater than 0%')
		.max(100, 'Must be less than 100%')
		.required('This is required'),
	workHoursPerDay: Yup.number()
		.min(1, 'Must be greater than 1 hour')
		.max(24, 'Must be less than 24 hours')
		.required('This field is required'),
	workDaysPerWeek: Yup.number()
		.min(1, 'Must be greater than 1 day')
		.max(7, 'Must be less than 7 days')
		.required('This field is required'),
});

export const WorkProfileForm = () => {
	const { currencies, workProfile } = useContext(AppContext);

	const handleSubmit = (values: WorkProfile) => {
		// TODO: Prevent refresh
		console.log(values);
	};

	return (
		<Formik
			initialValues={workProfile || ({} as WorkProfile)}
			validationSchema={WorkProfileSchema}
			onSubmit={handleSubmit}
		>
			{({ values, errors, touched, handleChange, handleBlur }) => (
				<form className="flex flex-col gap-4">
					<div>
						<div className="mb-2 block">
							<Label
								htmlFor="currency"
								value="Currency"
								color={
									errors.currencyId && touched.currencyId
										? 'failure'
										: 'default'
								}
							/>
						</div>
						<Select
							id="currency"
							required={true}
							color={
								errors.currencyId && touched.currencyId ? 'failure' : 'default'
							}
							sizing="sm"
							placeholder="Select a currency"
							value={values.currencyId}
							onChange={handleChange}
							onBlur={handleBlur}
						>
							{currencies.map((currency) => (
								<option key={currency.id} value={currency.id}>
									{currency.code}
								</option>
							))}
						</Select>
					</div>

					{/* <div>
						<div className="mb-2 block">
							<Label htmlFor="email1" value="Your email" />
						</div>
						<TextInput
							id="email1"
							type="email"
							placeholder="name@flowbite.com"
							required={true}
							sizing="sm"
						/>
					</div>

					<div>
						<div className="mb-2 block">
							<Label htmlFor="password1" value="Your password" />
						</div>
						<TextInput
							id="password1"
							type="password"
							required={true}
							sizing="sm"
						/>
					</div> */}

					<Button type="submit">Save Work Profile</Button>
				</form>
			)}
		</Formik>
	);
};
