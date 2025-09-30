import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${backendUrl}/product/get/${id}`);
        if (response.data.success) {
          setProduct(response.data.product);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="text-center text-lg font-medium">Loading...</p>;
  }

  if (!product) {
    return <p className="text-center text-red-500">Product not found!</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Header */}
      <h2 className="text-2xl font-bold text-[#5b4f47] mb-6">
        Product Details
      </h2>

      {/* Images Row */}
      <div className="flex flex-wrap gap-4 mb-6">
        {product.image?.length > 0 ? (
          product.image.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={product.name}
              className="w-24 h-24 object-cover rounded border"
            />
          ))
        ) : (
          <div className="w-full h-40 bg-gray-100 flex items-center justify-center rounded border">
            <span className="text-gray-400">No Image Available</span>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="space-y-3 text-gray-700 mb-8">
        <p>
          <span className="font-semibold">Product Name:</span> {product.name}
        </p>
        <p>
          <span className="font-semibold">Product Description:</span>{" "}
          {product.description}
        </p>
        <p>
          <span className="font-semibold">Price:</span> ₹{product.price}
        </p>
        <p>
          <span className="font-semibold">Product category:</span> {product.category}
        </p>
        <p>
          <span className="font-semibold">Sub Category:</span>{" "}
          {product.subCategory}
        </p>
        <p>
          <span className="font-semibold">Brand:</span> {product.brand}
        </p>
        <p>
          <span className="font-semibold">Sizes:</span>{" "}
          {product.sizes?.length > 0
            ? product.sizes.join(", ")
            : "Not Available"}
        </p>
        <p>
          <span className="font-semibold">Fragrance:</span>{" "}
          {product.fragrance?.length > 0
            ? product.fragrance.join(", ")
            : "Not Available"}
        </p>
        {product.bestSeller && (
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span className="text-yellow-600 font-medium">🌟 Bestseller</span>
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-start gap-4">
       
        <button
          onClick={() => navigate(`/edit/${product._id}`)}
          className="px-6 py-2 bg-[#5b4f47] text-white rounded hover:opacity-90 transition"
        >
          Edit Product
        </button>
         <Link
          to="/list"
          className="px-6 py-2 bg-gray-300 text-gray-800 rounded  transition"
        >
          Back to Products
        </Link>
      </div>
    </div>
  );
};

export default ProductDetails;
