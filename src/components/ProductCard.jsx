import { Link } from "react-router";


export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="no-underline">
        <div className="bg-white border text-[#242424] p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="w-full flex justify-center items-center mb-4">
                <img src={product.imgUrl} alt={product.model} className="w-[50%] object-cover mb-4 rounded" />
            </div>
            <h4 className="text-m font-bold mb-0 text-gray-600">{product.brand}</h4>
            <h2 className="text-lg font-bold mb-6">{product.model}</h2>
            {product.price != '' && 
                <p className="text-xl font-semibold text-right">${product.price}</p>
            }
            {product.price == '' && 
                <p className="text-xl font-semibold text-right text-red-500">No Disponible</p>
            }
        </div>
    </Link>
  );
}