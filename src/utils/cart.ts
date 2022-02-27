export function getTotalPrice(values: any[]) {
  return values.reduce(
    (total: any, item: any) =>  total + getPriceByItem(item)
    ,0
  );
}

export function getPriceByItem(item: any) {
  const { status, type, value } = item.isSale;
  if (status) {
    if (type == "percent")
      return item.quantity * (item.price - (value * item.price) / 100);
    return value * item.quantity;
  }
  return item.price * item.quantity;
}
