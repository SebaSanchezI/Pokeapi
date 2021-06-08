var supertest = require('supertest-as-promised')(require('../src/app'));
var expect = require('chai').expect;

describe('Routes',function(){
    describe('/types', function() {
        it('GET devuelve un array con tipos', function() {
          return supertest 
            .get('/types') 
            .expect(200) 
            .expect('Content-Type', /json/)
        });       
    });
    describe('/pokemons', function() {
        it('GET devuelve un array con pokemons', function() {
        return supertest
            .get('/pokemons') 
            .expect(200) 
            .expect('Content-Type', /json/)
        });  
        
        it('GET devuelve un objeto con nombre pikachu', function() {
            return supertest 
                .get('/pokemons/?name=pikachu') 
                .expect(200) 
                .expect('Content-Type', /json/)
                .expect(function(res) {
                    expect(res.body.name).to.eql('pikachu');
                });
            });

            let poke = {"name":"henry"}
            it('POST agrega un pokemon', function() {
                return supertest
                    .post('/pokemons')
                    .send(poke)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .expect(function(res) {
                        expect(res.body.name).to.eql("henry");
                            });
            });   
    })
})