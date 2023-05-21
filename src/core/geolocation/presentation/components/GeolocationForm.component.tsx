import { useCallback, useContext, useEffect } from 'react';
import { Button, Label, TextInput } from 'flowbite-react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { GeolocationContext } from '@/core/geolocation/presentation/context/Geolocation.context';
import { Geolocation } from '@/core/geolocation/domain/Geolocation.entity';
import { useNavigate } from 'react-router-dom';

const GeolocationValidationSchema = Yup.object().shape({
	id: Yup.string(),
	countryCode: Yup.string().required(),
	country: Yup.string().required(),
	state: Yup.string().required(),
	city: Yup.string().required(),
	address: Yup.string().required(),
	latitude: Yup.number().required(),
	longitude: Yup.number().required(),
});

export const GeolocationForm = () => {
	const { findGeolocation, fetchGeolocation, saveGeolocation } = useContext(GeolocationContext);
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: findGeolocation() || {
			id: '',
			countryCode: '',
			country: '',
			state: '',
			city: '',
			address: '',
			latitude: 0,
			longitude: 0,
		},
		validationSchema: GeolocationValidationSchema,
		onSubmit: (geolocationData) => {
			saveGeolocation(geolocationData);
			navigate('/');
		},
	});

	const handleAutoFillForm = useCallback(() => {
		fetchGeolocation().then((response) => {
			const geolocation = formik.values as Geolocation;

			const geolocationData = {
				...geolocation,
				...response,
				id: geolocation.id,
			};

			formik.setValues(geolocationData);
		});
	}, []);

	const handleCancelForm = useCallback(() => {
		navigate('/');
	}, []);

	useEffect(() => {
		if (!formik.values.id) {
			handleAutoFillForm();
		}
	}, []);

	return (
		<form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
			<div className="text-center text-xl font-medium text-white">Geolocation Form</div>

			<div className="flex flex-col gap-2">
				<Label
					htmlFor="country"
					value={'Country ' + (formik.errors.country || '')}
					color={formik.errors.country && formik.touched.country ? 'failure' : 'default'}
				/>
				<TextInput
					id="title"
					type="text"
					placeholder="Bolivia"
					required={true}
					sizing="sm"
					theme={{
						field: { input: { base: 'bg-gray-800 text-white w-full' } },
					}}
					color={formik.errors.country && formik.touched.country ? 'failure' : 'default'}
					value={formik.values.country}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
			</div>

			<div className="flex flex-col gap-2">
				<Label
					htmlFor="state"
					value={'State ' + (formik.errors.country || '')}
					color={formik.errors.country && formik.touched.country ? 'failure' : 'default'}
				/>
				<TextInput
					id="title"
					type="text"
					placeholder="Santa Cruz"
					required={true}
					sizing="sm"
					theme={{
						field: { input: { base: 'bg-gray-800 text-white w-full' } },
					}}
					color={formik.errors.state && formik.touched.state ? 'failure' : 'default'}
					value={formik.values.state}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
			</div>

			<Button className="flex-grow" type="submit">
				Confirm & Save
			</Button>

			<Button className="flex-grow" type="button" color="success" onClick={handleAutoFillForm}>
				Autofill
			</Button>

			<Button
				className="flex-grow"
				type="button"
				color="gray"
				onClick={handleCancelForm}
				style={{ display: formik.values.id ? 'visible' : 'none' }}
			>
				Cancel
			</Button>
		</form>
	);
};
