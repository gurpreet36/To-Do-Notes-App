import { Options, Sequelize } from "sequelize";
import { config, DotenvConfigOutput } from "dotenv";

const ifConfigured: DotenvConfigOutput = config();

const sequelizeOptions: Options = {
    dialect: "postgres",
    pool: Object.assign({
        acquire: 60000,
        idle: 10000,
        max: 20,
        min: 0,
    }, {}),
    define: {
        timestamps: false,

    },
    logging: true,
    minifyAliases: true
};
export class DbConnection {
    private static sequelize: Sequelize | undefined;

    private constructor() { }

    public static getInstance(): Sequelize {
        if (!DbConnection.sequelize) {
            if (!process.env.primaryDbConnectionString) {
                throw new Error("No Database Connection String available");
            }

            DbConnection.sequelize = new Sequelize(process.env.primaryDbConnectionString, sequelizeOptions);
        }
        return DbConnection.sequelize;
    }
}
