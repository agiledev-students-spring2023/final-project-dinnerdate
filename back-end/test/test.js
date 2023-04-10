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

describe('GET /restaurant/:placeId', () => {
    it('should return a restaurant object with the correct properties', (done) => {
    chai.request(app)
        .get('/restaurant/ChIJfZkgF8tZwokRHUHtRx_JLJ8')
        .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        const properties = ['name', 'address', 'description', 'num_ratings', 'phone_number', 'rating', 'url'];
        properties.forEach((p) => {
            expect(res.body).to.have.property(p);
        });
        done();
        });
    });
});
});


