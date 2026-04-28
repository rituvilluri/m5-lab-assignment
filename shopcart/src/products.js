// products.js
// This file loads and parses the product data from public/data.txt.
// It also adds ratings in JavaScript so data.txt can stay unchanged.

export async function loadProducts() {
  const response = await fetch("/data.txt");
  const text = await response.text();
  return parseProducts(text);
}

function parseProducts(text) {
  const lines = text.split("\n");
  const items = [];
  let currentProduct = null;

  // Ratings added here instead of editing data.txt
  const ratingsByDesc = {
    "Unisex Cologne": "4.2",
    "Apple iWatch": "3.5",
    "Unique Mug": "4.8",
    "Mens Wallet": "4.0",
  };

  lines.forEach((line) => {
    line = line.trim();

    // Start a new product when we hit #1, #2, etc.
    if (line.startsWith("#")) {
      if (currentProduct) {
        // Add ratings before saving product
        currentProduct.ratings = ratingsByDesc[currentProduct.desc] || "0.0";
        items.push(currentProduct);
      }

      currentProduct = {
        id: items.length + 1,
        image: "",
        desc: "",
        value: 0,
        qty: 0,
        ratings: "",
      };
    }

    // Read image path
    if (line.startsWith("image:")) {
      let img = line.split(":")[1].trim().replace(/'/g, "");
      img = img.replace("./", "/"); // convert ./products/x.jpg to /products/x.jpg
      currentProduct.image = img;
    }

    // Read description
    if (line.startsWith("desc:")) {
      currentProduct.desc = line.split(":")[1].trim().replace(/'/g, "");
    }

    // Read value
    if (line.startsWith("value:")) {
      currentProduct.value = Number(line.split(":")[1].trim());
    }
  });

  // Push the last product
  if (currentProduct) {
    currentProduct.ratings = ratingsByDesc[currentProduct.desc] || "0.0";
    items.push(currentProduct);
  }

  return items;
}
