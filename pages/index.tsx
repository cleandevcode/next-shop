import { connect } from "react-redux";
import { fetchProduct } from "store/actions/product";
import CardContainer from "../components/container";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {useState, useEffect} from 'react';
import { Product } from "typedefs";
import { NextPage } from "next";

const symbols = [
  {
    "text": "USD",
    "symbol": "$"
  },
  {
    "text": "EUR",
    "symbol": "€"
  },
  {
    "text": "JPY",
    "symbol": "¥"
  },
  {
    "text": "GBP",
    "symbol": "£"
  },
]; 

interface Props {
  product: Product[];
}

const LandingPage: NextPage<Props> = ({product}) => {
  const [products, setProducts] = useState(product);
  const [currecy, setCurrency] = useState("USD");

  const [symbol, setSymbol] = useState("$");
  
  useEffect(() => {
    setProducts(product);
  }, [product])

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  
  
  const classes = useStyles();
  
  const handleChange = async (event) => {
    var target = event.target.value;
    setSymbol(symbols.find(x=>x.text === target)?.symbol);

    setCurrency(target);
    const ratio = await (await fetch('https://api.exchangeratesapi.io/latest?base=USD&symbols=EUR,GBP,JPY')).json();

    if(target === "USD") {
      setProducts([...product]);
    }
    else {
      let new_ratio = ratio.rates[target];
      let p = JSON.parse(JSON.stringify(product));
    
      p.forEach(item=>{
        return item.price = (Number(item.price) * new_ratio).toFixed(2);
      });
        setProducts([...p])
      }
  };

  if(products && products.length === 0) {
    return (<h3>No Products</h3>)
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">Currency</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={currecy}
            id="demo-simple-select"
            onChange={handleChange}
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
            <MenuItem value='JPY'>JPY</MenuItem>
            <MenuItem value="GBP">GBP</MenuItem>
          </Select>
      </FormControl>
      <h2 className="title">Products</h2>
      <CardContainer rows={products} symbol={symbol} />
      
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
}

LandingPage.getInitialProps  = async ({ store }) => {
  await store.dispatch(fetchProduct());
};

const mapStateToProps = state => {
  return {
    product: state.product?.product || [],
  };
};

const mapDispatchToProps = { fetchProduct };

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
