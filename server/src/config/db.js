import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelizeRaw = new Sequelize({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: "mysql",
    logging: console.log, // Log SQL queries for debugging
});

const initDatabase = async () => {
    try {
        await sequelizeRaw.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
        console.log("✅ Database ensured.");

        const sequelize = new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USER,
            process.env.DB_PASSWORD,
            {
                host: process.env.DB_HOST,
                dialect: "mysql",
                logging: console.log,
            }
        );

        return sequelize;
    } catch (err) {
        console.error("❌ Error creating database:", err);
        process.exit(1);
    }
};

const sequelize = await initDatabase();
export default sequelize;
