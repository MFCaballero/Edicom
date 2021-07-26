import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CreateUserForm from './CreateUserForm'
import {createUser} from '../../../redux/users/userActions'
import {getBuildings} from '../../../redux/building/buildingActions'
import { useHistory } from 'react-router-dom'

import swal from "sweetalert";

const CreateUser = () => {
	
    const {allBuildings} = useSelector(state => state.buildingReducer);

	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
        dispatch(getBuildings())
	}, [dispatch])
	
	const [error, setError] = useState({//Control the error red border of the inputs
		name: false,
		email: false,
		password: false,
		contact: false,
        isDeleted:false
    })

	
	const [input, setInput] = useState({
		name: '',
		email:'',
		password: '',
		contact: '',
        apartment:'',
        building:''
	});

	const handleSubmit = e => {

		if (Object.values(input).every(field => field !== '') && Object.values(error).every(value => value === false)) {
			setError({
				name: false,
				email: false,
				password: false,
				contact: false,
				isDeleted: false,
				apartment: false,
				building: false,
			})
			let body = {
				name: input.name,
				email: input.email,
				password: input.password,
				contact: input.contact,
				isDeleted: input.isDeleted,
				apartment: input.apartment,
				building: input.building

			}

			const actionCreateUser = dispatch(createUser(body));

			actionCreateUser.then((res) =>
			{ 
				if(res instanceof Error) {
					swal('El mail ya está registrado en nuestra BBDD', 'Use otro email', 'warning')					
				}
				else{
					swal('Usuario creado exitosamente', "Gracias!", "success")
					history.goBack()
				}
			},
			(err) => {
				console.log(err)
				swal('El mail ya existe', 'Use otro email', 'warning')
			})
			//this should redirect? where? to /userDetail
			
		} else {
			if (input.name === "") setError({ ...error, name: true });
			if (input.email === "") setError({ ...error, email: true });
			if (input.password === "") setError({ ...error, password: true });
			if (input.contact === "") setError({ ...error, contact: true });
			if (input.apartment === "") setError({ ...error, apartment: true });
			if (input.building === "") setError({ ...error, building: true });
            swal("Debe completar todos los campos", "Por favor revise los datos!", "warning");
		 }
	};

	return (
		<>
			<CreateUserForm error={error} setError={setError} input={input} setInput={setInput} allBuildings={allBuildings} handleSubmit={handleSubmit} />
		</>
	);
};

export default CreateUser;
