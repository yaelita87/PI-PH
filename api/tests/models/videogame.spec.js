const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('Videogame', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Videogame.create({ name: 'Super Mario Bros'})
        .then(() => done(new Error('It requieres a description')))
        .catch(() => done());
      });
      it('should throw when an error if platforms is null', (done)=>{
        Videogame.create({ name: 'Super Mario Bros', description: "good" })
        .then(() => done(new Error('requieres description')))
        .catch(() => done());
      })
    });
  });
});
