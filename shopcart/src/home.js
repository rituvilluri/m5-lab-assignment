// home.js
// Home page component that renders DisplayProducts.

import React from "react";
import DisplayProducts from "./displayProducts";

function Home({ products, handleAdd, handleSubtract }) {
  return (
    <DisplayProducts
      products={products}
      handleAdd={handleAdd}
      handleSubtract={handleSubtract}
    />
  );
}

export default Home;
