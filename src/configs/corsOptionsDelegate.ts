export const corsOptions = {
  origin: [...JSON.parse(process.env.ALLOWED_HOSTS ?? '[]')],
  // origin: ['https://memology-game.netlify.app/'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
