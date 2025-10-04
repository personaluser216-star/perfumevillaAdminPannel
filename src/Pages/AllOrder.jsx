import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const AllOrder = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const location = useLocation(); // Get current URL path

  // Convert path to status string
  const status = location.pathname.replace("/", ""); // e.g., "placed-order"

  // Fetch all orders
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(backendUrl + "/order/get");
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Update order status
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/order/update-status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Status updated");
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  // Filter orders based on current URL path
  const filteredOrders = orders.filter((order) => {
    if (!status || status === "order") return true; // "All Orders"
    if (status === "placed-order") return order.status === "Order Placed";
    if (status === "packing-order") return order.status === "Packing";
    if (status === "shipped-order") return order.status === "Shipped";
    if (status === "out-of-delivery-order") return order.status === "Out for delivery";
    if (status === "delivered-order") return order.status === "Delivered";
    return true;
  });

  return (
    <div className="md:mt-28 mt-24">
      <h3 className="text-lg font-semibold my-4">
        {status ? status.replace(/-/g, " ").toUpperCase() : "All Orders"}
      </h3>

      <div>
        {filteredOrders.map((order, index) => (
          <div
            className="grid grid-cols-1 w-80 md:w-auto sm:grid-cols-[1.5fr_2fr_1.5fr_1fr_1fr] gap-4 border-2 border-gray-200 p-5 md:p-6 my-4 text-xs sm:text-sm text-gray-700 items-start"
            key={index}
          >
            {/* Column 1: Icon + Name + Address */}
            <div className="flex items-start gap-3">
              <img src={assets.parcel_icon} alt="parcel" className="w-8 mt-1" />
              <div>
                <p className="font-semibold">
                  {order.address?.firstName} {order.address?.lastName}
                </p>
                <p>{order.address?.street}</p>
                <p>
                  {order.address?.city}, {order.address?.state}, {order.address?.country}, {order.address?.zipcode}
                </p>
                <p className="text-gray-500 text-sm">{order.address?.phone}</p>
              </div>
            </div>

            {/* Column 2: Items */}
            <div>
              <p className="font-semibold mb-1">Items</p>
              {order.items?.map((item, i) => (
                <p key={i}>
                  {item.name} x {item.quantity} <span className="text-gray-500">({item.size})</span>
                </p>
              ))}
            </div>

            {/* Column 3: Payment Info */}
            <div>
              <p className="font-semibold mb-1">Payment</p>
              <p>Method: {order.paymentMethod}</p>
              <p>Status: {order.payment ? " Done" : " Pending"}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            {/* Column 4: Total Amount */}
            <div>
              <p className="font-semibold mb-1">Amount</p>
              <p>${order.amount}</p>
            </div>

            {/* Column 5: Status Select */}
            <div>
              <p className="font-semibold mb-1">Status</p>
              <select
                value={order.status}
                onChange={(event) => statusHandler(event, order._id)}
                className="border px-2 py-1 rounded"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllOrder;
