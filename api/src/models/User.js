const {DataTypes} = require('sequelize');

module.exports = sequelize => {
	sequelize.define('user', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING(60),
			allowNull: false,
			validate: {
				isEmail: {
					msg: 'Email Invalido',
				},
				notEmpty: {
					msg: 'El email no puede estar vacio',
				},
			},
			unique: {
				args: true,
				msg: 'Ese usuario ya existe',
			},
		},
		password: {
			type: DataTypes.STRING(60),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'La contraseña no puede estar vacia',
				},
			},
		},
		contact: {
			type: DataTypes.STRING,
		},
		firstLogging: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
		isDeleted: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	},{paranoid: true});
};
