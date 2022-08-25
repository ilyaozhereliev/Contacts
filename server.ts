const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.use(jsonServer.bodyParser);
server.post('/auth', (req, res) => {
  const users = router.db
    .getState()
    .users.find((user) => user.email === req.body.email && user.password === req.body.password);
  if (users) {
    res.jsonp(users);
    res.sendStatus(200);
  } else {
    res.sendStatus(422);
  }
});

// Use default router
server.use(router);
server.listen(3001, () => {});
