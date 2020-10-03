const config = {
  host: process.env.db__host,
  type: 'mysql',
  port: process.env.db__port || 3306,
  username: process.env.db__username || 'root',
  password: process.env.db__password || 'example',
  database: process.env.db__database || 'mysql',
  synchronize: false,
  logging: false,
  entities: ['src/model/entity/*.ts'],
  migrations: ['src/model/migration/*.ts'],
  subscribers: ['src/model/subscriber/*.ts'],
  migrationsTableName: 'migrations',
  cli: {
    entitiesDir: 'src/model/entity',
    migrationsDir: 'src/model/migration',
    subscribersDir: 'src/model/subscriber',
  },
};
//
// if (process.env.db__ssl__sslmode || process.env.db__ssl__sslrootcert) {
//   config.ssl = {
//     sslmode: process.env.db__ssl__sslmode || 'verify-ca',
//     sslrootcert: process.env.db__ssl__sslrootcert || '/etc/aws/ssl/rds-ca-2019-root.pem',
//   };
// }

module.exports = config;
