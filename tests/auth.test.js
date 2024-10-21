const request = require('supertest');
const app = require('../app'); // point d'entrée de l'application
const mongoose = require('mongoose');

describe('Auth API', () => {
  // Test pour l'inscription
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/users/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
  });

  // Test pour la connexion
  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});

// Après tous les tests, on ferme la connexion à la base de données
afterAll(() => {
  mongoose.connection.close();
});
