import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

const fetchAllOrders = async () => {
  try {
    const response = await axios.get(backendUrl + "/order/get");
    console.log(response)
    if (response.data.success) {
      setOrders(response.data.orders);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};



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
    console.log(error);
    toast.error("Failed to update status");
  }
};

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3 className="text-lg font-semibold my-4">Order Page</h3>
      <div>
        {orders.map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[1.5fr_2fr_1.5fr_1fr_1fr] gap-4 border-2 border-gray-200 p-5 md:p-6 my-4 text-xs sm:text-sm text-gray-700 items-start"
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
                  {order.address?.city}, {order.address?.state},{' '}
                  {order.address?.country}, {order.address?.zipcode}
                </p>
                <p className="text-gray-500 text-sm"> {order.address?.phone}</p>
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
              <p>Status: {order.payment ? ' Done' : ' Pending'}</p>
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
              <select value={order.status} 
              onChange={(event)=>statusHandler(event,order._id)}
              className="border px-2 py-1 rounded">
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

export default Orders;
