const { db } = require('../database/dbconnection');

const postNewUser = (
  username,
  email,
  password,
  bio,
  yob,
  photo,
  groups,
  created,
  last_login,
  predictions,
  points,
  paid,
) => {
  const query = 'INSERT INTO users (username, email, password, bio, yob, photo, groups, created, last_login, predictions,points,paid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)';
  const values = [
    username,
    email,
    password,
    bio,
    yob,
    photo,
    groups,
    created,
    last_login,
    predictions,
    points,
    paid,
  ];
  return db.query(query, values);
};
module.exports = {
  postNewUser,
};
