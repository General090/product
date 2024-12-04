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

  const addToCart = (product) => {
    setCart([...cart, product]);
    setSelectedItems([...selectedItems, product.id]);
  };


  return (
   <section className='mt-14 ml-20'>
    <div className='flex gap-7'>
      <div className='w-[70%]'>
        <header className='text-4xl mb-5 font-bold'>Desserts</header>

        <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className={`p-4 rounded-lg relative ${
              selectedItems.includes(product.id) ? "border-orange-500" : "border-gray-300"
            }`}
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
            <button
              onClick={() => addToCart(product)}
              className="mt-2 px-4 py-2  border border-red-500 bg-white -translate-y-[9rem] rounded-full absolute left-12"
            >
              <div className='flex gap-3'>
                <img src={AddCart} />
                <p>Add to Cart</p>
              </div>
            </button>
          </div>
        ))}
      </div>
      </div>

      <div className='w-[40%]'>
        <header className='text-red-500 text-xl font-bold'>Your Cart(0)</header>
        <img src={Illustration} alt="illustration" className='mx-auto mt-10 w-40 mb-10' />
        <p className='ml-28 text-base text-[#9E9492] font-bold'>Your added item will be added here</p>
      </div>
    </div>
             
   </section>
  )
}

export default Desserts
