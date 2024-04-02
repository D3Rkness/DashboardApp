// Express is used to create the server
import express from 'express';
// body-parser is used to parse the incoming request bodies in a middleware before you handle it
import bodyParse from 'body-parser';
// mongoose is used to connect to MongoDB
import mongoose from 'mongoose';
// cors is used to enable CORS with various options
import cors from 'cors';
// dotenv is used to load environment variables from a .env file into process.env
import dotenv from 'dotenv';
// helmet is used to secure Express apps by setting various HTTP headers
import helmet from 'helmet';
// morgan is used to log HTTP requests
import morgan from 'morgan';
import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoutes from './routes/sales.js';

// configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParse.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan("common"));
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));
app.use(cors());


// routes
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

// Mongoose setup
const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
});
