require('dotenv').config(); // trae el .env
const {Sequelize} = require('sequelize'); // trae objeto sequalize
const fs = require('fs'); //filesystem - mover carpetas dentro del sistema operativo
const path = require('path'); // ruteo interno
// const Spending = require('./models/Spendings');
const {DB_USER, DB_PASSWORD, DB_HOST, DB_NAME} = process.env; // credenciales

const sequelize = new Sequelize(
	`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
	{
		logging: false, // set to console.log to see the raw SQL queries
		native: false, // lets Sequelize know we can use pg-native for ~30% more speed
	}
);
const basename = path.basename(__filename);

const modelDefiners = []; // []

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models')) // fs lee los archivos de models.
	.filter(
		file =>
			file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
	) // []
	.forEach(file => {
		modelDefiners.push(require(path.join(__dirname, '/models', file))); // push []
	});

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize)); // invoca la funcion q exportamos de cada modelo.
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models); // me guarda los modelos [key,value]

let capsEntries = entries.map(entry => [
	entry[0][0].toUpperCase() + entry[0].slice(1),
	entry[1],
]); //mayuscula 1 letra
sequelize.models = Object.fromEntries(capsEntries); //[Key, value]

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const {
	Spendings,
	Expenses,
	Apartment,
	Buildings,
	Alerts,
	User,
	Complaints,
	Admin,
	Amenity,
	Booking,
	Subscription,
	Services,
	Ratings,
	Payment,
} = sequelize.models; //ir agregando los modelos que se crean.

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Buildings.hasMany(Apartment);
Apartment.belongsTo(Buildings, {
	foreignKey: {
		unique: 'compUnique', //No se puede poner un mismo nro de dpto para un mismo edificio
	},
});

Buildings.hasMany(Alerts);
Alerts.belongsTo(Buildings);

Buildings.hasMany(Complaints);
Complaints.belongsTo(Buildings);

User.hasMany(Complaints);
Complaints.belongsTo(User);

Buildings.hasMany(Spendings, {onDelete: 'CASCADE', hooks: true});
Spendings.belongsTo(Buildings, {onDelete: 'CASCADE'});

Apartment.hasMany(Expenses); //{ through: 'apartmentId' }
Expenses.belongsTo(Apartment, {
	foreignKey: {
		unique: 'complexUnique',
	},
});

User.hasMany(Booking);
Booking.belongsTo(User);

Amenity.hasMany(Booking);
Booking.belongsTo(Amenity);

Apartment.hasOne(User);
User.belongsTo(Apartment);

Buildings.hasMany(Amenity);
Amenity.belongsTo(Buildings);

Admin.hasMany(Buildings);
Buildings.belongsTo(Admin);

User.hasOne(Subscription);
Subscription.belongsTo(User);

Buildings.hasMany(Services);
Services.belongsTo(Buildings);

Services.hasMany(Ratings);
Ratings.belongsTo(Services);

User.hasMany(Ratings);
Ratings.belongsTo(User);

Expenses.hasOne(Payment);
Payment.belongsTo(Expenses);

// Apartment.hasMany(Payment);
// Payment.belongsTo(Apartment);

// ---------- Un gasto es de un edificio, a su vez el edificio tiene que liquidar expensas que se calculan
// ---------- con los gastos de ESE edificio, CARGAR RELACIÓN CUANDO SE TENGA EL MODELO DE BUILDINGS

module.exports = {
	...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
	conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
