import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import OrderDetails from "./OrderDetails";
import OrderHistory from "./OrderHistory";
import OrderListing from "./OrderListing";

const order = (id) => {
  return {
    id: `id-${id}`,
    status: "0 - CREATED",
    destination: location("home", "CS"),
    restaurant: {
      name: `Test Restaurant ${id}`,
      location: location("restaurant", "RS"),
    },
    items: [
      {
        food: "id-123",
        quantity: 2,
        name: "Burger",
        price: 5,
      },
    ],
    windowStart: Date.now(),
    windowEnd: Date.now() + 60 * 60 * 1000,
  };
};

const orderPage = (page, total) => {
  return {
    content: [order(page * page), order(page * page + 1)],
    page: page,
    totalPages: total,
  };
};

const location = (address, state) => {
  return {
    unit: "Test",
    street: address,
    city: "Test",
    state: state,
    zipCode: 11111,
  };
};

function checkForText(text) {
  expect(screen.getByText(text, { exact: false })).toBeTruthy();
}
function checkListOfText(args) {
  args.map((str) => checkForText(str));
}

describe("Order Listing", () => {
  test("render listing information", () => {
    render(<OrderListing order={order(1)} />);
    const text = ["Test Restaurant 1", "Test home", "Test, CS 11111", "10"];
    checkListOfText(text);
  });
});

describe("Order History", () => {
  const mockGet = (page) => {
    return rest.get(
      `${process.env.REACT_APP_SL_API_URL}/order`,
      (req, res, ctx) => {
        const query = req.url.searchParams;
        const page = query.get("page");
        return res(ctx.json(orderPage(page, 10)));
      }
    );
  };
  const server = setupServer(mockGet(0), mockGet(1), mockGet(2), mockGet(3));

  beforeAll(() => server.listen());
  beforeEach(() => render(<OrderHistory auth="token" />));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("render history list", async () => {
    await waitFor(() => screen.getByText("Test Restaurant 0"));
    const text = ["Test Restaurant 0", "Test Restaurant 1", "5"];
    checkListOfText(text);
  });

  test("change orders page", async () => {
    await waitFor(() => screen.getByText("2"));
    const nextPage = screen.getByText("2");
    const pageAfter = screen.getByText("3");
    expect(nextPage).toBeTruthy();
    expect(pageAfter).toBeTruthy();

    fireEvent.click(nextPage);
    await waitFor(() => screen.getByText("Test Restaurant 2"));
    checkListOfText(["Test Restaurant 1", "Test Restaurant 2"]);
    fireEvent.click(pageAfter);
    await waitFor(() => screen.getByText("Test Restaurant 4"));
    checkListOfText(["Test Restaurant 4", "Test Restaurant 5"]);
  });

  test("opens detail dialog", async () => {
    await waitFor(() => screen.getByText("Test Restaurant 0"));
    const topOrder = screen.getByText("Test Restaurant 0");
    expect(topOrder).toBeTruthy();

    fireEvent.click(topOrder);
    await waitFor(() => screen.findByText("Burger"));
    checkListOfText(["Burger", "x2"]);
    const prices = screen.getAllByText("$10.00");
    expect(prices).toBeTruthy();
  });
});

describe("Order Details", () => {
  test("render detail information", () => {
    const onClose = jest.fn((e) => e.preventDefault());
    render(<OrderDetails open={true} close={onClose} order={order(1)} />);
    checkListOfText([
      "Test Restaurant 1",
      "Created",
      "Test home",
      "Test, CS 11111",
      "Burger",
      "x2",
      "$10",
      "Okay"
    ]);
    fireEvent.click(screen.getByText("Okay"));
    expect(onClose).toHaveBeenCalled();
  });
});
