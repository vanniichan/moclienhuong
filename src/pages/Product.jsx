import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import { Footer, Navbar } from "../components";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };
  // Hàm fetchProductById sẽ tải dữ liệu từ file data.json và trả về sản phẩm theo id
  async function fetchProductById(id) {
    try {
      // Tải data.json từ thư mục public
      const response = await fetch("/data.json");

      // Kiểm tra nếu phản hồi không thành công
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      // Chuyển đổi JSON thành object
      const products = await response.json();

      // Tìm sản phẩm theo ID (chuyển id từ string sang number để so sánh chính xác)
      const product = products.find((product) => product.id === Number(id));

      // Nếu không tìm thấy, ném lỗi
      if (!product) {
        throw new Error(`Product with ID ${id} not found`);
      }

      return product;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  }

  // Hàm getProductsByCategory sẽ trả về danh sách sản phẩm theo category
  async function getProductsByCategory(category) {
    try {
      // Bước 1: Lấy dữ liệu từ file data.json
      const dataResponse = await fetch("/data.json");
      const data = await dataResponse.json();

      // Bước 2: Kiểm tra nếu có thuộc tính products trong data
      if (data && Array.isArray(data)) {
        // Bước 3: Tìm các sản phẩm có category giống với giá trị đầu vào
        const filteredProducts = data.filter(
          (product) => product.category === category
        );

        // Trả về các sản phẩm lọc được
        return filteredProducts;
      } else {
        throw new Error("Data is not in expected format or products not found");
      }
    } catch (error) {
      // Bắt lỗi và hiển thị thông báo
      console.error("Error:", error);
    }
  }

  // Hàm getProductsByNew sẽ trả về danh sách sản phẩm dựa trên trường "new"
  async function getProductsByNew(isNew) {
    try {
      // Bước 1: Lấy dữ liệu từ file data.json
      const dataResponse = await fetch("/data.json");
      const data = await dataResponse.json();

      // Bước 2: Kiểm tra nếu data là một mảng
      if (data && Array.isArray(data)) {
        // Bước 3: Lọc các sản phẩm có trường "new" giống với giá trị đầu vào
        const filteredProducts = data.filter(
          (product) => product.new === isNew
        );

        // Trả về các sản phẩm lọc được
        return filteredProducts;
      } else {
        throw new Error("Data is not in expected format or products not found");
      }
    } catch (error) {
      // Bắt lỗi và hiển thị thông báo
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      setLoading2(true);
      const response = await fetchProductById(id);
      const data = response;

      setProduct(data);
      setLoading(false);

      const response2 = await getProductsByCategory(data.category);
      const data2 = response2;

      setSimilarProducts(data2);
      setLoading2(false);

      // const response3 = await getProductsByNew(data.new);
      // const data3 = response3;
      // setProduct(data3);
      // setLoading(false);

      // console.log("New Products from data3:", data3);
    };
    getProduct();
  }, [id]);

  const Loading = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 py-3">
              <Skeleton height={400} width={400} />
            </div>
            <div className="col-md-6 py-5">
              <Skeleton height={30} width={250} />
              <Skeleton height={90} />
              <Skeleton height={40} width={70} />
              <Skeleton height={50} width={110} />
              <Skeleton height={120} />
              <Skeleton height={40} width={110} inline={true} />
              <Skeleton className="mx-3" height={40} width={110} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 col-sm-12 py-3">
              <img
                className="img-fluid"
                src={product.image}
                alt={product.title}
                width="400px"
                height="400px"
              />
            </div>
            <div className="col-md-6 col-md-6 py-5">
              <h4 className="text-uppercase text-muted">{product.category}</h4>
              <h1 className="display-5">{product.title}</h1>
              <p className="lead">
                {product.rating && product.rating.rate}{" "}
                <i className="fa fa-star"></i>
              </p>
              <h3 className="display-6  my-4">{product.price}.000 VND</h3>
              <p className="lead">{product.description}</p>
              <button
                className="btn btn-outline-dark"
                onClick={() => addProduct(product)}
              >
                Thêm vào giỏ
              </button>
              <Link to="/cart" className="btn btn-dark mx-3">
                Xem giỏ hàng
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };

  const Loading2 = () => {
    return (
      <>
        <div className="my-4 py-4">
          <div className="d-flex">
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowSimilarProduct = () => {
    return (
      <>
        <div className="py-4 my-4">
          <div className="d-flex">
            {similarProducts.map((item) => {
              return (
                <div key={item.id} className="card mx-4 text-center">
                  <img
                    className="card-img-top p-3"
                    src={item.image}
                    alt="Card"
                    height={300}
                    width={300}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {item.title.substring(0, 15)}...
                    </h5>
                  </div>
                  {/* <ul className="list-group list-group-flush">
                    <li className="list-group-item lead">${product.price}</li>
                  </ul> */}
                  <div className="card-body">
                    <Link
                      to={"/product/" + item.id}
                      className="btn btn-dark m-1"
                    >
                      Mua ngay
                    </Link>
                    <button
                      className="btn btn-dark m-1"
                      onClick={() => addProduct(item)}
                    >
                      Thêm vào giỏ
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
            <h2 className="">You may also Like</h2>
            <Marquee pauseOnHover={true} pauseOnClick={true} speed={150}>
              {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
            </Marquee>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;

