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
  it('should return json', function(done) {
    chai.request(server)
    .get('/api/folders')
    .end(function(err, res) {
      res.should.be.json; // jshint ignore:line
      done()
    })
  });
  it('should be an array', function(done) {
    chai.request(server)
    .get('/api/folders')
    .end(function(err, res) {
      res.body.should.be.a('array');
      done()
    })
  })
  it.skip('should return folders', function(done) {
    chai.request(server)
    .get('/api/folders')
    .end(function(err, res) {
    res.body.should.have.property('folder_name');
    done();
    });
  });
});

describe('GET /api/urls', function() {
  it('should return a 200 status code', function(done) {
      chai.request(server)
      .get('/api/urls')
      .end(function(err, res) {
        res.should.have.status(200);
        done()
      })
  });
  it('should return json', function(done) {
    chai.request(server)
    .get('/api/urls')
    .end(function(err, res) {
      res.should.be.json; // jshint ignore:line
      done()
    })
  });
  it('should be an array', function(done) {
    chai.request(server)
    .get('/api/urls')
    .end(function(err, res) {
      res.body.should.be.a('array');
      done()
    })
  })
  it.skip('should return urls', function(done) {
    chai.request(server)
    .get('/api/urls')
    .end(function(err, res) {
    res.body.should.have.property('id');
    done();
    });
  });
});

describe('GET /api/urls/:id', function() {
  it('should return a 200 status code', function(done) {
      chai.request(server)
      .get('/api/urls/27')
      .end(function(err, res) {
        res.should.have.status(200);
        done()
      })
  });
  it('should return json', function(done) {
    chai.request(server)
    .get('/api/urls/27')
    .end(function(err, res) {
      res.should.be.json; // jshint ignore:line
      done()
    })
  });
  it('should be an array', function(done) {
    chai.request(server)
    .get('/api/urls/27')
    .end(function(err, res) {
      res.body.should.be.a('array');
      done()
    })
  })
  it.skip('should return one url', function(done) {
    chai.request(server)
    .get('/api/urls')
    .end(function(err, res) {
    res.body.should.have.property('id');
    done();
    });
  });
});

describe('GET /', function() {
  it('should return a 200 status code', function(done) {
      chai.request(server)
      .get('/')
      .end(function(err, res) {
        res.should.have.status(200);
        done()
      })
  });
  it.skip('should display the folders on the dom', function(done) {
    chai.request(server)
    .get('/')
    .end(function(err, res) {
      res.should.be.json; // jshint ignore:line
      done()
    })
  });
  it.skip('should display urls on the dom', function(done) {
    chai.request(server)
    .get('/')
    .end(function(err, res) {
      res.body.should.be.a('array');
      done()
    })
  })
  it.skip('should display the time visited', function(done) {
    chai.request(server)
    .get('/')
    .end(function(err, res) {
    res.body.should.have.property('id');
    done();
    });
  });
  it.skip('should display the time created', function(done) {
    chai.request(server)
    .get('/')
    .end(function(err, res) {
    res.body.should.have.property('id');
    done();
    });
  });
});
