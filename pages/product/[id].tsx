import { connect } from "react-redux";
import { fetchProduct } from "store/actions/product";
import { useRouter } from "next/router";
import Router from "next/router";
import { Product } from "typedefs";
import { Button } from "@material-ui/core";

const productPage = ({ product }: { product: Product }) => {
  return (
    <div>
      <h2 className="title">{product.title}</h2>
      <div className="details">
        <div className="datapoint">Price: {product.price}</div>
        
      </div>
      <Button
        onClick={() => Router.back()}
        color="secondary"
        variant="outlined"
      >
        {"< Go Back"}
      </Button>
      <style jsx>{`
        * {
          color: #fff;
          font-family: Roboto;
        }
        .title {
          margin: 20px auto;
          font-size: 32px;
        }
        .tag {
          margin: 20px auto;
          font-size: 18px;
        }
        .datapoint {
          font-size: 18px;
          margin-top: 10px;
        }
        .address {
          margin-top: 20px;
        }
        .address div {
          font-size: 14px;
        }
        .details {
          margin-bottom: 30px;
        }
      `}</style>
    </div>
  );
};

productPage.getInitialProps = async ({ store }) => {
  await store.dispatch(fetchProduct());
};

const mapStateToProps = state => {
  const router = useRouter();
  const { id } = router.query;
  return {
    product: state.product?.product?.filter(p => String(p.id) === id)[0]
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(productPage);
