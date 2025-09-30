import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import axios from "axios";
import { FaPlus } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditProduct = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 🟢 states same as AddProduct
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

  // 🟢 Load existing product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${backendUrl}/product/get/${id}`);
        if (response.data.success) {
          const p = response.data.product;
          setName(p.name);
          setDescription(p.description);
          setPrice(p.price);
          setCategory(p.category);
          setSubCategory(p.subCategory);
          setSizes(p.sizes || []);
          setBrand(p.brand);
          setFragrance(p.fragrance?.join(",") || "");
          setBestseller(p.bestSeller);
          setImage1(p.image?.[0] || false);
          setImage2(p.image?.[1] || false);
          setImage3(p.image?.[2] || false);
          setImage4(p.image?.[3] || false);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchProduct();
  }, [id]);

  // 🟢 Update product handler
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

      // 🟢 New images hoy to append karo
      image1 && typeof image1 !== "string" && formData.append("image1", image1);
      image2 && typeof image2 !== "string" && formData.append("image2", image2);
      image3 && typeof image3 !== "string" && formData.append("image3", image3);
      image4 && typeof image4 !== "string" && formData.append("image4", image4);

      const response = await axios.put(
        `${backendUrl}/product/update/${id}`,
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Product updated successfully!");
        navigate("/list");
      } else {
        toast.error(response.data.message || "Failed to update");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-[#5b4f47]">
          <FaPlus className="text-xl" />
          <h1 className="font-semibold text-xl">Edit Product</h1>
        </div>

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
                        : typeof eval(`image${num}`) === "string"
                        ? eval(`image${num}`)
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
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col gap-5">
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

          {/* Sizes */}
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

          {/* Price */}
          <div>
            <p className="mb-2 font-medium">Price</p>
            <input
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
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
        </div>

       <div className="flex justify-start col-span-2 gap-4">
  <button
    type="submit"
    className="w-40 py-3 bg-[#5b4f47] text-white rounded transition"
  >
    Update Product
  </button>

  <button
    type="button"
    onClick={() => navigate("/list")}
    className="w-40 py-3 bg-gray-300 text-black rounded transition"
  >
    Cancel
  </button>
</div>

      </form>
    </>
  );
};

export default EditProduct;
