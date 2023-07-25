const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

chai.use(chaiHttp);
const expect = chai.expect;

describe("Authentification", () => {
  let token;

  it("Devrait enregistrer un nouvel utilisateur", (done) => {
    chai
      .request(app)
      .post("/register")
      .send({
        username: "testuser",
        email: "testuser@example.com",
        password: "testpassword",
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("token");
        token = res.body.token;
        done();
      });
  });

  it("Devrait connecter un utilisateur", (done) => {
    chai
      .request(app)
      .post("/login")
      .send({
        email: "testuser@example.com",
        password: "testpassword",
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("token");
        token = res.body.token;
        done();
      });
  });

  it("Devrait valider les mouvements (route protégée)", (done) => {
    chai
      .request(app)
      .post("/movements")
      .set("Authorization", `Bearer ${token}`)
      .send({
        // Ajoutez vos données de test ici pour la validation
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        // Vérifiez le résultat de la validation ici
        done();
      });
  });
});
