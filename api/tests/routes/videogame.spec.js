/* eslint-disable import/no-extraneous-dependencies */
// const { expect } = require('chai');
// const session = require('supertest-session');
// const app = require('../../src/app.js');
// const { Videogame, conn } = require('../../src/db.js');

// const agent = session(app);
// const videogame = {
//   name: 'Super Mario Bros',
// };

// describe('Videogame routes', () => {
//   before(() => conn.authenticate()
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   }));
//   beforeEach(() => Videogame.sync({ force: true })
//     .then(() => Videogame.create(videogame)));
//   describe('GET /videogames', () => {
//     it('should get 200', () =>
//       agent.get('/videogames').expect(200)
//     );
//   });
// });
const { expect } = require("chai");
const session = require("supertest-session");
const server = require("../../src/app.js");
const { conn } = require("../../src/db.js");
const { Videogame, Genre } = conn.models;
const agent = session(server);

describe("Test Routes", () => {
  describe("GET /videogames", () => {
 
    it("responds with and object with videogames", () => {
      agent.get("/videogames").then((res) => {
        expect(res.body).to.be.an("array");
      });
    });
  });
  describe("GET /genres", () => {
   
    
    it("responds with an array", () => {
      agent.get("/genres").then((res) => {
        agent.expect(res.body).to.be.an("array");
        agent.end = res.body.length;

        for (let i = 0; i < agent.end; i++) {
          agent.expect(res.body[i]).to.have.property("id");
          agent.expect(res.body[i]).to.have.property("name");
        }
        agent.end();
      });
    });
    it("responds with an array of genres", () => {
      agent.get("/genres").then((res) => {
        expect(res.body).to.be.an("array").that.is.not.empty;
      });
    });
  });
});