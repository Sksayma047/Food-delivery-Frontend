import { useEffect, useState } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets, url, currency } from "../../assets/assets";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [soldItems, setSoldItems] = useState([]);
  console.log(soldItems);
  const fetchAllOrders = async () => {
    const response = await axios.get(`${url}/api/order/list`);
    if (response.data.success) {
      const reversedOrders = response.data.data.reverse();
      setOrders(reversedOrders);
      calculateTopSelling(reversedOrders); // Call counting function
    } else {
      toast.error("Error");
    }
  };

  const calculateTopSelling = (orders) => {
    const foodSales = {};

    orders.forEach((order) => {
      order.items.forEach((item) => {
        const foodId = item._id;
        const quantity = item.quantity || 1;

        if (foodSales[foodId]) {
          foodSales[foodId].count += quantity;
        } else {
          foodSales[foodId] = {
            name: item.name,
            count: quantity,
            image: item.image,
          };
        }
      });
    });

    const sorted = Object.entries(foodSales)
      .map(([id, value]) => ({ id, ...value }))
      .sort((a, b) => b.count - a.count);

    setSoldItems(sorted);
  };

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(`${url}/api/order/status`, {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>

      <div className="top-selling-box">
        <h4>🔥 Top Selling Foods</h4>
        <ul >
          {soldItems.map((item) => (
            <li className="" key={item.id}>
              <img
                src={`${url}/images/${item.image}`}
                alt={item.name}
                className="top-selling-img"
              />
              {item.name} - {item.count} sold
            </li>
          ))}
        </ul>
      </div>

      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>
              {currency}
              {order.amount}
            </p>
            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
