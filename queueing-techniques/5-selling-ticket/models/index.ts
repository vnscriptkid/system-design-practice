import { Sequelize } from 'sequelize';
import initAttendee from './attendee';


const sequelize = new Sequelize('tickets', 'postgres', '123456', {
  host: 'localhost',
  dialect: 'postgres'
});


export const models = {
  Attendee: initAttendee(sequelize),
  sequelize,
  Sequelize
};
