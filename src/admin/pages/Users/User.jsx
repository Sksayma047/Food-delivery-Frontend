import { useEffect, useState } from "react";
import "./User.css";
import { url } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const User = () => {
  const [User, setUser] = useState([]);

  const fetchUser = async () => {
    const response = await axios.get(`${url}/api/user/all-user`);
    if (response.data.success) {
      setUser(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="User add flex-col">
      <p>All User</p>
      <div className="User-table">
        <div className="User-table-format title">
          <b>Name</b>
          <b>Email</b>

    
        </div>
        {User.map((item, index) => {
          return (
            <div key={index} className="User-table-format">
              <p>{item.name}</p>
              <p>{item.email}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default User;
