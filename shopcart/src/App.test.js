import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cart from "./cart";
import Signin from "./signin";
import Checkout from "./checkout";

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
