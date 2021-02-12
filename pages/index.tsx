import { connect } from "react-redux";
import { selectPerson, fetchProduct } from "store/actions/product";
import CardContainer from "../components/container";

const LandingPage = ({ product }) => (
  <div>
    <h2 className="title">Products</h2>
    <CardContainer rows={product} />
    
    <style jsx>{`
      .title {
        font-family: Roboto;
        margin: 20px auto;
        text-align: center;
        font-size: 32px;
      }
      .cards-container {
        display: 'flex';
      }
    `}</style>
  </div>
);

LandingPage.getInitialProps = async ({ store }) => {
  await store.dispatch(fetchProduct());
};

const mapStateToProps = state => {
  return {
    product: state.product?.product || [],
    selectedPerson: state.product.selectedPerson
  };
};

const mapDispatchToProps = { selectPerson, fetchProduct };

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
