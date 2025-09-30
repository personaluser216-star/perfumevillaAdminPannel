import React, { useState } from "react";
import { assets } from "../assets/assets";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FaPlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";


const AddProduct = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men's Perfume");
  const [subCategory, setSubCategory] = useState("Luxury");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [brand, setBrand] = useState("");
  const [fragrance, setFragrance] = useState("");
  const Naviagte=useNavigate();
  const OnSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", bestseller.toString());
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("brand", brand);

      if (fragrance.trim() !== "") {
        formData.append("fragrance", JSON.stringify(fragrance.split(",")));
      }

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(backendUrl + "/product/add", formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message || "Product added successfully!",{
          
        });
        setName("");
        setDescription("");
        setPrice("");
        setCategory("Men's Perfume");
        setSubCategory("Luxury");
        setBestseller(false);
        setSizes([]);
        setBrand("");
        setFragrance("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        Naviagte("/list")
      } else {
        toast.error(response.data.message || "Failed to add product"
        );
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!",
        
      );
    }
  };

  return (
    <>
   <div className="flex items-center justify-between mb-6">
      {/* Left side: Add Product */}
      <div className="flex items-center gap-2 text-[#5b4f47]">
        <FaPlus className="text-xl" />
        <h1 className="font-semibold text-xl">Add Product</h1>
      </div>

      {/* Right side: View All Products */}
      <Link
        to="/list"
        className="px-4 py-2 bg-[#5b4f47] text-white rounded  transition"
      >
        View All Products
      </Link>
    </div>
    <form
      onSubmit={OnSubmitHandler}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto p-6 bg-white shadow-md rounded"
    >
      {/* LEFT SIDE */}
      
      <div className="flex flex-col gap-5">
        
        {/* Upload Images */}
        <div>
          <p className="mb-2 font-medium">Upload Images</p>
          <div className="flex gap-3 flex-wrap">
            {[1, 2, 3, 4].map((num) => (
              <label key={num} htmlFor={`image${num}`} className="cursor-pointer">
                <img
                  className="w-20 h-20 object-cover border rounded"
                  src={
                    !eval(`image${num}`)
                      ? assets.upload_area
                      : URL.createObjectURL(eval(`image${num}`))
                  }
                  alt=""
                />
                <input
                  type="file"
                  id={`image${num}`}
                  hidden
                  onChange={(e) => eval(`setImage${num}(e.target.files[0])`)}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <div>
          <p className="mb-2 font-medium">Product Name</p>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Type Here"
            required
            className="border w-full px-3 py-2 rounded"
          />
        </div>

        {/* Description */}
        <div>
          <p className="mb-2 font-medium">Product Description</p>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Write Content Here"
            required
            rows={4}
            className="border w-full px-3 py-2 rounded"
          />
        </div>

        {/* Category */}
        <div>
          <p className="mb-2 font-medium">Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="Men's Perfume">Men's Perfume</option>
            <option value="Women's Perfume">Women's Perfume</option>
            <option value="Unisex Perfume">Unisex Perfume</option>
          </select>
        </div>

        {/* SubCategory */}
       

        {/* Sizes */}
       
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col gap-5">
        {/* Price */}
         <div>
          <p className="mb-2 font-medium">Sub Category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="Luxury">Luxury</option>
            <option value="Casual">Casual</option>
            <option value="Daily Use">Daily Use</option>
          </select>
        </div>
         <div>
          <p className="mb-2 font-medium">Available Sizes</p>
          <div className="flex gap-3 flex-wrap">
            {["50ml", "100ml", "200ml", "500ml"].map((size) => (
              <div
                key={size}
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes(size)
                      ? prev.filter((item) => item !== size)
                      : [...prev, size]
                  )
                }
              >
                <p
                  className={`${
                    sizes.includes(size) ? "bg-slate-200" : "bg-[#f8f7f4]"
                  } px-3 py-1 cursor-pointer rounded`}
                >
                  {size}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 font-medium">Price</p>
          <input
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            placeholder="2000"
            className="border w-full px-3 py-2 rounded"
          />
        </div>

        {/* Brand */}
        <div>
          <p className="mb-2 font-medium">Brand</p>
          <input
            type="text"
            onChange={(e) => setBrand(e.target.value)}
            value={brand}
            placeholder="Perfume Villa"
            required
            className="border w-full px-3 py-2 rounded"
          />
        </div>

        {/* Fragrance */}
        <div>
          <p className="mb-2 font-medium">Fragrance (comma separated)</p>
          <input
            type="text"
            onChange={(e) => setFragrance(e.target.value)}
            value={fragrance}
            placeholder="Floral, Woody, Citrus"
            className="border w-full px-3 py-2 rounded"
          />
        </div>

        {/* Bestseller */}
        <div className="flex items-center gap-2">
          <input
            onChange={() => setBestseller((prev) => !prev)}
            checked={bestseller}
            type="checkbox"
            id="bestseller"
          />
          <label className="cursor-pointer" htmlFor="bestseller">
            Add To Bestseller
          </label>
        </div>

        {/* Submit */}
       
      </div>
       <div className="flex justify-start">
          <button
            type="submit"
            className="w-40 py-3 bg-[#5b4f47] text-white rounded transition"
          >
            Add Product
          </button>
        </div>
    </form>
    </>
  );
};

export default AddProduct;
