import React from "react";
import { useAuth } from "../AuthContext"; // Sử dụng AuthContext
import { Link } from "react-router-dom";
import { Footer, Navbar } from "../components";

const Profile = () => {
  const { loginStatus } = useAuth(); // Lấy trạng thái đăng nhập từ context

  // Kiểm tra nếu chưa đăng nhập, điều hướng về trang đăng nhập
  if (!loginStatus) {
    return (
      <div className="container text-center my-5">
        <h2>You are not logged in</h2>
        <p>
          Please <Link to="/login">login</Link> to view your profile.
        </p>
      </div>
    );
  }

  // Dữ liệu giả định của người dùng
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    profilePicture: "../../public/assets/Avata.jpg", // Ảnh đại diện giả
  };

  // Dữ liệu giả về các sản phẩm đã mua
  const purchaseHistory = [
    {
      id: 1,
      name: "Old Jacket",
      price: "20$",
      new: "90%",
      status: "Delivered",
    },
    {
      id: 2,
      name: "Angle Ring",
      price: "225$",
      new: "99%",
      status: "Pending",
    },
    {
      id: 3,
      name: "Laptop",
      price: "10$",
      new: "95%",
      status: "Delivered",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h1 className="text-center mb-4">User Profile</h1>
        <div className="row">
          <div className="col-md-4 text-center">
            <i
              className="fa fa-user-circle fa-5x"
              style={{ color: "#6c757d" }}
            ></i>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
          <div className="col-md-8">
            <h4>Profile Information</h4>
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Name:</strong> {user.name}
              </li>
              <li className="list-group-item">
                <strong>Email:</strong> {user.email}
              </li>
            </ul>
            <div className="mt-3">
              <Link to="/edit-profile" className="btn btn-warning">
                Edit Profile
              </Link>
            </div>
            <h4 className="mt-5">Purchase History</h4>
            <table className="table table-bordered mt-3">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th>New</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {purchaseHistory.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.new}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
