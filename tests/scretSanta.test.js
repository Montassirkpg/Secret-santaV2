const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
let token;
let groupId;

beforeAll(async () => {
  // Connexion et création d'un groupe avant de tester l'assignation
  const res = await request(app)
    .post('/users/login')
    .send({
      email: 'testuser@example.com',
      password: 'password123'
    });
  token = res.body.token;

  const groupRes = await request(app)
    .post('/groups')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Secret Santa Group'
    });
  groupId = groupRes.body._id;
});

describe('Secret Santa API', () => {
  // Test pour l'assignation Secret Santa
  it('should assign Secret Santas to the group', async () => {
    const res = await request(app)
      .post(`/groups/${groupId}/secret-santa`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Secret Santas assigned');
  });

  // Test pour voir les assignations
  it('should get the Secret Santa assignments', async () => {
    const res = await request(app)
      .get(`/groups/${groupId}/secret-santa`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
