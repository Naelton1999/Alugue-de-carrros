/*import "reflect-metadata"

const AppDataSource = new  dataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "docker",
  password: "9121",
  database: "rentx",
  synchronize: false,
  logging: false,
  entities: [],
  migrations: ["./src/database/migrations/*.ts"],
  subscribers: [],
})

export function createConnection(host = "database"): Promise<DataSource> {
  return AppDataSource.setOptions({ host }).initialize();
}

export default AppDataSource  */ 
