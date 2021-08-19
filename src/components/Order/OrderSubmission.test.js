import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import moment from 'moment';
import axios from'axios';
import { InProgressOrder } from "./InProgressOrder";

describe("Order Tracking Page", () => {
    
    const makeOrder = (status) => {
        let codes = ["CREATED", "PAID", "DELIVERY STARTED", "DELIVERY IN TRANSIT", "COMPLETE", "CANCELLED"]
        return {data: {
            id: "order-id",
            status: `${status} - ${codes[status]}`,
            restaurant: {name: "Lexi's Bistro"},
            windowStart: moment().subtract(1, 'hours'),
            windowEnd: moment(),
            driver: {name: "Lexi Driver"},
            items: [
                {quantity: 1, name: "Burger", price: 3.5},
                {quantity: 2, name: "Fries", price: 1},
                {quantity: 3, name: "Soup", price: 1}
            ]
        }}
    }

    test("Should display info and status text", async () => {
        let axiosSpy = jest.spyOn(axios, "get").mockReturnValue(Promise.resolve(makeOrder(5)))
        render(<InProgressOrder auth={"token"} id={"order-id-5"}/>)
        await waitFor(() => expect(axiosSpy).toHaveBeenCalled())
        await waitFor(() => screen.getByText("Order has been cancelled"))
        const title = screen.getByText("Order has been cancelled")
        const info = screen.getByText("Lexi's Bistro", {exact: false})
        const foodItem1Qty = screen.getByText("1")
        const foodItem1Name = screen.getByText("Burger")
        const foodItem1Price = screen.getByText("$3.50")
        const foodItem2Qty = screen.getByText("2")
        const foodItem2Name = screen.getByText("Fries")
        const foodItem2Price = screen.getByText("$2.00")
        const foodItem3Qty = screen.getByText("3")
        const foodItem3Name = screen.getByText("Soup")
        const foodItem3Price = screen.getByText("$3.00")
        expect(title).toBeTruthy()
        expect(info).toBeTruthy()
        expect(foodItem1Qty).toBeTruthy()
        expect(foodItem1Name).toBeTruthy()
        expect(foodItem1Price).toBeTruthy()
        expect(foodItem2Qty).toBeTruthy()
        expect(foodItem2Name).toBeTruthy()
        expect(foodItem2Price).toBeTruthy()
        expect(foodItem3Qty).toBeTruthy()
        expect(foodItem3Name).toBeTruthy()
        expect(foodItem3Price).toBeTruthy()
    })

    test("Should display order submitted title", async () => {
        let axiosSpy = jest.spyOn(axios, "get").mockReturnValue(Promise.resolve(makeOrder(1)))
        render(<InProgressOrder auth={"token"} id={"order-id-1"}/>)
        await waitFor(() => expect(axiosSpy).toHaveBeenCalled())
        await waitFor(() => screen.getByText("Your order has been sent"))
        expect(screen.getByText("Your order has been sent")).toBeTruthy()
    })

    test("Should display order ready title", async () => {
        let axiosSpy = jest.spyOn(axios, "get").mockReturnValue(Promise.resolve(makeOrder(2)))
        render(<InProgressOrder auth={"token"} id={"order-id-2"}/>)
        await waitFor(() => expect(axiosSpy).toHaveBeenCalled())
        let title = "Your order is ready"
        await waitFor(() => screen.getByText(title))
        expect(screen.getByText(title)).toBeTruthy()
    })

    test("Should display order ready title", async () => {
        let axiosSpy = jest.spyOn(axios, "get").mockReturnValue(Promise.resolve(makeOrder(3)))
        render(<InProgressOrder auth={"token"} id={"order-id-3"}/>)
        await waitFor(() => expect(axiosSpy).toHaveBeenCalled())
        let title = "Lexi is on their way with your order!"
        await waitFor(() => screen.getByText(title))
        expect(screen.getByText(title)).toBeTruthy()
    })

    test("Should display order ready title", async () => {
        let axiosSpy = jest.spyOn(axios, "get").mockReturnValue(Promise.resolve(makeOrder(4)))
        render(<InProgressOrder auth={"token"} id={"order-id-4"}/>)
        await waitFor(() => expect(axiosSpy).toHaveBeenCalled())
        let title = "Lexi has arrived with your order!"
        await waitFor(() => screen.getByText(title))
        expect(screen.getByText(title)).toBeTruthy()
    })
})