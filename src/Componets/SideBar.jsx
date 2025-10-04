import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaPlus,
  FaList,
  FaShoppingCart,
  FaChevronDown,
  FaChevronUp,
  FaBars,
  FaCircle ,
  FaTimes,
  FaSearch,
} from "react-icons/fa";

const menuItems = [
  {
    title: "Dashboard",
    icon: <FaHome />,
    href: "/dashboard",
  },
  {
    title: "Products",
    icon: <FaBox />,
    dropdown: true,
    children: [
      { title: "Add Product", icon: <FaPlus />, href: "/add" },
      { title: "List Products", icon: <FaList />, href: "/list" },
    ],
  },
 
  {
    title: "Orders",
    icon:<FaShoppingCart />,
    dropdown: true,
    children: [
       { title: "All Orders", icon: <FaCircle className="h-2"/>, href: "/order" },
          { title: "placed Order", icon: <FaCircle className="h-2"/>, href: "/placed-order" },
      { title: "Packing Orders", icon: <FaCircle className="h-2"/>, href: "/packing-order" },
      { title: "Shipped Orders", icon: <FaCircle className="h-2" />, href: "/shipped-order" },
      { title: "Out of Delivery", icon: <FaCircle className="h-2" />, href: "/out-of-delivery-order" },
        { title: "Delivered", icon:<FaCircle className="h-2" />, href: "/delivered-order" },
    ],
  },
];

const SideBar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [search, setSearch] = useState("");

  // Filter menu items and children
  const filteredItems = menuItems.filter((item) => {
    if (item.dropdown) {
      const matchedChildren = item.children.filter((child) =>
        child.title.toLowerCase().includes(search.toLowerCase())
      );
      return (
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        matchedChildren.length > 0
      );
    }
    return item.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-6 right-6 z-50 bg-[#5b4f47] text-white p-2 "
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-20 left-0 w-[70%] md:w-[18%] 
      bg-[#f8f7f4] border-r shadow-md 
      transform transition-transform duration-300 z-40 
      ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
      min-h-screen`}
      >
        {/* Search Field */}
        <div className="p-4 border-b border-gray-200 md:mt-28">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5b4f47]"
            />
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-1 text-[15px] font-medium">
          {filteredItems.length === 0 ? (
            <p className="text-center text-gray-400 py-4">No results found</p>
          ) : (
            filteredItems.map((item, index) => (
              <div key={index} className="border-b border-gray-200 last:border-none">
                {item.dropdown ? (
                  <>
                    {/* Parent Button */}
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === index ? null : index)
                      }
                      className="flex justify-between items-center w-full gap-3 px-6 py-3 hover:text-white hover:bg-[#5b4f47] transition"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{item.icon}</span>
                        <p className="">{item.title}</p>
                      </div>
                      <span className="text-sm">
                        {openDropdown === index ? <FaChevronUp /> : <FaChevronDown />}
                      </span>
                    </button>

                    {/* Dropdown */}
                    {openDropdown === index && (
                      <div className="ml-6 mt-1 flex flex-col gap-1 text-sm  border-[#5b4f47] pl-3">
                        {item.children
                          .filter((child) =>
                            child.title.toLowerCase().includes(search.toLowerCase())
                          )
                          .map((child, childIndex) => (
                            <NavLink
                              key={childIndex}
                              to={child.href}
                              className={({ isActive }) =>
                                `flex gap-2 items-center px-3 py-2 transition 
                                ${
                                  isActive
                                    ? "bg-[#5b4f47] text-white"
                                    : "hover:bg-[#5b4f47] hover:text-white"
                                }`
                              }
                            >
                              <span className="text-base">{child.icon}</span>
                              <p>{child.title}</p>
                            </NavLink>
                          ))}
                      </div>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `flex gap-3 px-6 py-3 items-center transition 
                      ${
                        isActive
                          ? "bg-[#5b4f47] text-white"
                          : "hover:bg-[#5b4f47] hover:text-white"
                      }`
                    }
                  >
                    <span className="text-lg">{item.icon}</span>
                    <p className="">{item.title}</p>
                  </NavLink>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default SideBar;
