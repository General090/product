import React, {useState} from 'react'
import DeskWaffle from '../../Assets/DeskWaffle.jpg'
import AddCart from '../../Assets/AddCart.svg'
import CremeBrulee from '../../Assets/CremeBrulee.jpg'
import Macaron from '../../Assets/Macaron.jpg'
import Tiramius from '../../Assets/Tiramisu.jpg'
import Bakalava from '../../Assets/Bakalava.jpg'
import Meringue from '../../Assets/Meringue.jpg'
import Cake from '../../Assets/Cake.jpg'
import Brownie from '../../Assets/Brownie.jpg'
import Cotta from '../../Assets/Cotta.jpg'
import Illustration from '../../Assets/Illustration.svg'
import Decrement from '../../Assets/Decrement.svg'
import Increment from '../../Assets/Increment.svg'

function Desserts() {
  const [cart, setCart] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const products = [
    { id: 1, name: "Waffle", alt: "Waffle with Beries", price: 6.5, image: DeskWaffle },
    { id: 2, name: "Creme Brulee", alt: "Vanilla Bean Creme Brulee", price: 7.0, image: CremeBrulee },
    { id: 3, name: "Macaron", alt: "Macaron Mix of Five", price: 8.0, image: Macaron },
    { id: 4, name: "Tiramius", alt: "Classic Tiramisu", price: 5.5, image: Tiramius },
    { id: 5, name: "Baklava", alt: "Pistachio Baklava", price: 4.0, image: Bakalava },
    { id: 6, name: "Pie", alt: "Lemon Meringue Pie", price: 5.0, image: Meringue },
    { id: 7, name: "Cake", alt: "Red Velvet Cake", price: 4.5, image: Cake },
    { id: 8, name: "Brownie", alt: "Salted Caramel Brownie", price: 5.5, image: Brownie },
    { id: 9, name: "Panna Cotta", alt: "Vanilla Panna Cotta", price: 6.5, image: Cotta },
  ];

  
  const handleAddToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      setSelectedItems([...selectedItems, product.id]);
    }
  };

  const handleDecreaseQuantity = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
  
    if (existingProduct.quantity === 1) {
      setCart(cart.filter((item) => item.id !== product.id));
      setSelectedItems(selectedItems.filter((id) => id !== product.id)); // Remove the product ID
    } else {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };
  

  const getProductQuantity = (productId) => {
    const product = cart.find((item) => item.id === productId);
    return product ? product.quantity : 0;
  };



  return (
   <section className='mt-14 ml-20'>
    <div className='flex gap-7'>
      <div className='w-[65%]'>
        <header className='text-4xl mb-5 font-bold'>Desserts</header>

        <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className={`p-4 rounded-lg relative`}
          >
            <img
              src={product.image}
              alt={product.name}
              className={`rounded-md w-full ${
                selectedItems.includes(product.id) ? "ring-2 ring-orange-500" : ""
              }`}
            />
            <h2 className="mt-10">{product.name}</h2>
            <h2 className='font-bold text-md'>{product.alt}</h2>
            <p className="text-red-500">${product.price.toFixed(2)}</p>

            {getProductQuantity(product.id) === 0 ? ( 
                <button
              onClick={() => handleAddToCart(product)}
              className="mt-2 px-4 py-2  border border-red-500 bg-white -translate-y-[9rem] rounded-full absolute left-14"
            >
              <div className='flex gap-3'>
                <img src={AddCart} />
                <p>Add to Cart</p>
              </div>
            </button>

            ) : (

              <div className="flex items-center justify-between bg-orange-600 w-[60%] py-[6px] -translate-y-[8.5rem] rounded-full absolute left-14">
                  <button
                    className="px-4 py-2  text-white rounded-lg "
                    onClick={() => handleDecreaseQuantity(product)}
                  >
                    <img src={Decrement} className="border border-white py-2 px-1 rounded-full"/>
                  </button>
                  <span className="text-lg font-bold">
                    {getProductQuantity(product.id)}
                  </span>
                  <button
                    className="px-4 py-2 text-white rounded-lg"
                    onClick={() => handleAddToCart(product)}
                  >
                    <img src={Increment} className="border border-white py-1 px-1 rounded-full" />
                  </button>
                </div>
            )}
              
              

            
          </div>
        ))}
      </div>
      </div>

      <div className='w-[30%]'>
        <header className='text-red-500 text-xl font-bold mb-10'>Your Cart(0)</header>
        
        {cart.length > 0 ? (
            <>
              <ul className="mt-4 space-y-2">
                {cart.map((item) => (
                  <li key={item.id} className="flex justify-between items-center">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Order Total</span>
                  <span>${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                  Confirm Order
                </button>
              </div>
            </>
          ) : (
            <div>
              <img src={Illustration} alt="illustration" className="mx-auto mt-10 w-40 mb-10" />
              <p className="ml-16 text-sm text-[#9E9492] font-bold">Your added item will be added here</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Desserts
