import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";

const Dashboard = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState(0);
  const [users, setUsers] = useState(0);
  const [revenue, setRevenue] = useState(0);

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      const res = await axios.get(backendUrl + "/order/get", { headers: { token } });
      if (res.data.success) {
        setOrders(res.data.orders);
        const totalRevenue = res.data.orders.reduce((acc, order) => acc + order.amount, 0);
        setRevenue(totalRevenue);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch products count
  const fetchProducts = async () => {
    try {
      const res = await axios.get(backendUrl + "/product/get", { headers: { token } });
      if (res.data.success) setProducts(res.data.products.length);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch users count
  const fetchUsers = async () => {
    try {
      const res = await axios.get(backendUrl + "/order/get", { headers: { token } });
      if (res.data.success) setUsers(res.data.orders.length);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchProducts();
    fetchUsers();
  }, [token]);

  // Prepare data for charts
  const ordersByDay = orders.reduce((acc, order) => {
    const day = new Date(order.date).toLocaleDateString("en-US", { weekday: "short" });
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});
  const lineData = Object.keys(ordersByDay).map((day) => ({ day, orders: ordersByDay[day] }));

  const statusCount = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});
  const pieData = Object.keys(statusCount).map((status) => ({ name: status, value: statusCount[status] }));
  const COLORS = ["#5b4f47", "#FFA500", "#00C49F", "#FF8042", "#8884d8"];

  return (
    <div className="md:mt-28 mt-24 md:px-6">
   

      {/* Stats Cards */}
      <div className="grid w-full grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 md:gap-6 gap-3">
        <div className="bg-white p-5 w-80  -lg shadow flex justify-between items-center">
          <div>
            <p className="text-gray-500">Total Orders</p>
            <h2 className="text-2xl font-bold">{orders.length}</h2>
          </div>
          <div className="text-3xl text-[#5b4f47]">🛒</div>
        </div>

       

        <div className="bg-white p-5 w-80 -lg shadow flex justify-between items-center">
          <div>
            <p className="text-gray-500">Products</p>
            <h2 className="text-2xl font-bold">{products}</h2>
          </div>
          <div className="text-3xl text-blue-500">📦</div>
        </div>

        <div className="bg-white p-5 w-80 -lg shadow flex justify-between items-center">
          <div>
            <p className="text-gray-500">Users</p>
            <h2 className="text-2xl font-bold">{users}</h2>
          </div>
          <div className="text-3xl text-purple-500">👤</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Line Chart */}
        <div className="bg-white p-6 w-80  md:w-auto -lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Orders This Week</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid stroke="#f0f0f0" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="#5b4f47" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 w-80 md:w-auto -lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Orders by Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
     
    </div>
  );
};

export default Dashboard;
