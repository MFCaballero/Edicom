import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllApartments} from '../../../redux/apartments/apartmentsActions';
import {getBuildingDetail} from '../../../redux/building/buildingActions';
import {DataGrid} from '@material-ui/data-grid';
import {Button, Container} from '@material-ui/core';
import {Link} from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../../themeStyle';

import './ApartmentList.css';


const ApartmentList = ({buildingId}) => {
	const allApartments = useSelector(state => state.apartmentReducer);
	const {detailBuilding} = useSelector(state => state.buildingReducer)
	const dispatch = useDispatch();
	
	useEffect(() => {
		dispatch(getAllApartments(buildingId));
		dispatch(getBuildingDetail(buildingId))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, buildingId]);
	
	const apartments = allApartments?.allApartments?.map(apartment => {
			return {
			id: apartment.id,
			buildingName: detailBuilding[0].name,
			cata_apartment: apartment.cata_apartment,
			number_apartment: apartment.number_apartment,
			mt2: apartment.mt2,
			state: apartment.state ? "Activo" : "Desocupado",
			edit: "editar",
    	};
	});

	const columns = [
		{field: 'id', headerName: '#', flex: 1.5, hide: true},
		{field: 'buildingName', headerName: 'Edificio', flex: 3},
		{field: 'cata_apartment', headerName: 'Un Catastral', flex:2},
		{field: 'number_apartment', headerName: 'N° Departamento', flex: 2},
		{field: 'mt2', headerName: 'Mts2', flex: 2},
		{field: 'state', headerName: 'Estado', flex: 2},
		{
			field: 'Editar',
			headerName: 'EDITAR',
			flex: 1.5,
			sortable: false,
			width: 100,
			disableClickEventBubbling: true,
			renderCell: params => {
				return (
					<ThemeProvider theme={theme}>
					<Link to={`/apartment/${params.id}`} >
						<Button style={{fontWeight: 1000}} variant="contained" color="secondary" >Editar</Button>
					</Link>
					</ThemeProvider>
				);
			},
		},
	];

	return (
		<ThemeProvider theme={theme}>
		<div className='extContAL'>
			<div className="componentHeader">
				<h1>
					Departamentos
				</h1>
				<Link to={`/apartmentadd/${buildingId}`} className="link">
					<Button variant="contained" color="secondary" style={{minWidth:'30px',maxWidth:'30px',minHeight:'30px',maxHeight:'30px'}}>
						<AddIcon style={{ fontSize: 25, color: "#212121" }}/>
					</Button>
				</Link>
			</div>
			<Container style={{height: 400, width: '100%'}}>
				<Container style={{display: 'flex', height: '100%'}}>
					<DataGrid style={{border: " 4px solid black", width:'100%'}}rows={apartments} columns={columns} pageSize={5}/>
				</Container>
			</Container>
		</div>
		</ThemeProvider>
	);
};

export default ApartmentList;
