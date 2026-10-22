module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const authHeader = req.headers.authorization || '';
  if (authHeader.startsWith('Bearer ')) {
    return res.status(200).json({
      authenticated: true,
      user: {
        id: 'u-admin-01',
        email: 'direction@primehouse-dz.com',
        full_name: 'Karim Benali',
        matricule: 'ADM-DZ-01',
        role: 'super_admin',
        title: 'Directeur Exécutif',
        avatar_url: '../assets/logo-p-transparent.png'
      }
    });
  }

  return res.status(401).json({ authenticated: false, user: null });
};
