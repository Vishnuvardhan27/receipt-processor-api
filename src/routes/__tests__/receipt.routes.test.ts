import request from 'supertest';
import { createApp } from '../../app';

describe('Receipt Routes', () => {
  const app = createApp();

  it('should successfully process a valid receipt and return an ID', async () => {
    const response = await request(app)
      .post('/receipts/process')
      .send({
        retailer: 'Corner Market123',
        purchaseDate: '2022-01-01',
        purchaseTime: '13:01',
        total: '6.49',
        items: [
          { shortDescription: 'Mountain Dew 12PK', price: '6.49' }
        ]
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should return 400 if the receipt data is invalid', async () => {
    const response = await request(app)
      .post('/receipts/process')
      .send({
        retailer: 'Corner Market',
        purchaseDate: '2022-01-01',
        purchaseTime: '13:01',
        total: '',
        items: []
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Invalid receipt format');
  });

  it('should retrieve points for a known receipt', async () => {
    const createResponse = await request(app)
      .post('/receipts/process')
      .send({
        retailer: 'Test Retailer',
        purchaseDate: '2022-01-02',
        purchaseTime: '10:00',
        total: '3.00',
        items: [{ shortDescription: 'Chips', price: '3.00' }]
      });
    expect(createResponse.status).toBe(200);
    const { id } = createResponse.body;
    expect(id).toBeTruthy();

    const pointsResponse = await request(app).get(`/receipts/${id}/points`);
    expect(pointsResponse.status).toBe(200);
    expect(pointsResponse.body).toHaveProperty('points');
  });

  it('should return 404 for a non-existent receipt ID', async () => {
    const response = await request(app).get('/receipts/fake-id/points');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'No receipt found for that ID.'
    });
  });
});
