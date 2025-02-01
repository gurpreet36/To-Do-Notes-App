import express from "express";
import { NotificationRoutes } from "./routes/note.routes";
import { AssociateModels } from "./models";
import { constant } from "./constants";
import { config, DotenvConfigOutput } from "dotenv";
import { DbConnection } from "./database";

const dbInit = async () => {
    try {
        const sequelize = DbConnection.getInstance();
        console.log("Connection has been established successfully..");
    } catch (err) {
        console.log("Unable to connect to the database:", err);
    }
}

const app: express.Express = express();
const port: number = parseInt(process.env.PORT);

dbInit();

const ifConfigured: DotenvConfigOutput = config();

AssociateModels.associate();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/notes/", new NotificationRoutes().getRouter());

//let cron = container.get<ISetupCron>(TYPES.SetupCron);
//cron.init();

app.listen(port, () => {
    console.log(constant.message_upon_server_start + " at " + port);
});
