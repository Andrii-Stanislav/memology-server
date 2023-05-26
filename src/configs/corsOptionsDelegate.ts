export const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  // origin: [...JSON.parse(process.env.ALLOWED_HOSTS ?? '[]')],
  // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  // preflightContinue: false,
  // optionsSuccessStatus: 204,
};
