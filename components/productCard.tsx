import React from 'react';
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Link from "next/link";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: { 
      width: "100%",
    },
    cardGrid: {
      padding: theme.spacing(0.5),
    },
    media: {
      height: 250,
      marginTop: 20,
      backgroundSize: 'contain'
    },
    card: {
      height: "100%",
      display: "flex",
      flexDirection: "column",

    },
    cardMedia: {
      paddingTop: "56.25%", // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
  })
);

export default function ProductCard({ row, symbol, currency }) {
    const classes = useStyles();
    
    return (
      <Grid item lg={3} md={4} sm={6} xs={12} className={classes.cardGrid} >
        <Link key={row.id} href={`/product/${row.id}?currency=${currency}`}>
         <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={row.image}
              title={row.title}
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="body1" component="h6">
                {row.title}
              </Typography>
              <Typography variant="body2" color="error" component="p">
               {symbol} {row.price}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        </Link>
      </Grid>
    )
}