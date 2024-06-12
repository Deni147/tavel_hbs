const router = require('express').Router();

const path = require('node:path');
const publicPath = path.resolve(__dirname, '../public');

router.get('/', (req, res) => {
  res.render('home.hbs', {
    title: 'Місця, які варто відвідати проверка комита',

  });
});


module.exports = router;
