// process.env.NODE_ENV = 'test';

const express = require('express');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('GET /api/folders', function() {
  it('should return a 200 status code', function(done) {
      chai.request(server)
      .get('/api/folders')
      .end(function(err, res) {
        res.should.have.status(200);
        done()
      })
  });
  it('should return all folders', function(done) {
    chai.request(server)
    .get('/api/folders')
    .end(function(err, res) {
    res.should.be.json; // jshint ignore:line
    res.body.should.be.a('array');
    res.body.should.have.property('Folder 1');
    done();
    });
  });
});
