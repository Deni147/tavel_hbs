module.exports = (hbs, path) => {
  // - hbs partials
  hbs.registerPartials(path.resolve(__dirname, '../views/partials'));
  // - hbs helpers
  hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
  hbs.registerHelper('screamIt', (text) => text.toUpperCase());
  hbs.registerHelper('sliceIt', (text) => {
    return text.split('.')[0];
    //return text.slice(0, -4);
  });
};
