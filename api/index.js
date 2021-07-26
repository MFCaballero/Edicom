const {DataTypes} = require('sequelize');

const {server} = require('./src/app.js'); //app
const {conn} = require('./src/db.js'); // conn es la instancia de la bbdd
const {
	Spendings,
	Apartment,
	Expenses,
	Buildings,
	Alerts,
	User,
	Amenity,
	Complaints,
	Admin,
	Booking,
	Services,
} = require('./src/db.js');

const buildingsData = require('../buildingsDataMock.json'); // import json with fake buildings
const apartmentData = require('../apartmentDataMock.json');
const amenityData = require('../amenityDataMock.json');
const alertsData = require('../alertsDataMock.json');
const complaintsData = require('../complaintsDataMock.json');
const servicesData = require('../servicesDataMock.json');
const bcrypt = require('bcryptjs');

// Syncing all the models at once.
conn.sync({force: true}).then(() => {
	server.listen(3001, () => {
		console.log('DB edicom is listening at 3001'); // eslint-disable-line no-console
	});

	// --------- Si es necesario precarga automática de datos de prueba si es necesario hacer acá ----------
	// -----------------------de hacer esto, traer el modelo necsario-----------------------

	let spending1 = Spendings.create({
		date: 'April 13, 2021 1:00 PM',
		concept: 'Desinfección',
		details: 'Desinfección de patios y vereda',
		supplier: 'Desfincecciones ATR',
		amount: 15000.0,
	});

	let spending2 = Spendings.create({
		date: 'April 14, 2021 2:00 PM',
		concept: 'Pintura',
		details: 'Pintado de paredes exteriores',
		supplier: 'Pintaman',
		amount: 25000.0,
	});

	let spending3 = Spendings.create({
		date: 'April 15, 2021 3:00 PM',
		concept: 'Mantenimiento bombas',
		details: 'Reparación de bomba de agua del patio principal',
		supplier: 'MacGyver',
		amount: 8000.0,
	});

	// --- Creamos unos departamentos de prueba
	let apartmentDataStr = JSON.stringify(apartmentData);
	let apartmentDataArray = JSON.parse(apartmentDataStr);
	let apartmentDataCreation = apartmentDataArray.map(apartment => {
		return Apartment.create({
			cata_apartment: apartment.cata_apartment,
			number_apartment: apartment.number_apartment,
			mt2: apartment.mt2,
			state: apartment.state,
			buildingId: apartment.buildingId,
		});
	});

	let apartment1 = Apartment.create({
		cata_apartment: 'AK12347',
		number_apartment: 'PB1',
		mt2: 300,
		state: 1,
	});

	let apartment2 = Apartment.create({
		cata_apartment: 'CDMIL31',
		number_apartment: 'PB2',
		mt2: 150,
		state: 1,
	});

	let apartment3 = Apartment.create({
		cata_apartment: 'BK5T533T80Y',
		number_apartment: 'PB3',
		mt2: 1000,
		state: 1,
	});

	// --- Creamos unos usuarios
	const hashedPassword = bcrypt.hash('123', 12);

	var user1 = hashedPassword.then(res => {
		return User.create({
			name: 'Mariano',
			email: 'marianoguillon@hotmail.com',
			password: res,
			contact: '78788678',
			isDeleted: false,
		});
	});
	var user2 = hashedPassword.then(res => {
		return User.create({
			name: 'Mauri',
			email: 'mauriciocuello91@gmail.com',
			password: res,
			contact: '78788678',
			isDeleted: false,
		});
	});
	var user3 = hashedPassword.then(res => {
		return User.create({
			name: 'Agustin',
			email: 'agustin@gmail.com',
			password: res,
			contact: '78788678',
			isDeleted: false,
		});
	});

	// --- Creamos un admin ---

	const hashedPassword2 = bcrypt.hash('321', 12);

	var admin1 = hashedPassword2.then(res => {
		return Admin.create({
			name: 'the admin',
			email: 'admin@gmail.com',
			password: res,
			contact: '33445566',
		});
	});

	// --- Creamos unas expensas de prueba

	let expense1 = Expenses.create({
		month: 'jan',
		year: 2021,
		amount: 5000,
	});

	let expense2 = Expenses.create({
		month: 'jan',
		year: 2021,
		amount: 5200,
	});

	let expense3 = Expenses.create({
		month: 'mar',
		year: 2021,
		amount: 3700,
	});

	// let services1 = Services.create({

	// })

	let booking1 = Booking.create({
		idAmenity: 5,
		start: '2021-06-24T10:30:00.000Z',
		finish: '2021-06-24T11:30:00.000Z',
		status: 'free',
		duration: '08:00',
	});

	let booking2 = Booking.create({
		idAmenity: 6,
		start: '2021-06-24T10:30:00.000Z',
		finish: '2021-06-24T11:30:00.000Z',
		duration: '08:00',
		status: 'free',
	});

	let booking3 = Booking.create({
		idAmenity: 7,
		start: '2021-06-24T10:30:00.000Z',
		finish: '2021-06-24T11:30:00.000Z',
		status: 'free',
		duration: '08:00',
	});

	// Mock Buildings Data
	let buildingsDataStr = JSON.stringify(buildingsData);
	let buildingsDataArray = JSON.parse(buildingsDataStr);
	let buildingsDataCreation = buildingsDataArray.map(building => {
		return Buildings.create({
			cata: building.cata,
			floor: building.floor,
			cant_apartments: building.cant_apartments,
			name: building.name,
			address: building.address,
			latitude: building.latitude,
			longitude: building.longitude,
			image: building.image,
		});
	});

	let alertsDataStr = JSON.stringify(alertsData);
	let alertsDataArray = JSON.parse(alertsDataStr);
	let alertDataCreation = async (array, Buildings, Alerts) => {
		for (var i = 0; i < array.length; i++) {
			var Building = await Buildings.findByPk(array[i].building);
			var Alert = await Alerts.create({
				date: array[i].date,
				concept: array[i].concept,
				details: array[i].details || null,
				importance: array[i].importance,
			});
			await Building.addAlert(Alert);
		}
	};
	// --- Creamos unos Amenities de prueba
	let amenityDataStr = JSON.stringify(amenityData);
	let amenityDataArray = JSON.parse(amenityDataStr);
	let amenityDataCreation = amenityDataArray.map(amenity => {
		return Amenity.create({
			amenity_type: amenity.amenity_type,
			quantity: amenity.quantity,
			capacity: amenity.capacity,
			amenity_detail: amenity.amenity_detail,
		});
	});
	let amenitie1 = Amenity.create({
		amenity_type: 'Pileta',
		quantity: '1',
		capacity: '3',
		amenity_detail: 'Aca, en la pile, contesteeeen',
	});

	let amenitie2 = Amenity.create({
		amenity_type: 'Gimnacio',
		quantity: '1',
		capacity: '3',
		amenity_detail: 'Aca, en la pile, contesteeeen',
	});

	let amenitie3 = Amenity.create({
		amenity_type: 'Parrilla',
		quantity: '1',
		capacity: '3',
		amenity_detail: 'Tripa gordaaa',
	});

	// reclamos de prueba
	let complaintsDataStr = JSON.stringify(complaintsData);
	let complaintsDataArray = JSON.parse(complaintsDataStr);
	let complaintsDataCreation = async (array, Buildings, Complaints, User) => {
		for (var i = 0; i < array.length; i++) {
			var building = await Buildings.findByPk(array[i].building);
			var user = await User.findByPk(array[i].user);
			var complaint = await Complaints.create({
				date: array[i].date,
				subject: array[i].subject,
				details: array[i].details || null,
				importance: array[i].importance,
				image: array[i].image,
			});
			await building.addComplaint(complaint);
			await user.addComplaint(complaint);
		}
	};

	let servicesDataStr = JSON.stringify(servicesData);
	let servicesDataArray = JSON.parse(servicesDataStr);
	let servicesDataCreation = async (array, Buildings, Services) => {
		for (var i = 0; i < array.length; i++) {
			var Building = await Buildings.findByPk(array[i].buildingId);
			var Service = await Services.create({
				title: array[i].title,
				provider: array[i].provider,
				enrollment: array[i].enrollment || null,
				contact: array[i].contact,
				detail: array[i].detail || null,
			});
			await Building.addService(Service);
		}
	};

	// ---              0         1           2         3           4           5           6       7           8       9      10    11
	Promise.all(
		[
			spending1, //0
			spending2, //1
			spending3, //2
			apartment1, //3
			apartment2, //4
			apartment3, //5
			expense1, //6
			expense2, //7
			expense3, //8
			user1, //9
			user2, //10
			user3, //11
			amenitie1, //12
			amenitie2, //13
			amenitie3, //14
			booking1, //15
			booking2, //16
			booking3, //17
		]
			.concat(buildingsDataCreation) ////18.....29
			.concat([admin1]) //30
			.concat(apartmentDataCreation) //31 .... 55
			.concat(amenityDataCreation) //56 .. 70
	).then(
		res => {
			res[15].setAmenity(res[12]);
			res[16].setAmenity(res[13]);
			res[17].setAmenity(res[14]);
			res[18].addSpendings([res[0], res[1], res[2]]);
			res[18].addApartments([res[3], res[4], res[5]]);
			res[3].addExpenses(res[6]);
			res[4].addExpense(res[7]);
			res[3].addExpense(res[8]);
			res[3].setBuilding(res[18]);
			res[4].setBuilding(res[18]);
			res[5].setBuilding(res[18]);
			res[9].setApartment(res[3]);
			res[10].setApartment(res[4]);
			res[11].setApartment(res[5]);
			res[12].setBuilding(res[18]);
			res[13].setBuilding(res[18]);
			res[14].setBuilding(res[18]);
			res[30].addBuilding(res[18]);
			res[18].setApartments([
				res[31],
				res[32],
				res[33],
				res[34],
				res[35],
				res[36],
				res[37],
				res[38],
				res[39],
				res[40],
				res[41],
				res[42],
				res[43],
				res[44],
				res[45],
			]);
			res[19].setApartments([
				res[46],
				res[47],
				res[48],
				res[49],
				res[50],
				res[51],
				res[52],
				res[53],
				res[54],
				res[55],
			]);
			res[18].setAmenities([res[56], res[57], res[58], res[59], res[60]]);
			res[19].setAmenities([res[61], res[62], res[63], res[64], res[65]]);
			res[20].setAmenities([res[66], res[67], res[68], res[69], res[70]]);
			console.log('datos de prueba cargados');
			alertDataCreation(alertsDataArray, Buildings, Alerts);
			complaintsDataCreation(complaintsDataArray, Buildings, Complaints, User);
			servicesDataCreation(servicesDataArray, Buildings, Services);
			console.log('todo listo');
		},
		err => {
			console.log('no se cargaron los gastos de prueba');
			console.log(err);
		}
	);
});
