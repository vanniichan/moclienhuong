import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { useLocation } from "react-router-dom";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FilterByPrice } from "../components";
import { Dropdown } from "../components";

const Products = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };
  // Ham tim kiem san pham theo ten
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search") || "";
    setSearchTerm(searchQuery);
  }, [location.search]);

  // Filter products whenever searchTerm changes
  useEffect(() => {
    if (searchTerm.trim()) {
      const updatedList = data.filter((item) =>
        item.title
          .substring(0, 12)
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilter(updatedList);
    } else {
      setFilter(data); // Reset to all products if no search term
    }
  }, [searchTerm, data]);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);

      const response = await fetch("../data.json");
      // const response = await fetch("https://fakestoreapi.com/products/");

      if (componentMounted) {
        setData(await response?.clone()?.json());
        setFilter(await response?.json());
        setLoading(false);
      }

      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  const filterProductNew = (Inew) => {
    const updatedList = data.filter((item) => item.new === Inew);
    setFilter(updatedList);
  };

  const filterProductsByPrice = (min, max) => {
    const updatedList = data.filter(
      (data) => data.price >= min && data.price <= max
    );
    setFilter(updatedList); // Cập nhật danh sách sản phẩm được hiển thị
  };

  const sortProductsByPrice = (order) => {
    const sortedProducts = [...filter];

    if (order === "asc") {
      // Sắp xếp theo giá từ thấp đến cao
      sortedProducts.sort((a, b) => a.price - b.price);
    } else {
      // Sắp xếp theo giá từ cao đến thấp
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setFilter(sortedProducts);
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons flex items-center text-center py-5">
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("trial product")}
          >
            Trial Product
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("box of 20 cones")}
          >
            Box of 20 cones
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("box of 40 cones")}
          >
            Box of 40 cones
          </button>
          <Dropdown sortProductsByPrice={sortProductsByPrice} />;
          <FilterByPrice filterProductsByPrice={filterProductsByPrice} />
        </div>

        {filter.map((product) => {
          return (
            <div
              id={product.id}
              key={product.id}
              className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
            >
              <div className="card text-center h-100" key={product.id}>
                <img
                  className="card-img-top p-3"
                  src={product.image}
                  alt="Card"
                  height={300}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {product.title.substring(0, 12)}...
                  </h5>
                  <p className="card-text">
                    {product.description.substring(0, 90)}...
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">{product.price}.000 VND</li>                  
                  <li className="list-group-item">
                    Category: {product.category}{" "}
                  </li>
                </ul>
                <div className="card-body">
                  <Link
                    to={"/product/" + product.id}
                    className="btn btn-dark m-1"
                  >
                    Buy Now
                  </Link>
                  <button
                    className="btn btn-dark m-1"
                    onClick={() => {
                      toast.success("Added to cart");
                      addProduct(product);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };
  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Our Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;

