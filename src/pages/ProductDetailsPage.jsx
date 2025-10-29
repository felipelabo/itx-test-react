import { useParams } from "react-router";

export default function ProductDetailsPage() {

    const { id } = useParams();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Product Details</h1>
            <div className="p-4 border rounded shadow">
                <h2 className="text-xl font-semibold mb-2">Product id: {id}</h2>
                <p className="mb-2">This is a detailed description of the product.</p>
                <span className="font-bold">$99.99</span>
            </div>
        </div>
    );
}