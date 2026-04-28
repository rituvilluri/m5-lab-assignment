import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './App.css';

class SiteHeader extends Component {
  render() {
    const { siteName, totalQuantity } = this.props;

    return (
      <header className="shopcart-header">
        <h1 className="shopcart-title">{siteName}</h1>
        <div className="shopcart-summary" aria-label={`cart summary ${totalQuantity} items`}>
          <FontAwesomeIcon icon={faShoppingCart} className="shopcart-icon" />
          <span>{totalQuantity} items</span>
        </div>
      </header>
    );
  }
}

class ProductRow extends Component {
  handleChange = (event) => {
    const nextValue = Number(event.target.value);
    this.props.onQuantityChange(this.props.product.id, nextValue);
  };

  render() {
    const { product } = this.props;

    return (
      <section className="product-row">
        <h2 className="product-name">{product.desc}</h2>
        <div className="product-details">
          <img className="product-image" src={product.image} alt={product.desc} />
          <div className="quantity-wrap">
            <label className="visually-hidden" htmlFor={`quantity-${product.id}`}>
              {product.desc} quantity
            </label>
            <input
              id={`quantity-${product.id}`}
              className="quantity-input"
              type="number"
              min="0"
              value={product.value}
              onChange={this.handleChange}
            />
            <span className="quantity-label">quantity</span>
          </div>
        </div>
      </section>
    );
  }
}

class App extends Component {
  state = {
    siteName: 'Shop to React',
    products: [
      {
        id: 1,
        desc: 'Unisex Cologne',
        image: './products/cologne.jpg',
        value: 0,
      },
      {
        id: 2,
        desc: 'Apple iWatch',
        image: './products/iwatch.jpg',
        value: 0,
      },
      {
        id: 3,
        desc: 'Unique Mug',
        image: './products/mug.jpg',
        value: 0,
      },
      {
        id: 4,
        desc: 'Mens Wallet',
        image: './products/wallet.jpg',
        value: 0,
      },
    ],
  };

  handleQuantityChange = (productId, nextValue) => {
    const safeValue = Number.isNaN(nextValue) || nextValue < 0 ? 0 : nextValue;

    this.setState(({ products }) => ({
      products: products.map((product) =>
        product.id === productId ? { ...product, value: safeValue } : product
      ),
    }));
  };

  render() {
    const { siteName, products } = this.state;
    const totalQuantity = products.map((product) => product.value).reduce((sum, value) => sum + value, 0);

    return (
      <main className="shopcart-app">
        <div className="shopcart-shell">
          <SiteHeader siteName={siteName} totalQuantity={totalQuantity} />
          <div className="products-list">
            {products.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                onQuantityChange={this.handleQuantityChange}
              />
            ))}
          </div>
        </div>
      </main>
    );
  }
}

export default App;
