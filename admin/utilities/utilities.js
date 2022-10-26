export function calculatePrice(price, currency) {
    switch (currency) {
      case 'EUR':
        return price * 0.86;
      case 'CAD':
        return price * 1.33;
        case 'GH₵':
        return price * 6.21;
      default:
        return price;
    }
  }
  
  export function calculateTotal(cart, currency) {
    let totalUSD = 0;
   /* Object.keys(cart).forEach((itemName) => {
      totalUSD += cart[itemName].price * cart[itemName].quantity;
    });*/
    totalUSD=Object.keys(cart).reduce(
      (prevTotal,item)=>prevTotal+cart[item].amount,0)
    return calculatePrice(totalUSD, currency).toFixed(2);
  }
  
  export function getCurrencySymbol(currencyFilter) {
    switch (currencyFilter) {
      case 'USD':
        return '$';
      case 'EUR':
        return '€';
      case 'CAD':
        return '$';
        case 'GH₵':
        return '₵';
      default:
        return '';
    }
  }
 