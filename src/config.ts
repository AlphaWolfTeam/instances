export const config = {
  server: {
    port: process.env.PORT || 80,
  },
  serviceName: "instance",
  db: {
    uri: process.env.DB_URI || 'mongodb://NullTest-ip:27017/instances',
    user: process.env.DB_USER || 'RandUser',
    pass: process.env.DB_PASS || 'RandPass'
  },
  schema: {
    url: process.env.SCHEMA_URL || 'http://localhost:8080'
  },
};
