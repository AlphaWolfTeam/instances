export const config = {
  server: {
    port: process.env.PORT || 80,
  },
  serviceName: "instance",
  db: {
    uri: process.env.DB_URI || 'mongodb://localhost:27017/instances',
    user: process.env.DB_USER || 'RandUser',
    pass: process.env.DB_PASS || 'RandPass'
  },
};
