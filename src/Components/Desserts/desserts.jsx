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
import Remove from '../../Assets/Remove.svg'
import Carbon from '../../Assets/Carbon.svg'
import Confirmed from '../../Assets/Confirmed.svg'

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
      setSelectedItems(selectedItems.filter((id) => id !== product.id));
    } else {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  const handleRemoveItem = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
    setSelectedItems(selectedItems.filter((id) => id !== productId));
};

  

  const getProductQuantity = (productId) => {
    const product = cart.find((item) => item.id === productId);
    return product ? product.quantity : 0;
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const [isModalVisible, setModalVisible] = useState(false);



  return (
   <section className='lg:mt-10 mb-10 lg:pl-20 bg-[#FCF9F5]'>
    <div className='md:flex lg:gap-9'>
      <div className='lg:w-[60%]'>
        <header className='text-4xl mb-5 font-bold ml-5 mt-7'>Desserts</header>

        <div className="md:grid lg:grid-cols-3 lg:gap-4"> 
        {products.map((product) => (
          <div
            key={product.id}
            className={`p-4 rounded-lg relative`}
          >
            <img
              src={product.image}
              alt={product.name}
              className={`lg:rounded-md rounded-xl ${
                selectedItems.includes(product.id) ? "ring-2 ring-orange-500" : ""
              }`}
            />
            <h2 className="mt-10">{product.name}</h2>
            <h2 className='font-bold text-md'>{product.alt}</h2>
            <p className="text-red-500">${product.price.toFixed(2)}</p>

            {getProductQuantity(product.id) === 0 ? ( 
                <button
              onClick={() => handleAddToCart(product)}
              className="mt-2 lg:px-4 lg:py-2 px-8 py-4  border border-red-500 hover:border-orange-500 bg-white lg:-translate-y-[9rem] -translate-y-[9.5rem] rounded-full absolute lg:left-12 left-[27%]"
            >
              <div className='flex gap-3'>
                <img src={AddCart} />
                <p className='hover:text-orange-500'>Add to Cart</p>
              </div>
            </button>

            ) : (

              <div className="flex items-center justify-between bg-orange-600 w-[45%] lg:w-[60%] py-3 lg:py-[6px] -translate-y-[9rem] lg:-translate-y-[8.5rem] rounded-full absolute left-[26%] lg:left-12">
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

      <div className='lg:w-[35%] h-[40%] bg-white rounded-md shadow-lg py-10 px-7 mx-4'>
      <header className="text-red-500 text-3xl lg:text-2xl font-bold mb-10">
        Your Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
      </header>
        
        {cart.length > 0 ? (
            <>
              <ul className="mt-4 space-y-4">
                {cart.map((item) => (
                  <li key={item.id} className="flex items-center border-b pb-4">
                    
                    <div className="flex-grow">
                      <span className="font-bold block">{item.alt}</span>
                      <div className="flex gap-2 text-gray-600">
                        <span className="text-orange-500 font-bold">{item.quantity}x</span>
                        <span className='text-orange-200'>@ ${(item.price).toFixed(2)} ${(item.price).toFixed(2)}</span>
                      </div>
                    </div>

                    
                    <button
                      className="border border-[#6A6464] py-1 px-1 rounded-full"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <img src={Remove} alt="Remove" className="w-3 h-3" />
                    </button>
                  </li>
                ))}
              </ul>


              <div className="mt-4 border-t pt-4">    
                <div className="flex justify-between text-base">
                  <span className='text-base'>Order Total</span>
                  <span className='font-bold text-xl'>${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span>
                </div>

                <div className='flex gap-4 bg-[#FCF9F5] mt-10 ml-5 md:ml-0 lg:ml-10 mb-5'>
                  <img src={Carbon} alt="Carbon" />
                  <p>This is a <span className='text-black font-bold'>carbon-neutral</span> delivery</p>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-orange-700 text-white hover:bg-orange-800 rounded-full"
                  onClick={() => setModalVisible(true)}
                >
                
                  Confirm Order
                </button>
              </div>
            </>
          ) : (
            <div>
              <img src={Illustration} alt="illustration" className="mx-auto mt-10 w-40 mb-10" />
              <p className="ml-5 lg:ml-16 text-lg lg:text-sm text-[#9E9492] font-bold">Your added item will be added here</p>
            </div>
          )}
        </div>

        {isModalVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="w-[90%] max-w-md bg-white rounded-lg shadow-lg p-6">
              <div>
                <img src={Confirmed} alt="confirmed" className='w-[10%] mb-5' />
                <h2 className="text-2xl font-bold mb-2">Order Confirmed</h2>
              </div>
              <p className="text-[#e3c092]">We hope you enjoy your food!</p>
              
              {/* Make the item list container scrollable */}
              <div className="bg-[#FCF9F5] rounded-md mt-5 px-5 py-5 max-h-[400px] overflow-y-auto">
                <ul className="mt-4">
                  {cart.map((item) => (
                    <li key={item.id} className='flex justify-between items-center'>
                      <div className='flex gap-4'>
                        <img
                          src={item.image}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <span className="flex flex-col mb-5"> 
                          <span className="text-gray-800 font-bold mb-2">{item.alt}</span>
                          <div className='flex gap-2'>
                            <span className="text-orange-500 font-bold">
                              {item.quantity}x
                            </span> 
                            <span className='text-orange-200'>@${(item.price).toFixed(2)}</span> 
                          </div>
                        </span>
                      </div>
                      <span>${(item.price).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex justify-between text-xl">
                  <span className='text-base'>Order Total</span>
                  <span className='font-bold'>
                    ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                className="w-full mt-4 px-4 py-2 bg-orange-700 text-white hover:bg-orange-800 rounded-full"
                onClick={() => setModalVisible(false)}
              >
                Start New Order
              </button>
            </div>
          </div>
)}

      </div>
    </section>
  )
}

export default Desserts
