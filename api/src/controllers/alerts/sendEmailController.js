const { transporter } = require("../../../mailer");
//const logo = require('./logo-Edicom.png')



module.exports = async (req, res, next) => {
    console.log(req.body);
    try {
        
        let { subscriptions, update, body } = req.body 
        if(body.importance === 'baja') {
            subscriptions = subscriptions.filter( e => e.alerts === 'all');
            console.log(subscriptions)
        }
        subscriptions = subscriptions.map(e => e = e.user.email);
        if(subscriptions.length > 0) {
            for(let i =0; i< subscriptions.length; i++) {
                await transporter.sendMail({
                    from: '"Edicom" <edicombuilds@gmail.com>', // sender address
                    to: subscriptions[i], // list of receivers
                    subject: update? "FE DE ERRATAS Notificaciones EDICOM" : "Notificaciones EDICOM", // Subject line
                    text: "Desde EDICOM le informamos lo siguiente: ", // plain text body
                    attachments: [{
                        filename: 'logo-Edicom.png',
                        path: __dirname +'/logo-Edicom.png',
                        cid: 'logo' 
                   }],
                    html: `<h1>${body.concept}</h1><p>${body.details}</p><br><img src="cid:logo" alt="EDICOM">`, // html body
                });
            }
        }
        res.status(200);
        
        

    } catch (error) {
        next(error)
        res.status(500).json({ message: { message: 'Algo salió mal', style: "red" } });
    }
}