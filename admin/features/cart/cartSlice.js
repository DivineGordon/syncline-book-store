export const addItem = (itemToAdd) => {
    return {
      type: 'cart/addItem',
      payload: itemToAdd,
    };
  };
  
  
  export const changeItemQuantity=(name,newQuantity)=>{
    return {
      type:'cart/changeItemQuantity',
      payload:{
        name,
        newQuantity
      }
    }
  }
  
  const initialCart = {cart:{},itemsCount:0};
  export const cartReducer = (cart = initialCart, action) => {
    switch (action.type) {
      case 'cart/addItem': {
        const { name, price,img } = action.payload;
  
        // if the item already exists, increase the quantity by 1, otherwise set it to 1
        const item=cart.cart[name];
        const quantity = item  ? item.quantity + 1 : 1;
        const amount=item ? item.amount + price : price;
        const newItem = { price, quantity,img ,amount};
  
        // Add the new item to the cart (or replace it if it existed already)
        return {
		 cart:{...cart.cart,
			  [name]: newItem,
		  },
			itemsCount:cart.itemsCount+1
        };
      }
      case 'cart/changeItemQuantity': {
        const { name, newQuantity } = action.payload;
        const itemToUpdate = cart.cart[name];
        //TODO: fix precision
        // Create a copy of itemToUpdate and update the quantity prop.
		const diff=newQuantity-itemToUpdate.quantity;
        const updatedItem={...itemToUpdate,
        quantity:newQuantity,
        amount: (itemToUpdate.price * newQuantity)
        }
  
        
        return {
			
          cart:{...cart.cart,
			  [name]:updatedItem
		  },
          itemsCount:cart.itemsCount+diff
		 
        };
      }
	  case 'cart/removeItem':{
		  const name=action.payload;
		 const old= cart.cart[name];
		const  newCart={
			cart:{...cart.cart} , 
			itemsCount:cart.itemsCount-old.quantity  
		  }
		  delete newCart.cart[name];
		  return newCart
	  }
      default: {
        return cart;
      }
    }
  };
  
  export const removeItem=(name)=>{
	 return {
		 type:'cart/removeItem',
		 payload:name
	 }
  }