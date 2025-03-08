import { DataSource,  } from "typeorm";

import { Todo } from "@modules/entities";
import environment from "@lib/environment";

const pgDataSource = new DataSource({
  type: environment.dbDialect,
  host: environment.dbHost,
  port: environment.dbPort,
  username: environment.dbUser,
  password: environment.dbPassword,
  database: environment.dbName,
  synchronize: false,
  logging: environment.dbLogging,
  entities: [Todo],
  subscribers: [],
  migrations: ["src/migrations/*"],
});

export default pgDataSource;