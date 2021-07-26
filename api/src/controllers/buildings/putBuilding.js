const { Buildings } = require("../../db.js");
const path = require('path');

module.exports = async (req, res, next) => {
    
    let file = req.files && req.files.image;

    if(file === null) file = undefined
    
    var building = JSON.parse(req.body.body);
    if(file){
        file.mv(path.resolve(`../client/public/uploads/${file.name}`))
    }else{
        const toUpdate = await Buildings.findAll(
            { where: { id: building.id } });
        var currentFile = toUpdate[0].image;
    }

    await Buildings.update(
        { 
            cata: building.cata,
            floor: building.floor,
            cant_apartments: building.cant_apartments,
            name: building.name,
            address: building.address,
            latitude: building.latitude || null,
            longitude: building.longitude || null,
            image: (file && `../../../uploads/${file.name}`) || currentFile
        },
        { where: { id: building.id } }
    )
        .then(() =>
            res.json({ succes: `Building updated successfully` }).status(200)
        )
        .catch(err =>{
            console.log(err)
            res.status(404).json(new Error("Error updating the building"))
        })
};