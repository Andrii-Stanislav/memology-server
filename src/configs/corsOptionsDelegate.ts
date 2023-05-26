export const corsOptions = {
  origin: [...JSON.parse(process.env.ALLOWED_HOSTS ?? '[]')],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};
