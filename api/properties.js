const database = require('../data/database.json');

module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    properties: database.properties,
    total: database.properties.length,
    page: 1,
    limit: 100,
    totalPages: 1
  });
};
