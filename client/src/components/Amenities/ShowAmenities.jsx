import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {getBuildingDetail} from '../../redux/building/buildingActions';
import {getAllAmenities, allAmenities} from '../../redux/amenities/amenitiesActions';
import {getBuildings} from '../../redux/building/buildingActions';
import {makeStyles, Grid, Button, Container} from '@material-ui/core';
import CreateBookings from './CreateBooking/CreateBookings';
import AddIcon from '@material-ui/icons/Add';
import {ThemeProvider} from '@material-ui/core/styles';
import {DataGrid} from '@material-ui/data-grid';
import theme from '../themeStyle';
import {Link} from 'react-router-dom';
import './ShowAmenities.css';

const ShowAmenities = () => {

	const {detailBuilding} = useSelector(state => state.buildingReducer);
	const {allBuildings} = useSelector(state => state.buildingReducer);
	const {Amenities} = useSelector(state => state.amenitiesReducer);

	console.log('allBuildings', allBuildings)
	console.log('Amenities', Amenities)
	
	if(allBuildings.length>0){	 
		Amenities.map(amenity =>{
			allBuildings.map(building => {
				if(building.id === amenity.buildingId){
					amenity.nameBuilding = building?.name
				}
			})
		})
	}


	const dispatch = useDispatch();

	const {id_building} = useParams();

	const useStyles = makeStyles(theme => ({
		root: {
			marginTop: 100,
			marginBottom: 30,
			border: 5,
			width: '80px'
		},
	}));

	const classes = useStyles();

	const [building, setBuilding] = useState({});
	const [showCreateBooking, setShowCreateBooking] = useState(false)
	const [idAmenity, setIdAmenity] = useState('')

	useEffect(() => {
		//dispatch(getBuildingDetail(id_building));
		dispatch(allAmenities());
		dispatch(getBuildings())
	}, [dispatch]);

	useEffect(() => {
        setBuilding(detailBuilding)
    }, [detailBuilding]);

    const  toggleFormCreateBooking = (idAmenity)=>{ //toglee BookingForm
		setIdAmenity(idAmenity)
		setShowCreateBooking(!showCreateBooking)
	 }

	const columns = [
		{field: 'nameBuilding', headerName: 'Edificio', flex: 3.0},
		{field: 'amenity_type', headerName: 'Tipo', flex: 3,
		renderCell: params => {
			return (
					<Link to={`/AmenitieDetail/${params.id}/${params.row.amenity_type}`}>
						{params.row.amenity_type}
					</Link>
			);
		},
	},
		{field: 'capacity', headerName: 'Turnos disponibles', flex: 3.0},
		{
			field: 'addBooking', headerName: 'Agregar Turnos', flex: 3, sortable: false, renderCell: params => {
				return (
					<ThemeProvider theme={theme}>
							<Button
								style={{ fontWeight: 1000 }}
								variant="contained"
								color="secondary"
								onClick={ () => toggleFormCreateBooking(params.row.id) }
							>
								AGREGAR TURNOS
							</Button>
					</ThemeProvider>
				);
			},
		},
		{
			field: 'amenity_detail',
			headerName: 'Detalles',
			sortable: false,
			flex: 2,
			disableClickEventBubbling: true,
			renderCell: params => {
				return (
					<ThemeProvider theme={theme}>
						<Link to={`/amenityUpdate/${params.id}`}>
							<Button
								style={{fontWeight: 1000}}
								variant="contained"
								color="secondary"
							>
								EDITAR
							</Button>
						</Link>
					</ThemeProvider>
				);
			},
		},
	];

	return (
		<>
			<ThemeProvider theme={theme}>
				<Grid
					container
					className={classes.root}
					direction="column"
					justify="center"
					alignItems="center"
				>
					<div className="extContAmenitiesListTable">
						<div className="componentHeaderAmenitiesListTable">
							<h1>Amenities:{/*building.name*/}</h1>
						</div>
						<Link to="/amenityCreate" >
                			<Button variant="contained" color="secondary" style={{minWidth:'30px',maxWidth:'30px',minHeight:'30px',maxHeight:'30px', marginLeft: '20px'}}>
                    			<AddIcon style={{ fontSize: 25, color: "#212121" }}/>
                			</Button>
            			</Link>
					</div>
					<Container style={{height: '400px', width:'1200px', marginLeft:'60px'}}>
						<Container style={{display: 'flex', height: '100%', width:'100%'}}>
							<DataGrid rows={Amenities} columns={columns} pageSize={5} />
						</Container>
					</Container>
				</Grid>
				<div>
				{
                     showCreateBooking
                     ?
                     // <p>Mostrar generador de expesas</p>
                     <CreateBookings 
                        visibility={showCreateBooking} 
                        changeVisibility={toggleFormCreateBooking}
                        idAmenity={idAmenity}
                     />
                     :
                     false
                  }
				</div>
			</ThemeProvider>
		</>
	);
};
export default ShowAmenities;
