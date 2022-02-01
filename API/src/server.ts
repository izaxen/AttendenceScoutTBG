import Express, { Application } from 'express';
import environment from './config/enviroment';
import routes from './routes'
import { initDb } from './db/db'
import authRoutes from './controllers/meetingRoutes'
import Cors from "cors";
import cookieParser from 'cookie-parser'

const app: Application = Express();
const PORT = environment.port

app.use(Express.json({ type: '*/*' }));
initDb()
app.use(Cors({ origin: "*" }));
app.use(cookieParser());
app.use('/auth', authRoutes);
routes(app);

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
});

