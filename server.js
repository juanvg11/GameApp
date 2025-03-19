const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Ruta dinámica para categorías de juegos
server.get('/category/:category', (req, res) => {
  const db = router.db; // Obtiene la base de datos
  const category = req.params.category.toLowerCase(); // Captura la categoría de la URL

  // Filtra los juegos que coincidan con la categoría
  const games = db.get('games').filter({ category }).value();

  if (games.length > 0) {
    res.jsonp(games);
  } else {
    res.status(404).jsonp({ error: `No hay juegos en la categoría: ${category}` });
  }
});

// Usa el router con las rutas predeterminadas
server.use(router);

server.listen(3000, () => {
  console.log('JSON Server corriendo en http://localhost:3000');
});
