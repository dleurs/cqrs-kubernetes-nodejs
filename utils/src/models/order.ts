export class Order
{
    product: Product;
    unitPrice: number;
    quantity: number;
    constructor({ product, unitPrice = 0, quantity = 0}: OrderArgs)
    {
        this.product = product;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
    }

    static fromJson(json: any): Order
    {
        let orderArgs: OrderArgs = {
            product: stringToProduct(json.product),
            unitPrice: parseFloat(json.unitPrice),
            quantity: parseFloat(json.quantity),
        };
        return new Order(orderArgs);
    }

    toJson(): any
    {
        let json: any = {};
        json.product = productToString(this.product);
        json.unitPrice = this.unitPrice;
        json.quantity = this.quantity;
        return json;
    }
}

export class OrderArgs
{
    product!: Product;
    unitPrice?: number;
    quantity?: number;
}

export enum Product
{
    apple, // 0
    pear   // 1
}

export function productToString(product: Product): string
{
    if (product == Product.apple)
    {
        return "apple";
    }
    else
    {
        return "pear";
    }
}

export function stringToProduct(productStr: string): Product
{
    if (productStr == "apple" || productStr == "0")
    {
        return Product.apple;
    }
    else
    {
        return Product.pear;
    }
}