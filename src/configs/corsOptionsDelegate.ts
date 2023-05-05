export const corsOptionsDelegate = (req, callback) => {
  const allowedHosts = JSON.parse(process.env.ALLOWED_HOSTS ?? '[]');

  let corsOptions;
  if (allowedHosts.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};
