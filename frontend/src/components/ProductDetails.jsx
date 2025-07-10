import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold">{product.name}</h2>
      <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover rounded my-4" />
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Recyclable %:</strong> {product.recyclablePercent}</p>
      <p><strong>Supplier Rating:</strong> {product.supplierRating}</p>
      <p><strong>Carbon Footprint:</strong> {product.carbonFootprint}</p>
      <p><strong>Sustainability Score:</strong> {product.sustainabilityScore}</p>
      


      {/* Optional: Display likes/comments */}
      <div className="mt-4">
        <p>👍 Likes: {product.likes}</p>
        <p>💬 Comments:</p>
        <ul className="list-disc pl-6">
          {product.comments.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
