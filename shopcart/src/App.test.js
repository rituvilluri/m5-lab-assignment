import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cart from "./cart";
import Signin from "./signin";
import Checkout from "./checkout";
import DisplayProducts from "./displayProducts";
import { loadProducts } from "./products";

const mockNavigate = jest.fn();

jest.mock(
  "react-router-dom",
  () => ({
    useNavigate: () => mockNavigate,
  }),
  { virtual: true },
);

const cartProduct = {
  id: 1,
  desc: "Unisex Cologne",
  image: "/products/cologne.jpg",
  ratings: 4,
  qty: 1,
};

beforeEach(() => {
  mockNavigate.mockClear();
});

test("empty cart shows dynamic item count and continue shopping button only", () => {
  render(<Cart products={[{ ...cartProduct, qty: 0 }]} />);

  expect(
    screen.getByText("There are 0 items in your cart."),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /continue shop/i }),
  ).toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: /check out/i }),
  ).not.toBeInTheDocument();
});

test("cart with items sends the check out button to sign in", () => {
  render(<Cart products={[cartProduct]} />);

  userEvent.click(screen.getByRole("button", { name: /check out/i }));

  expect(mockNavigate).toHaveBeenCalledWith("/signin");
});

test("sign in offers facebook login and sends user to check out", () => {
  render(<Signin />);

  userEvent.click(screen.getByRole("button", { name: /login with facebook/i }));

  expect(mockNavigate).toHaveBeenCalledWith("/checkout");
});

test("checkout screen welcomes the signed in user", () => {
  render(<Checkout />);

  expect(screen.getByRole("heading", { name: "Check Out" })).toBeInTheDocument();
  expect(screen.getByText("Welcome Back Rich West!")).toBeInTheDocument();
});

test("product data includes prices loaded from the data file", async () => {
  global.fetch = jest.fn().mockResolvedValue({
    text: () =>
      Promise.resolve(`
#1
image: './products/cologne.jpg'
desc: 'Unisex Cologne'
price: 35
value: 0

#2
image: './products/iwatch.jpg'
desc: 'Apple iWatch'
price: 199
value: 0
`),
  });

  const products = await loadProducts();

  expect(products).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ desc: "Unisex Cologne", price: 35 }),
      expect.objectContaining({ desc: "Apple iWatch", price: 199 }),
    ]),
  );
});

test("product list shows prices and sorts by selected price order", () => {
  render(
    <DisplayProducts
      products={[
        {
          id: 1,
          desc: "Unisex Cologne",
          image: "/products/cologne.jpg",
          price: 35,
          ratings: "4.2",
          qty: 0,
        },
        {
          id: 2,
          desc: "Apple iWatch",
          image: "/products/iwatch.jpg",
          price: 199,
          ratings: "3.5",
          qty: 0,
        },
        {
          id: 3,
          desc: "Unique Mug",
          image: "/products/mug.jpg",
          price: 15,
          ratings: "4.8",
          qty: 0,
        },
      ]}
      handleAdd={jest.fn()}
      handleSubtract={jest.fn()}
    />,
  );

  expect(screen.getByText("$35")).toBeInTheDocument();
  expect(screen.getByText("$199")).toBeInTheDocument();

  const productNames = () =>
    screen
      .getAllByRole("heading")
      .map((heading) => heading.textContent.replace(/\s+\$\d+$/, ""));

  userEvent.selectOptions(screen.getByLabelText(/sort price by/i), "lowest");
  expect(productNames()).toEqual(["Unique Mug", "Unisex Cologne", "Apple iWatch"]);

  userEvent.selectOptions(screen.getByLabelText(/sort price by/i), "highest");
  expect(productNames()).toEqual(["Apple iWatch", "Unisex Cologne", "Unique Mug"]);

  userEvent.selectOptions(screen.getByLabelText(/sort price by/i), "normal");
  expect(productNames()).toEqual(["Unisex Cologne", "Apple iWatch", "Unique Mug"]);
});
