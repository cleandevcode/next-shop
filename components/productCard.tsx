import React from "react";
import Link from "next/link";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      width: "100%",
      marginBottom: theme.spacing(2)
    },
    table: {
      minWidth: 650
    }
  })
);

export default function ProductCard({ rows }) {
    const classes = useStyles();

    return (

    )
}