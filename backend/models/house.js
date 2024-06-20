const db = require('../config/database');

const House = {
  create: (house, callback) => {
    const query = 'INSERT INTO houses (owner_name, street, number, postal_code, complement) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [house.owner_name, house.street, house.number, house.postal_code, house.complement], callback);
  },
  findAll: callback => {
    const query = 'SELECT * FROM houses';
    db.query(query, callback);
  },
  findById: (id, callback) => {
    const query = 'SELECT * FROM houses WHERE id = ?';
    db.query(query, [id], callback);
  },
  update: (id, house, callback) => {
    const query = 'UPDATE houses SET owner_name = ?, street = ?, number = ?, postal_code = ?, complement = ? WHERE id = ?';
    db.query(query, [house.owner_name, house.street, house.number, house.postal_code, house.complement, id], callback);
  },
  delete: (id, callback) => {
    const query = 'DELETE FROM houses WHERE id = ?';
    db.query(query, [id], callback);
  }
};

module.exports = House;
