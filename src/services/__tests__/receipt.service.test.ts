import { calculatePoints } from '../receipt.service'; 
import { IReceipt } from '../../interfaces/receipt.interface';

describe('calculatePoints', () => {
  it('awards 50 points if total is a round dollar amount', () => {
    const receipt: IReceipt = {
      retailer: 'ABC',
      purchaseDate: '2023-01-02',
      purchaseTime: '10:00',
      total: '12.00', 
      items: [
        { shortDescription: 'Item A', price: '6.00' },
        { shortDescription: 'Item B', price: '6.00' }
      ]
    };

    const points = calculatePoints(receipt);
    expect(points).toBe(87);
  });

  it('awards 6 points if purchase day is odd', () => {
    const receipt: IReceipt = {
      retailer: 'Test123',
      purchaseDate: '2023-01-03', 
      purchaseTime: '14:30',      
      total: '5.00',
      items: [{ shortDescription: 'Item X', price: '5.00' }]
    };

    const points = calculatePoints(receipt);
    expect(points).toBe(99); 
  });

  it('correctly handles item descriptions not multiple of 3', () => {
    const receipt: IReceipt = {
      retailer: 'XYZ',
      purchaseDate: '2023-01-10',
      purchaseTime: '09:00',
      total: '1.25',
      items: [{ shortDescription: 'Soda', price: '1.25' }]
    };

    const points = calculatePoints(receipt);
    expect(points).toBe(28);
  });

  it('computes correct points for Walgreens example', () => {
    const receipt: IReceipt = {
      retailer: 'Walgreens',
      purchaseDate: '2022-01-02',
      purchaseTime: '08:13',
      total: '2.65',
      items: [
        { shortDescription: 'Pepsi - 12-oz', price: '1.25' },
        { shortDescription: 'Dasani', price: '1.40' }
      ]
    };

    const points = calculatePoints(receipt);
    expect(points).toBe(15);
  });

  it('computes correct points for Target example', () => {
    const receipt: IReceipt = {
      retailer: 'Target',
      purchaseDate: '2022-01-02',
      purchaseTime: '13:13',
      total: '1.25',
      items: [
        { shortDescription: 'Pepsi - 12-oz', price: '1.25' }
      ]
    };

    const points = calculatePoints(receipt);
    expect(points).toBe(31);
  });
});