// import { NowRequest, NowResponse } from '@now/node';
const Sequelize = require('sequelize');

const seq = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: `${process.env.DB_URL}:${process.env.DB_PORT}`,
    dialect: 'postgres'
  }
);

// export default (req, res:) => {
//   console.log(process.env.DB_USERNAME);
//   res.send('');
// };
