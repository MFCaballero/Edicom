// Crear este middleware con la lógica para que cuando entre pregunte si el usuario es válido
// y en caso contrario redirigirlo al logging

const redirectLoggin = (req, res, next) => {
    // if(req.session.userId) {
      res.redirect('http://localhost:3001/unauthorized');
    // } else {
    //   next();
    // }
  }

module.exports = redirectLoggin;
