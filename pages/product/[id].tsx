import { connect } from "react-redux";
import { fetchProduct } from "store/actions/product";
import { useRouter } from "next/router";
import Router from "next/router";
import { Product } from "typedefs";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {useEffect, useState} from 'react';

const symbols: any = [
  {
    text: "USD",
    symbol: "$"
  },
  {
    text: "EUR",
    symbol: "€"
  },
  {
    text: "JPY",
    symbol: "¥"
  },
  {
    text: "GBP",
    symbol: "£"
  },
]; 


const productPage = ({ product }: { product: Product }) => {
  const router = useRouter();
  const currency_temp: any  = router.query.currency;
  const [updatePrice, setPrice] = useState(0);
  const symbol = symbols.find(x=>x.text == currency_temp)?.symbol;

  useEffect(()=> {
    fetch('https://api.exchangeratesapi.io/latest?base=USD&symbols=EUR,GBP,JPY').then(res=>res.json()).then(res=>{

      let ratio = currency_temp === "USD" ? 1 : res.rates[currency_temp];
      setPrice((Number(product.price) * ratio));
    })
  },[]);
  
  return (
    <>
      <Button
        onClick={() => Router.back()}
        color="secondary"
      >
        {"< Go Back"}
      </Button>
      <div className="container">
        <Grid className="imageContainer" lg={6} xs={12} style={{textAlign: 'center'}} >
          <img src={product.image} className="image" />
        </Grid>
        <Grid item lg={6} xs={12}>
          <h2 className="title">{product.title}</h2>
          <h5 className="" >{product.description}</h5>
          <div className="details">
            <div className="datapoint">Price:  {symbol}{updatePrice.toFixed(2)}</div>
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
            text-align: center;
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
