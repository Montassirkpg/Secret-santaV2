const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
let token;

beforeAll(async () => {
  // Connexion pour récupérer un token avant de créer un groupe
  const res = await request(app)
    .post('/users/login')
    .send({
      email: 'testuser@example.com',
      password: 'password123'
    });
  token = res.body.token;
});

describe('Group API', () => {
  let groupId;

  // Test pour la création d'un groupe
  it('should create a new group', async () => {
    const res = await request(app)
      .post('/groups')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Christmas Group'
      });
    groupId = res.body._id;
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('name', 'Christmas Group');
  });

  // Test pour l'ajout d'un membre au groupe
  it('should add a member to the group', async () => {
    const res = await request(app)
      .post(`/groups/${groupId}/members`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'member@example.com'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Invitation sent');
  });
});

afterAll(() => {
  mongoose.connection.close();
});
