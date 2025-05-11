import dotenv from "dotenv";
dotenv.config();

const PORT_SERVER = process.env.PORT_SERVER || 5050;
const HOST = process.env.HOST || 'localhost';
const DB_FORCE = process.env.DB_FORCE?.toLowerCase() === 'true';
const ENVIROMENT = process.env.ENVIROMENT?.toLocaleLowerCase() || 'development';
const PORT_DOCKER = process.env.PORT_DOCKER || PORT_SERVER;

export {PORT_SERVER, HOST, DB_FORCE, ENVIROMENT, PORT_DOCKER}