import { Order, Product } from "./order";

export class TotalOrdered {
    quantityApple: number;
    totalPriceApple: number;
    quantityPear: number;
    totalPricePear: number;
    constructor({ quantityApple = 0, totalPriceApple = 0, quantityPear = 0, totalPricePear = 0 }: TotalOrderedArgs)
    {
        this.quantityApple = quantityApple;
        this.totalPriceApple = totalPriceApple;
        this.quantityPear = quantityPear;
        this.totalPricePear = totalPricePear;
    }
  
    static fromJson(json: any): TotalOrdered
    {
        let totalOrdered: TotalOrderedArgs = {
          quantityApple: parseFloat(json.quantityApple),
          totalPriceApple: parseFloat(json.totalPriceApple),
          quantityPear: parseFloat(json.quantityPear),
          totalPricePear: parseFloat(json.totalPricePear)
        };
        return new TotalOrdered(totalOrdered);
    }
    
    toJson(): any
    {
        let json: any = {};
        json.quantityApple = this.quantityApple;
        json.totalPriceApple = this.totalPriceApple;
        json.quantityPear = this.quantityPear;
        json.totalPricePear = this.totalPricePear;
        return json;
    }

    addOrder(order: Order): void {
      if (order.product == Product.apple) {
        this.quantityApple += order.quantity;
        this.totalPriceApple += (order.unitPrice * order.quantity);
      }
      else if (order.product == Product.pear) {
        this.quantityPear += order.quantity;
        this.totalPricePear += (order.unitPrice * order.quantity);
      }
    }
  }
  
  export class TotalOrderedArgs
  {
    quantityApple?: number;
    totalPriceApple?: number;
    quantityPear?: number;
    totalPricePear?: number;
  }

