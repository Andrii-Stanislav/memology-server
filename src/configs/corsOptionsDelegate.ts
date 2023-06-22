export const corsOptions = {
  origin:
    process.env.NODE_ENV === 'development' ? '*' : [process.env.CLIENT_URL],
  credentials: true,
};
