import React from 'react';
import { Footer, Navbar } from "../components";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">About Us</h1>
        <hr />
        <p className="lead text-center">
          Trong bối cảnh cuộc sống hiện đại ngày càng vội vã và không gian sống ngày càng chật hẹp, ô nhiễm, nhu cầu được thư giãn, tận hưởng không gian yên bình trở nên cần thiết hơn bao giờ hết. Mộc Liên Hương mong muốn mang đến giải pháp giúp gia đình bạn có thể thư thái sau những giờ làm việc căng thẳng, có giấc ngủ sâu, tạo nên không gian sống trong lành, dễ chịu. Với dòng sản phẩm nụ hương từ 100% nguyên liệu tự nhiên, chúng tôi không chỉ mang đến hương thơm dịu nhẹ mà còn hỗ trợ cải thiện sức khỏe, góp phần nâng cao chất lượng cuộc sống mỗi ngày.
        </p>
      
        {/* GIF Section */}
        <div className="d-flex justify-content-center my-4">
          <img 
            src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNm0zcDcwaW40b3I0eWkyZ3NiNzhrcHgweDdiZDNuZzhwNHF2NDJoNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/q2c2jy58mDcHggv44p/giphy.gif" 
            alt="About Us GIF" 
            className="img-fluid"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;

