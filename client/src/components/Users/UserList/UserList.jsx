import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getBuildings} from '../../../redux/building/buildingActions'
import {getAllApartments} from'../../../redux/apartments/apartmentsActions'
import {getUsersByBuilding, getUserByApartment, filterUsers, getAllUsersForList} from '../../../redux/users/userActions'
import { makeStyles, Grid, Button, FormControl, InputLabel, Select, MenuItem, Container } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles';
import {DataGrid} from '@material-ui/data-grid';
import theme from '../../themeStyle';
import {Link} from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import './UserList.css';

const UserList = () => {
	const useStyles = makeStyles((theme)=>({
		root: {
			marginTop: 100,
			marginBottom: 30,
			border:5
		},
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
			width:500,
		},
		last: {
			padding: 8,
		}
	}));



    const { allApartments } = useSelector(state => state.apartmentReducer);
    const {allBuildings} = useSelector(state => state.buildingReducer)
	const {users} = useSelector(state => state.userReducer)
	const dispatch = useDispatch();
	const classes = useStyles();
	const [buildingOpen, setBuildingOpen] = useState(false);
	const [apartmentOpen, setApartmentOpen] = useState(false);

	console.log(users)

    const [input, setInput] = useState({
        apartment:'',
        building:''
	});

	useEffect(() => {
        dispatch(getBuildings())
    }, [dispatch])
	
	useEffect(() => {
        dispatch(getAllUsersForList())
	}, [dispatch])
	
	useEffect(() => {
        dispatch(getAllUsersForList())
    }, [dispatch])

	
	


	const handleBuildingClose = () => {
		setBuildingOpen(false);
        
	};

	const handleBuildingOpen = () => {
		setBuildingOpen(true);
	}; 
	const handleApartmentClose = () => {
		setApartmentOpen(false);
        
	};

	const handleApartmentOpen = () => {
		setApartmentOpen(true);
	}; 
    
    const handleBuildingChange =  (e) => {
		if(!e.target.value) return
		dispatch(getUsersByBuilding(e.target.value))
		dispatch(getAllApartments(e.target.value))
		setInput({
			...input,
			building: e.target.value, 
		});
	}

	const handleApartmentChange = (e) => {
		if(!e.target.value) return
		dispatch(getUserByApartment(e.target.value))
		setInput({
			...input,
			apartment: e.target.value, 
		});
	}
    
    const columns = [
        {field: 'id', headerName: '#', width: 90 },
		{field: 'name', headerName: 'Nombre', width: 200},
		{field: 'email', headerName: 'Email', width: 200},
		{field: 'contact', headerName: 'Contacto', width: 150 },
		{
			field: 'isDeleted', headerName: 'Estado', width: 150, renderCell: params => {
				return (
					<ThemeProvider theme={theme}>
					{params.row.isDeleted ? 'Deshabilitado' : 'Habilitado'}
					</ThemeProvider>
		)} },
		{
			field: 'Editar',
			headerName: 'EDITAR',
			sortable: false,
			width: 120,
			disableClickEventBubbling: true,
			renderCell: params => {
				return (
					<ThemeProvider theme={theme}>
					<Link to={`/userupdate/${params.id}`} >
						<Button style={{fontWeight: 1000}} variant="contained" color="secondary">Editar</Button>
					</Link>
					</ThemeProvider>
				);
			},
		},
	];

    return(
        <>  
            <ThemeProvider theme={theme}>
                <Grid container className={classes.root} direction="row" justify="center" alignItems="center" >
                    <Grid item>
					<FormControl className={classes.formControl} >
						<InputLabel id="demo-controlled-open-select-label">Seleccionar Edificio</InputLabel>
						<Select
							labelId="demo-controlled-open-select-label"
							id="building"
							name="building"
							open={buildingOpen}
							onClose={handleBuildingClose}
							onOpen={handleBuildingOpen}
							value={input.building}
							onChange={handleBuildingChange}
						>
						<MenuItem value="">
						<em>None</em>
						</MenuItem>
						{allBuildings?.map(building => {
							return (
								<MenuItem key={building.id} value={building.id}>{` ${building.id} ${building.cata} ${building.name}`}</MenuItem>
							)
						})}
						</Select>
					</FormControl>
                    </Grid>
				</Grid>
            <Grid container direction="row" justify="center" alignItems="center">
				<Grid item>
					<FormControl className={classes.formControl}>
						<InputLabel id="demo-controlled-open-select-label">Seleccionar Departamento</InputLabel>
						<Select
							labelId="demo-controlled-open-select-label"
							id="apartment"
							name="apartment"
							open={apartmentOpen}
							onClose={handleApartmentClose}
							onOpen={handleApartmentOpen}
							value={input.apartment}
							onChange={handleApartmentChange}
						>
						<MenuItem value="">
						<em>None</em>
						</MenuItem>
						{allApartments?.map(apartment => {
							return (
								<MenuItem key={apartment.id} value={apartment.id}>{` ${apartment.id} ${apartment.cata_apartment} ${apartment.number_apartment}`}</MenuItem>
							)
						})}
						</Select>
					</FormControl>
				</Grid>
			</Grid>
			<div className='extContUserListTable'>
				<div className='componentHeaderUserListTable'>
					<h1 className='contExtAlerts'>
						Usuario:
					</h1>
					<Link to="/userCreate" >
						<Button variant="contained" color="secondary" style={{minWidth:'30px',maxWidth:'30px',minHeight:'30px',maxHeight:'30px', marginLeft: '20px', marginTop: '30px'}}>
							<AddIcon style={{ fontSize: 25, color: "#212121" }}/>
						</Button>
					</Link>
				</div>
				<Container style={{height: 400, width: '90%'}}>
					<Container style={{display: 'flex', height: '100%'}}>
						<DataGrid rows={users} columns={columns} />
					</Container>
				</Container>
			</div>
			</ThemeProvider>
        </>
    )

}
export default UserList;