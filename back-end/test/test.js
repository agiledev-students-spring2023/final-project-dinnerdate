const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app'); // your express app

chai.use(chaiHttp);

describe('GET /user/:id', () => {
    it('should return a user object with the correct properties', (done) => {
    chai.request(app)
        .get('/user/:id')
        .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        const properties = ['id', 'email', 'username', 'password', 'first_name', 'last_name', 'birthdate', 'gender', 'mobile'];
        properties.forEach((p) => {
            expect(res.body).to.have.property(p);
        });
        done();
        });
    });
});

describe('GET /diner-request/:id', () => {
    it('should return a diner request object with the correct properties', (done) => {
    chai.request(app)
        .get('/diner-request/:id')
        .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        const properties = ['id', 'full_name', 'rating', 'num_ratings', 'message'];
        properties.forEach((p) => {
            expect(res.body).to.have.property(p);
        });
        done();
        });
    });
});


