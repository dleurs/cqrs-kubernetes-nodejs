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
          quantityApple: json.quantityApple,
          totalPriceApple: json.totalPriceApple,
          quantityPear: json.quantityPear,
          totalPricePear: json.totalPricePear 
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
  }
  
  export class TotalOrderedArgs
  {
    quantityApple?: number;
    totalPriceApple?: number;
    quantityPear?: number;
    totalPricePear?: number;
  }

