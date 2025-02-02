export interface IItem {
  shortDescription: string; 
  price: string;            
}

export interface IReceipt {
  retailer: string;      
  purchaseDate: string;  
  purchaseTime: string;  
  items: IItem[];        
  total: string;
}
