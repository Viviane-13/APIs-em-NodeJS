require('dotenv').config();

const account = {
  dialect: process.env.DIALECT,
  host: process.env.HOST,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

export default account;
