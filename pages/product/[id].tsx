import { connect } from "react-redux";
import { fetchProduct } from "store/actions/product";
import { useRouter } from "next/router";
import Router from "next/router";
import { Product } from "typedefs";
import { Button, FormHelperText } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: 'wrap',
      backgroundColor: '#fff',
      padding: 25
    },
    imageContainer: {
      textAlign: 'center'
    },
    image: {
      height: 400,
      backgroundSize: 'contain'
    }
  })
);

const productPage = ({ product }: { product: Product }) => {
  const classes = useStyles();

  return (
    <>
    <Button
        onClick={() => Router.back()}
        color="secondary"
      >
        {"< Go Back"}
      </Button>
    <div className="container">
      
      <Grid item lg={6} xs={12} className="imageContainer">
        <img src={product.image} className="image" />
      </Grid>
      <Grid item lg={6} xs={12}>
        
        <h2 className="title">{product.title}</h2>
        <h5 className="" >{product.description}</h5>
        <div className="details">
          <div className="datapoint">Price: {product.price}</div>
          <div className="datapoint">Category: {product.category}</div>
          
        </div>
        
        
      </Grid>
    
    </div>
    <style jsx>{`
          * {
            font-family: Roboto;
          }
          .container {
            padding: 25px;
            display: flex;
            flex-wrap: wrap;
            background: white;
          }
          .imageContainer {
            text-align: center
          }
          .image {
            height: 400px;
            background-size: contain;
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
    </>
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
