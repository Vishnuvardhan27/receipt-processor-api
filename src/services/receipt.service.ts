import { randomUUID } from 'crypto';
import { IReceipt } from '../interfaces/receipt.interface';

/**
 * In-memory store:
 *   receiptId -> { receipt, points }
 */
const receiptStore = new Map<string, { receipt: IReceipt; points: number }>();

/**
 * Calculates the total points for a given receipt.
 *   1) +1 point for every alphanumeric char in the retailer name.
 *   2) +50 if the total is a whole number.
 *   3) +25 if the total is a multiple of 0.25.
 *   4) +5 for every 2 items.
 *   5) If trimmed item desc length is multiple of 3 => ceil(price * 0.2).
 *   6) +6 if purchase day is odd.
 *   7) +10 if purchase time (hour) is between 14..15 (2pm-3:59pm).
 */
export function calculatePoints(receipt: IReceipt): number {
  let points = 0;

  // 1) Count alphanumeric characters in retailer name
  const alphanumericMatches = receipt.retailer.match(/[a-zA-Z0-9]/g);
  if (alphanumericMatches) {
    points += alphanumericMatches.length;
  }

  const totalAmount = parseFloat(receipt.total);

  // 2) +50 if total is a whole number
  if (Number.isInteger(totalAmount)) {
    points += 50;
  }

  // 3) +25 if total is a multiple of 0.25
  if ((totalAmount * 100) % 25 === 0) {
    points += 25;
  }

  // 4) +5 points for every 2 items
  const pairs = Math.floor(receipt.items.length / 2);
  points += pairs * 5;

  // 5) For each item, check if description length is multiple of 3 => add ceil(price*0.2)
  for (const item of receipt.items) {
    const trimmedDesc = item.shortDescription.trim();
    if (trimmedDesc.length % 3 === 0) {
      const itemPrice = parseFloat(item.price);
      const bonus = Math.ceil(itemPrice * 0.2);
      points += bonus;
    }
  }

  // 6) +6 points if purchase day is odd
  const [year, month, day] = receipt.purchaseDate.split('-').map(Number);
  if (day % 2 !== 0) {
    points += 6;
  }

  // 7) +10 points if hour is between 14..15 (2pm-3:59pm)
  const [hour, minute] = receipt.purchaseTime.split(':').map(Number);
  if (hour >= 14 && hour < 16) {
    points += 10;
  }

  return points;
}

/**
 * Processes the given receipt:
 *  - Generates a unique ID
 *  - Calculates points
 *  - Stores data in memory
 *  - Returns the generated ID
 */
export function processReceipt(receipt: IReceipt): string {
  const id = randomUUID();
  const points = calculatePoints(receipt);
  receiptStore.set(id, { receipt, points });
  return id;
}

/**
 * Retrieves the points for a given receipt ID from the in-memory store.
 * Returns undefined if not found.
 */
export function getPointsForReceipt(id: string): number | undefined {
  return receiptStore.get(id)?.points;
}
