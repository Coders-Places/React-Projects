import Link from 'next/link'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { BsCart2, BsCart3 } from "react-icons/bs"
import CartContext from '../Context/CartContext'
import CartItems from './CartItems'

const Nav = (props) => {

  const { Cart, setCart, increament, decreament, clearCart, clearParticularItem } = useContext(CartContext);

  function toggleCart() {

    // carrying the [Cart-Container] '#Cart' "JSX-Element"
    const cart = ref.current;

    // if cart contains the class 'translate-x-full' then remove, but if not then add that class
    if (cart.classList.contains("translate-x-full")) {
      cart.classList.remove("translate-x-full")
    } else {
      cart.classList.add("translate-x-full")
    }
  }

  const ref = useRef();

  return (
    <>
      <header className="h-20  flex justify-center  text-gray-600 body-font  ">
        <div className="w-[100%] z-10 fixed container mx-auto flex bg-white shadow-sm flex-wrap p-5 flex-col md:flex-row items-center ">
          <Link href={'/'}>
            <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-red-500 rounded-full" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="ml-3 text-xl">{props.Title}</span>
            </a>
          </Link>
          <nav className=" md:ml-auto flex flex-wrap items-center text-base justify-center">

            <Link href={"/tshirts"}>
              <a className="mr-5 hover:text-gray-900">Tshirts</a>
            </Link>

            <Link href={"/hoodies"}>
              <a className="mr-5 hover:text-gray-900">Hoodies</a>
            </Link>

            <Link href={"/panties"}>
              <a className="mr-5 hover:text-gray-900">Panties</a>
            </Link>

            <Link href={"/mugs"}>
              <a className="mr-5 hover:text-gray-900">Mugs</a>
            </Link>
          </nav>

          <Link href={"/login"}>
            <a className=" transition-all mr-5 text-gray-900 bg-gray-50 px-4 py-1 hover:bg-gray-100">Login</a>
          </Link>
          {/* Button- Responsible for the toggling the cart-Side-Bar  */}
          <button onClick={() => { toggleCart() }} className="text-xl inline-flex items-center bg-gray-100 border-0 mx-6 py-2 px-4 focus:outline-none hover:bg-gray-200 rounded   mt-4 md:mt-0">
            <BsCart3 />
          </button>

        </div >
      </header >





      {/* This is targeted by the 'ref' in react the 'useRef-hook' is the way to Target the JSX element unlike 'document.getelementbyid' , 'query selector' etc... */}
      <div id='Cart' ref={ref} className='z-[20] w-[100%] md:w-[60%] h-[50rem]  bg-white absolute right-0 top-0 p-10 transition-all  translate-x-full shadow-xl ' >

        {/* Button is responsible to remove an item from the CART-List */}
        <button className='text-xl inline-flex items-center text-gray-600 bg-gray-100 border-0 pb-2 px-6 focus:outline-none hover:bg-gray-200 rounded mt-4 mr-9' onClick={toggleCart}>x</button>

        <ol type='1' className='mt-4 '>
          <h4 className='text-xl text-center font-bold mb-4'>Items In Your Cart</h4>

          {/* Cart Must Carry some stuff to display it else, it will display a Message */}
          {
            Cart.length !== 0 ?
              Cart.map((cartItem, ind) => {
                return (
                  <li className='flex justify-between items-center px-2 py-4 m-2 bg-gray-100'>
                    <div className="itemInfo flex justify-center space-x-4 pl-4">
                      <span id="itemNumber">{ind + 1}</span>
                      <span id="itemTitle">{cartItem["item"]}</span>
                    </div>

                    <div id="quantityManipulator" className='flex justify-center items-center space-x-2'>
                      <button onClick={() => { increament(ind) }} className='bg-slate-200 px-[0.6rem] pb-1'> + </button>
                      <span className=''>{cartItem["quantity"]}</span>
                      <button onClick={() => { decreament(ind) }} className='bg-slate-200 px-3 pb-1'> - </button>
                      <div id="clearCartItem" onClick={() => { clearParticularItem(ind) }} className='py-4 px-4 cursor-pointer'>X</div>
                    </div>
                  </li>)
              }) : <p className='p-2'>No Items :( In Your Bucket! </p>
          }

        </ol>

        {
          Cart.length !== 0 ?
            <>
              <Link  // throws the user to the '/checkout' checkout-page
                href={"/checkout"}>
                <button
                  onClick={() => { toggleCart() }}  // toggling the [Tailwind-Class]- "translate-x-full"
                  className='m-2 p-2 bg-gray-800 text-white hover:text-gray-100 hover:bg-gray-900 '>Proceed To Checkout</button>
              </Link>
              <button
                onClick={() => { clearCart() }}  // clearing the cart on 'click'
                className='m-2 p-2 text-gray-800 bg-gray-100 hover:bg-gray-50'>Clear Cart</button>
            </> : ''
        }
      </div>


    </>
  )
}

export default Nav