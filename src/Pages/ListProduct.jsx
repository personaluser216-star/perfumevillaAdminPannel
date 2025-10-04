import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { MdDelete, MdEdit } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom'
import { FaList } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import Pagination from '@mui/material/Pagination'; 

const ListProduct = ({ token }) => {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 7;

  const navigate = useNavigate();

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/product/get');
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/product/delete`,
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const editProduct = (id) => {
    navigate(`/edit/${id}`);
  };

  const DetailsProduct = (id) => {
    navigate(`/productDetails/${id}`);
  };

  useEffect(() => {
    fetchList();
  }, []);

  // 🔹 Filtered list based on search term
  const filteredList = list.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔹 Pagination logic
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedList = filteredList.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6 md:mt-28 mt-24">
        {/* Left side: List Products */}
        <div className="flex items-center gap-2 text-[#5b4f47]">
          <FaList className="text-xl" />
          <h1 className="font-semibold text-xl">List Product</h1>
        </div>

        {/* Right side: Add Product */}
        <Link
          to="/add"
          className="px-4 py-2 bg-[#5b4f47] text-white  transition"
        >
          Add New Product
        </Link>
      </div>

      {/* 🔹 Search Bar */}
      <div className="mb-4 flex justify-start">
        <div className="relative w-full md:w-1/3">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <IoIosSearch />
          </span>
          <input
            type="text"
            placeholder="Search by name ..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
            className="w-full border px-3 py-2 pl-10 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5b4f47]"
          />
        </div>
      </div>

      <div className="flex gap-2 flex-col">
        <div className="hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr] items-center py-2 px-3 border bg-[#f8f7f4] text-md">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {paginatedList.length > 0 ? (
          paginatedList.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_2fr_1fr_1fr] md:grid-cols-[1fr_2fr_1fr_1fr_1fr] border-b pb-1 items-center"
            >
              <img
                src={item.image[0]}
                alt=""
                className="w-10 h-10 cursor-pointer"
                onClick={() => DetailsProduct(item._id)}
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>

              <div className="flex justify-end md:justify-center gap-3">
                <MdEdit
                  className="text-[#5b4f47] text-lg cursor-pointer"
                  onClick={() => editProduct(item._id)}
                />
                <MdDelete
                  className="text-[#5b4f47] text-lg cursor-pointer"
                  onClick={() => removeProduct(item._id)}
                />
                <FaRegEye
                  className="text-[#5b4f47] text-lg cursor-pointer"
                  onClick={() => DetailsProduct(item._id)}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">No products found</p>
        )}
      </div>

      {/* 🔹 MUI Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            variant="outlined"
          />
        </div>
      )}
    </>
  );
};

export default ListProduct;
