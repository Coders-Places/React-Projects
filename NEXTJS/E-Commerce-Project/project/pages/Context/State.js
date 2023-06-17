import React, { useEffect, useState } from 'react';
import { BsSymmetryVertical } from 'react-icons/bs';
import CartContext from './CartContext';

const State = (props) => {
  const [Cart, setCart] = useState([
  ]);
  const [SubTotalOfCart, setSubTotalOfCart] = useState(0);

  const subTotal = () => {
    let sbt = 0;
    for (const Item of Cart)
      sbt += parseInt((Item.price.replace("$", ''))) * Item.quantity; // {{Single Item Price}} * Its {{Quantity}}
    return sbt;
  }


  const saveCart = (givenData) => {
    localStorage.setItem("CART", JSON.stringify(givenData));
    console.log('cart saved')
  }

  function AddToCart(id, item, quantity, price) {
    let itemToBeAdded = { id, item, quantity, price }

    let uniqueItem = true;  // flag to determine whether the item is unique for the cart

    let cart = Cart;

    // Traversing through the cart-array, and checking if the "item" is already added in the Cart?
    for (const item of cart) {
      if (item.id === itemToBeAdded.id) {     // if the 'item' is already present in the cart, then increase its quantity and Update The [Cart-State]
        item.quantity += 1;
        console.log("increased quantity")
        uniqueItem = false;     // flag -the item is found in the cart

        setCart([...cart]);
        saveCart([...cart]); // saving into LC
      }
    }

    // if the item is Unique? it means it doesn't exist in the cart, then append the Item into the Cart-Array and again update its state
    if (uniqueItem) {
      if (cart.length === 0) {
        setCart([{ id, item, quantity, price }]);
        saveCart([{ id, item, quantity, price }]);  // saving into LC
        console.log('length is 0', cart)
      } else {
        setCart([...cart, { id, item, quantity, price }]);
        saveCart([...cart, { id, item, quantity, price }]); // saving into LC
      }
      // console.log("Cart is setting")
    }
  }

  function increament(itemIndex) {

    let myCart = Cart;
    ++(myCart[itemIndex].quantity)

    // console.log(Cart[itemIndex].quantity)
    // if (state)
    //   setState(false)
    // else setState(true)

    setCart([...myCart]);
    saveCart([...myCart]);
  }
  function decreament(itemIndex) {

    let myCart = Cart;

    (myCart[itemIndex].quantity <= 1) ? '' : --(myCart[itemIndex].quantity)

    setCart([...myCart]);
    saveCart([...myCart]);
  }


  // Clearing the localstorage... or assigning the localstorage to '[]' an empty array
  const clearCart = () => {

    saveCart([]);
    setCart([]);
  }

  const clearParticularItem = (itemIndex) => {
    let myCart = Cart;
    console.log(myCart[itemIndex])

    // remevoe item according to the given Item-Index

    // myCart.filter(item => )

    myCart.splice(itemIndex, 1);
    setCart([...myCart]);
    saveCart([...myCart]);
  }



  useEffect(() => {
    if (JSON.parse(localStorage.getItem("CART"))) {
      setCart(JSON.parse(localStorage.getItem("CART")));
    } else {
      setCart([]);
      saveCart([]);
    }
  }, []);






  return (
    <CartContext.Provider value={{ Cart, setCart, AddToCart, increament, decreament, clearCart, clearParticularItem, subTotal }}>
      {props.children}
    </CartContext.Provider>
  );
}

export default State;