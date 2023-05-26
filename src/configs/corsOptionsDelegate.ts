export const corsOptions = {
  origin: [...JSON.parse(process.env.ALLOWED_HOSTS ?? '[]')],
};
