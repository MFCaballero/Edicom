const {Amenity} = require('../../db.js');

module.exports = async (req, res, next) => {
	let {id} = req.params;
	try {
		await Amenity.destroy({
			where: {
				id,
			},
		});

		return res
			.json({succes: `Amenity eliminada satisfactoriamente`})
			.status(200);
	} catch (err) {
		next(err);
		res.status(500).json(new Error('Error al borrar amenity'));
	}
};
