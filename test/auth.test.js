const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

chai.use(chaiHttp);
const expect = chai.expect;

describe("Authentification", () => {
  let token;

  it("Devrait enregistrer un nouvel utilisateur", (done) => {
    chai
      .request('http://localhost:5000/api/')
      .post("/register")
      .send({
        name: "testuser",
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
      .request('http://localhost:5000/api/')
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
  it('Devrait ajouter une opération bancaire avec succès (route protégée)', (done) => {
    const newOperation = {
      id: 1,
      date: '2023-07-01',
      wording: 'Paiement carte',
      amount: -50.00,
    };

    chai.request('http://localhost:5000/api/')
      .post('/operations')
      .set("Authorization", `Bearer ${token}`)
      .send(newOperation)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message').to.equal('Opérations bancaires ajoutées avec succès');
        done();
      });
  });

  it('Devrait ajouter un point de contrôle avec succès (route protégée)', (done) => {
    const newBalance = {
      date: '2023-07-31',
      balance: 1500.00,
    };

    chai.request('http://localhost:5000/api/')
      .post('/balances')
      .set("Authorization", `Bearer ${token}`)
      .send(newBalance)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message').to.equal('Point de contrôle ajouté avec succès');
        done();
      });
  });

  it('Devrait récupérer tous les points de contrôle (route protégée)', (done) => {
    chai.request('http://localhost:5000/api/')
      .get('/balances')
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf(1); // Supposons qu'il y ait un seul point de contrôle dans la base de données
        done();
      });
  });
  it("Devrait valider les mouvements (route protégée)", (done) => {
    chai
      .request('http://localhost:5000/api/')
      .post("/movements/validation")
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
