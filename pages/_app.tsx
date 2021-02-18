import App from "next/app";
import Head from "next/head";
import css from "styled-jsx/css";
import { Provider } from "react-redux";
import React from "react";
import withRedux from "next-redux-wrapper";
import store from "../store";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return {
      pageProps
    };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <BasicHTML>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </BasicHTML>
    );
  }
}

const BasicHTML = ({ children }) => (
  <>
    <Head>
      <title>Demo Site</title>
      <meta {...({ charSet: "UTF-8" } as any)} />
      <meta name="description" content="Bootstrap Site Project" />
      <meta name="keywords" content="Nextjs, React, Redux, TypeScript" />
      <meta name="author" content="William Dung" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
    </Head>
    {children}
    <style jsx global>
      {globalCSS}
    </style>
  </>
);

const globalCSS = css.global`
  body {
    padding: 10px;
    background: #F0EEE4;
  }
  .carousel .slide {
    background:  unset;
  }
  .carousel .slide img {
    width: 400px;
  }
  @media only screen and (max-width: 768px) {
    .carousel .slide img {
      width: 100%;
    }
  }
  .carousel .carousel-status {
    display: none;
  }
`;

// Change callback to customize store for every request
export default withRedux(() => store)(MyApp);
