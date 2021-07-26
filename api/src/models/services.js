const {DataTypes} = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize => {
	sequelize.define(
		'services',
		{
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			provider: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			enrollment: {
				type: DataTypes.INTEGER,
			},
			contact: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			detail: {
				type: DataTypes.STRING,
			},
			accepted: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
		},
		{paranoid: true}
	);
};
