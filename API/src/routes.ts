import { Application } from 'express';
import baseRoute from './controllers/baseRoutes'
import meetingRoutes from './controllers/meetingRoutes'
import userRoutes from './controllers/userRoutes'
import statistic from './controllers/statisticRoutes'

export = (app: Application): void => {

  app.use("/", baseRoute)
  app.use("/user", userRoutes)
  app.use("/meetings", meetingRoutes)
  app.use("/statistic", statistic)
};
