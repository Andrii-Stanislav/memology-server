export const corsOptions = {
  origin: [
    process.env.CLIENT_URL,
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '',
  ],
  credentials: true,
};
