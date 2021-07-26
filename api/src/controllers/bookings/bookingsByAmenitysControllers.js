const { Booking, User } = require("../../db");

module.exports = async (req, res, next) => {
   console.log(req.params);
   const { idAmenity } = req.params;

   try {
      const bookings = await Booking.findAll({
         where: {
            amenityId: parseInt(idAmenity),
         },
         include: [
            {
               // Notice `include` takes an ARRAY
               model: User,
            },
         ],
      });
      return res.json(bookings);
   } catch (error) {
      next(error);
      return res.json(error);
   }
};
