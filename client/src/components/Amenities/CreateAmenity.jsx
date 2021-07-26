import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createAmenity} from '../../redux/amenities/amenitiesActions';
import {getAllAmenities, allAmenities} from '../../redux/amenities/amenitiesActions';

import {getBuildings} from '../../redux/building/buildingActions';
import swal from 'sweetalert';
import CreateAmenityForm from './CreateAmenityForm';
import { useHistory } from 'react-router-dom';

const CreateAmenity = () => {
	const {allBuildings} = useSelector(state => state.buildingReducer);
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		dispatch(getBuildings());
	}, [dispatch]);

	const [input, setInput] = useState({
		amenity_type: '',
		quantity: '1',
		capacity: '',
		amenity_detail: '',
		building: '',
	});

	const [error, setError] = useState({
		//Control the error red border of the inputs
		amenity_type: false,
		quantity: false,
		capacity: false,
		amenity_detail: false,
	});
	const [helperText, setHelperText] = useState({
		//Control the warning message
		amenity_type: 'Ingrese un tipo de amenity',
		quantity: 'Ingrese la cantidad',
		capacity: 'Cuantas personas pueden usarlo',
		amenity_detail: 'Detalles del amenitie',
	});

	const handleSubmit = e => {
		if (
			(input.amenity_type !== '' &&
			input.quantity !== '' &&
			input.capacity !== '' &&
			input.building !== '') &&
			(!error.amenity_type && 
				!error.quantity && 
				!error.capacity && 
				!error.amenity_detail)
		) {
			dispatch(createAmenity(input))
			.then(() => history.push('/amenities/'))
			swal('Amenity creado exitosamente', 'Gracias!', 'success');
			setInput({
				amenity_type: '',
				quantity: '',
				capacity: '',
				amenity_detail: '',
				building: '',
			})
			//this should redirect? where?
			// dispatch(allAmenities())
			
		} else {
			swal('Debe llenar todos los campos', 'Por favor reviselos!', 'warning');
		}
	};

	return (
		<>
			<CreateAmenityForm
				input={input}
				setInput={setInput}
				allBuildings={allBuildings}
				handleSubmit={handleSubmit}
				errorIn={error}
				helperTextIn={helperText}
				setError={setError}
				setHelperText={setHelperText}

			/>
		</>
	);
};

export default CreateAmenity;
