import { randomUUID } from 'crypto';
import { IReceipt } from '../interfaces/receipt.interface';

// In-memory store: receiptId -> { receipt, points }
const receiptStore = new Map<string, { receipt: IReceipt; points: number }>();

export function calculatePoints(receipt: IReceipt): number {
  let points = 0;

  const alphanumericMatches = receipt.retailer.match(/[a-zA-Z0-9]/g);
  points += alphanumericMatches ? alphanumericMatches.length : 0;

  const totalAmount = parseFloat(receipt.total);

  if (totalAmount % 1 === 0) {
    points += 50;
  }

  if ((totalAmount * 100) % 25 === 0) {
    points += 25;
  }

  const itemCount = receipt.items.length;
  const pairs = Math.floor(itemCount / 2);
  points += pairs * 5;

  receipt.items.forEach(item => {
    const trimmedDesc = item.shortDescription.trim();
    if (trimmedDesc.length % 3 === 0) {
      const itemPrice = parseFloat(item.price);
      const bonus = Math.ceil(itemPrice * 0.2);
      points += bonus;
    }
  });


  const dateParts = receipt.purchaseDate.split('-').map(Number);
  const day = dateParts[2];
  if (day % 2 !== 0) {
    points += 6;
  }


  const timeParts = receipt.purchaseTime.split(':').map(Number);
  const hour = timeParts[0];
  if (hour >= 14 && hour < 16) {
    points += 10;
  }

  return points;
}

export function processReceipt(receipt: IReceipt): string {
  const id = randomUUID(); // e.g., "7fb1377b-b223-49d9-a31a-5a02701dd310"
  const points = calculatePoints(receipt);

  receiptStore.set(id, { receipt, points });
  return id;
}


export function getPointsForReceipt(id: string): number | undefined {
  const entry = receiptStore.get(id);
  return entry?.points;
}
