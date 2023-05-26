export const corsOptionsDelegate = (req, callback) => {
  const allowedHosts = JSON.parse(process.env.ALLOWED_HOSTS ?? '[]');

  let corsOptions;
  if (allowedHosts.includes(req.header('Origin'))) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};
