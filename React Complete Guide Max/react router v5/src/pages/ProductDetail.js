import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { productId } = useParams();
  return (
    <div>
      <h1>Product Detail</h1>
      <h2>{productId}</h2>
    </div>
  );
};

export default ProductDetail;
