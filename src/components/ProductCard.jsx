import { Link } from "react-router";


export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="no-underline">
        <div className="bg-white text-[#242424] p-4 rounded-lg shadow-(--boxshadow) hover:shadow-(--boxshadow-hover) transition-shadow duration-200">
            <div className="w-full flex justify-center items-center mb-4 h-75">
                <img src={product.imgUrl} alt={product.model} className="h-[90%] object-cover rounded" />
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="col-span-2">
                    <h4 className="text-sm font-bold mb-0 text-(--secondary-color)">{product.brand}</h4>
                    <h2 className="text-base font-bold">{product.model}</h2>
                </div>
                {product.price != '' && 
                    <p className="text-2xl font-semibold text-right text-(--primary-color) self-end col-start-2">€{product.price}.00</p>
                }
                {product.price == '' && 
                    <p className="text-xl font-semibold text-right text-red-500 self-end col-start-2">Not available</p>
                }
            </div>
            <button id="view" type="submit" className="bg-(--primary-color) hover:bg-(--primary-color-dark) text-white px-4 py-2 rounded transition-colors w-full">
                View Product
            </button>
            
        </div>
    </Link>
  );
}