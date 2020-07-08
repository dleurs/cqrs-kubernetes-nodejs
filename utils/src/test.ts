import { Order, Product } from "./order-class";
import { TotalOrdered } from "./total-ordered-class";

let newOrder: Order = new Order({product: Product.pear, unitPrice: 0.5, quantity: 20});
console.log(newOrder);
console.log(newOrder.toJson());
let jsonOrder: any = newOrder.toJson();
let testSameOrder: Order = Order.fromJson(jsonOrder);
console.log(testSameOrder);


let newTotalOrdered: TotalOrdered = new TotalOrdered({quantityApple: 100, totalPriceApple: 35, quantityPear: 78, totalPricePear: 55.5});
console.log(newTotalOrdered);
console.log(newTotalOrdered.toJson());
let jsonTotalOrdered: any = newTotalOrdered.toJson();
let testSameTotalOrdered: TotalOrdered = TotalOrdered.fromJson(jsonTotalOrdered);
console.log(testSameTotalOrdered);