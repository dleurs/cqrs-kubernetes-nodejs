const quantityStr: string = "quantity";
const productStr: string = "product";
const priceStr: string = "price";
const totalPriceStr: string = "totalPrice";
const appleStr: string = "apple";
const pearStr: string = "pear";

/*
const appleQuantityStr: string = "appleQuantity";
const appleTotalPrice: string = "appleTotalPrice";
const pearQuantityStr = "pearQuantity";
const pearTotalPriceStr = "pearTotalPrice";*/

export function initApplePearTotalOrderedData(appleQuantity?: number, appleTotalPrice?: number, pearQuantity?: number, pearTotalPrice?: number): any
{
  let totalOrderedData: Map<string, Map<string, number>> = new Map<string, Map<string, number>>();
  let apple: Map<string, number> = new Map<string, number>();
  apple.set(quantityStr, appleQuantity || 0);
  apple.set(totalPriceStr, appleTotalPrice || 0);
  let pear: Map<string, number> = new Map<string, number>();
  pear.set(quantityStr, pearQuantity || 0);
  pear.set(totalPriceStr, pearTotalPrice || 0);
  totalOrderedData.set(appleStr, apple);
  totalOrderedData.set(pearStr, pear);
  return [apple, pear, totalOrderedData];
}

export function fillTotalOrderedData(listOrder: Array<any>): Map<string, Map<string, number>>
{
  let [newApple, newPear, newTotalOrderedData] = initApplePearTotalOrderedData();
  for (let i = 0; i < listOrder.length; i++)
  {
    let order = listOrder[i];
    if (order[productStr] == appleStr)
    {
      newApple.set(quantityStr, (newApple.get(quantityStr) || 0) + parseInt(order[quantityStr] || "0"));
      newApple.set(totalPriceStr, (newApple.get(totalPriceStr) || 0) + (parseFloat(order[priceStr] || "0") * parseInt(order[quantityStr] || "0")));
      newTotalOrderedData.set(appleStr, newApple);
    } else 
    {
      newPear.set(quantityStr, (newPear.get(quantityStr) || 0) + parseInt(order[quantityStr] || "0"));
      newPear.set(totalPriceStr, (newPear.get(totalPriceStr) || 0) + (parseFloat(order[priceStr] || "0") * parseInt(order[quantityStr] || "0")));
      newTotalOrderedData.set(pearStr, newPear);
    }
  }
  return newTotalOrderedData;
}

export function totalOrderedDataToObject(totalOrderedData:  Map<string, Map<string, number>>): any
{
  let data = {
    appleQuantity: totalOrderedData.get(appleStr)?.get(quantityStr)?.toString() || "0",
    appleTotalPrice: totalOrderedData.get(appleStr)?.get(totalPriceStr)?.toString() || "0",
    pearQuantity: totalOrderedData.get(pearStr)?.get(quantityStr)?.toString() || "0",
    pearTotalPrice: totalOrderedData.get(pearStr)?.get(totalPriceStr)?.toString() || "0"
  };
  return data;
}