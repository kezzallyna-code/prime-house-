const database = require('../data/database.json');

module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    status: 'online',
    app: 'Prime House Real Estate Admin Console',
    version: '1.5.0-DZ',
    node: 'Vercel Serverless Edge Node',
    counts: {
      properties: database.properties.length,
      published: database.properties.filter(p => p.publication_status === 'publie').length,
      moderation: database.properties.filter(p => p.publication_status === 'moderation').length,
      featured: database.properties.filter(p => p.is_featured).length,
      inquiries: database.inquiries.length,
      categories: database.categories.length,
      wilayas: database.wilayas.length
    },
    time: new Date().toISOString()
  });
};
