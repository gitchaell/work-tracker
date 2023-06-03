import { useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Label, Spinner, TextInput } from 'flowbite-react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { GeolocationContext } from '@/core/geolocation/presentation/context/Geolocation.context';
import { GeolocationEntity } from '@/core/geolocation/domain/entities/Geolocation.entity';

const GeolocationValidationSchema = Yup.object().shape({
	id: Yup.string(),
	country: Yup.string().required(),
	state: Yup.string().required(),
	city: Yup.string().required(),
	address: Yup.string().required(),
	latitude: Yup.number().required(),
	longitude: Yup.number().required(),
});

export const GeolocationForm = () => {
	const { geolocationSaved, fetchGeolocation, saveGeolocation } = useContext(GeolocationContext);

	const [fetchingGeolocation, setFetchingGeolocation] = useState(false);

	const navigate = useNavigate();

	const formik = useFormik<GeolocationEntity>({
		initialValues: {
			id: geolocationSaved?.id.get() || '',
			country: geolocationSaved?.country.get() || '',
			state: geolocationSaved?.state.get() || '',
			city: geolocationSaved?.city.get() || '',
			address: geolocationSaved?.address.get() || '',
			latitude: geolocationSaved?.latitude.get() || 0,
			longitude: geolocationSaved?.longitude.get() || 0,
		},
		validationSchema: GeolocationValidationSchema,
		onSubmit: (geolocation) => {
			saveGeolocation(geolocation);
			navigate('/');
		},
	});

	const handleAutoFillForm = useCallback(() => {
		setFetchingGeolocation(true);

		fetchGeolocation().then((geolocation) => {
			formik.setValues({
				...formik.values,
				country: geolocation.country.get() || formik.values.country,
				state: geolocation.state.get() || formik.values.state,
				city: geolocation.city.get() || formik.values.city,
				address: geolocation.address.get() || formik.values.address,
				latitude: geolocation.latitude.get() || formik.values.latitude,
				longitude: geolocation.longitude.get() || formik.values.longitude,
			});

			setFetchingGeolocation(false);
		});
	}, []);

	const handleCancelForm = useCallback(() => {
		navigate('/');
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
					id="country"
					type="text"
					placeholder="Bolivia"
					required={true}
					sizing="sm"
					addon={fetchingGeolocation && <Spinner color="success" size="sm" />}
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
					value={'State ' + (formik.errors.state || '')}
					color={formik.errors.state && formik.touched.state ? 'failure' : 'default'}
				/>
				<TextInput
					id="state"
					type="text"
					placeholder="Santa Cruz"
					required={true}
					sizing="sm"
					addon={fetchingGeolocation && <Spinner color="success" size="sm" />}
					theme={{
						field: { input: { base: 'bg-gray-800 text-white w-full' } },
					}}
					color={formik.errors.state && formik.touched.state ? 'failure' : 'default'}
					value={formik.values.state}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
			</div>

			<div className="flex flex-col gap-2">
				<Label
					htmlFor="city"
					value={'City ' + (formik.errors.city || '')}
					color={formik.errors.city && formik.touched.city ? 'failure' : 'default'}
				/>
				<TextInput
					id="city"
					type="text"
					placeholder="Santa Cruz de la Sierra"
					required={true}
					sizing="sm"
					addon={fetchingGeolocation && <Spinner color="success" size="sm" />}
					theme={{
						field: { input: { base: 'bg-gray-800 text-white w-full' } },
					}}
					color={formik.errors.city && formik.touched.city ? 'failure' : 'default'}
					value={formik.values.city}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
			</div>

			<div className="flex flex-col gap-2">
				<Label
					htmlFor="address"
					value={'Address ' + (formik.errors.address || '')}
					color={formik.errors.address && formik.touched.address ? 'failure' : 'default'}
				/>
				<TextInput
					id="address"
					type="text"
					placeholder="Calle Rene Moreno"
					required={true}
					sizing="sm"
					addon={fetchingGeolocation && <Spinner color="success" size="sm" />}
					theme={{
						field: { input: { base: 'bg-gray-800 text-white w-full' } },
					}}
					color={formik.errors.address && formik.touched.address ? 'failure' : 'default'}
					value={formik.values.address}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
			</div>

			<div className="flex flex-col gap-2">
				<Label
					htmlFor="latitude"
					value={'Latitude ' + (formik.errors.latitude || '')}
					color={formik.errors.latitude && formik.touched.latitude ? 'failure' : 'default'}
				/>
				<TextInput
					id="latitude"
					type="text"
					placeholder="0.000000000"
					required={true}
					sizing="sm"
					addon={fetchingGeolocation && <Spinner color="success" size="sm" />}
					theme={{
						field: { input: { base: 'bg-gray-800 text-white w-full' } },
					}}
					color={formik.errors.latitude && formik.touched.latitude ? 'failure' : 'default'}
					value={formik.values.latitude}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
			</div>

			<div className="flex flex-col gap-2">
				<Label
					htmlFor="longitude"
					value={'Longitude ' + (formik.errors.longitude || '')}
					color={formik.errors.longitude && formik.touched.longitude ? 'failure' : 'default'}
				/>
				<TextInput
					id="longitude"
					type="text"
					placeholder="0.000000000"
					required={true}
					sizing="sm"
					addon={fetchingGeolocation && <Spinner color="success" size="sm" />}
					theme={{
						field: { input: { base: 'bg-gray-800 text-white w-full' } },
					}}
					color={formik.errors.longitude && formik.touched.longitude ? 'failure' : 'default'}
					value={formik.values.longitude}
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
