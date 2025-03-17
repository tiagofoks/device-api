import request from 'supertest';
import { App } from '../app';
import { DeviceState } from '../interfaces/device-state';

describe('DeviceController Integration Tests', () => {
  let app: any;

  beforeAll(() => {
    app = new App().app;
  });

  it('should create a device', async () => {
    const response = await request(app)
      .post('/devices')
      .send({ name: 'Laptop', brand: 'BrandA' });

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.name).toBe('Laptop');
    expect(response.body.brand).toBe('BrandA');
    expect(response.body.state).toBe(DeviceState.AVAILABLE);
  });

  it('should update a device', async () => {
    const createResponse = await request(app)
      .post('/devices')
      .send({ name: 'Laptop', brand: 'BrandA' });

    const updateResponse = await request(app)
      .put(`/devices/${createResponse.body.id}`)
      .send({ name: 'Desktop' });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body).toBeDefined();
    expect(updateResponse.body.name).toBe('Desktop');
  });

  it('should get a device by id', async () => {
    const createResponse = await request(app)
      .post('/devices')
      .send({ name: 'Laptop', brand: 'BrandA' });

    const getResponse = await request(app)
      .get(`/devices/${createResponse.body.id}`);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toBeDefined();
    expect(getResponse.body.id).toBe(createResponse.body.id);
  });

  it('should get all devices', async () => {
    await request(app).post('/devices').send({ name: 'Laptop', brand: 'BrandA' });
    await request(app).post('/devices').send({ name: 'Desktop', brand: 'BrandB' });

    const response = await request(app).get('/devices');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.length).toBe(2);
  });

  it('should get devices by brand', async () => {
    await request(app).post('/devices').send({ name: 'Laptop', brand: 'BrandA' });
    await request(app).post('/devices').send({ name: 'Desktop', brand: 'BrandB' });

    const response = await request(app).get('/devices/brand/BrandA');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.length).toBe(1);
    expect(response.body[0].brand).toBe('BrandA');
  });

  it('should get devices by state', async () => {
    const createResponse = await request(app)
      .post('/devices')
      .send({ name: 'Laptop', brand: 'BrandA' });

    await request(app)
      .put(`/devices/${createResponse.body.id}`)
      .send({ state: DeviceState.IN_USE });

    const response = await request(app).get(`/devices/state/${DeviceState.IN_USE}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.length).toBe(1);
    expect(response.body[0].state).toBe(DeviceState.IN_USE);
  });

  it('should delete a device', async () => {
    const createResponse = await request(app)
      .post('/devices')
      .send({ name: 'Laptop', brand: 'BrandA' });

    const deleteResponse = await request(app)
      .delete(`/devices/${createResponse.body.id}`);

    expect(deleteResponse.status).toBe(204);

    const getResponse = await request(app)
      .get(`/devices/${createResponse.body.id}`);

    expect(getResponse.status).toBe(404);
  });
});