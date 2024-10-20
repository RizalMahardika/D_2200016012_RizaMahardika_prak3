const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/app');

describe('API Testing', () => {
    let itemId;

    it('should create a new item', (done) => {
        const newItem = { name: 'Item 3' };
        request(app)
            .post('/api/items')
            .send(newItem)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(201);
                expect(res.body).to.have.property('id');
                itemId = res.body.id; 
                console.log('Created item ID:', itemId);
                done();
            });
    });

    it('should return a single item', (done) => {
        request(app)
            .get(`/api/items/${itemId}`)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('name', 'Item 3');
                done();
            });
    });

    it('should update an item', (done) => {
        const updatedItem = { name: 'Updated Item 3' };
        request(app)
            .put(`/api/items/${itemId}`)
            .send(updatedItem)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('name', 'Updated Item 3'); 
                done();
            });
    });

    it('should delete an item', (done) => {
        request(app)
            .delete(`/api/items/${itemId}`)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(204); 
                done();
            });
    });

    // Pengujian tambahan

    // Test 1: Menguji ketika item tidak ditemukan (GET)
    it('should return 404 when getting a non-existing item', (done) => {
        request(app)
            .get('/api/items/9999') // ID yang tidak ada
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(404);
                expect(res.body).to.have.property('message', 'Item not found');
                done();
            });
    });

    // Test 2: Menguji ketika item tidak ditemukan (DELETE)
    it('should return 404 when deleting a non-existing item', (done) => {
        request(app)
            .delete('/api/items/9999') // ID yang tidak ada
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(404);
                expect(res.body).to.have.property('message', 'Item not found');
                done();
            });
    });

    // Test 3: Menguji ketika item tidak ditemukan (PUT)
    it('should return 404 when updating a non-existing item', (done) => {
        const updatedItem = { name: 'Non-existing Item' };
        request(app)
            .put('/api/items/9999') // ID yang tidak ada
            .send(updatedItem)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(404);
                expect(res.body).to.have.property('message', 'Item not found');
                done();
            });
    });

    // Test 4: Menguji pengembalian semua item
    it('should return all items', (done) => {
        request(app)
            .get('/api/items')
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });
});
