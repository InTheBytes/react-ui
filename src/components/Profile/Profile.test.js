import { act, render, screen, waitFor } from "@testing-library/react";
import Profile from "./Profile";
import ProfileDetails from "./ProfileDetails";
import axios from 'axios';

const profile = (active) => {
    return {
        userId: "id",
        username: "TestUser",
        email: "test@email.test",
        phone: "0008675309",
        firstName: "Test",
        lastName: "User",
        isActive: active
    };
}

describe("Profile View", () => {

    test("Should send API call for profile", () => {   
        const spyGet = jest.spyOn(axios, 'get');
        render(<Profile auth="token" />);
        expect(spyGet).toHaveBeenCalled();
    });
    

    test("Should render edit buttons", () => {
        jest.mock('axios');
        axios.get.mockImplementation(() => Promise.resolve(profile(true))) 
        render(<Profile auth="token" />);
        const contact = screen.getByText("contact information", {exact: false});
        const pass = screen.getByText("password", {exact: false});
        expect(contact).toBeTruthy();
        expect(pass).toBeTruthy();
        let buttons = screen.getAllByRole("button");
        buttons = buttons.map((element) => element.innerText);
        expect(buttons).toContain(contact.innerText);
        expect(buttons).toContain(pass.innerText);
    });
});

describe("Profile Details", () => {

    test("Should render name and username in title", () => {
        render(<ProfileDetails profile={profile(true)} />);
        const name = screen.getByText("Test User");
        const username = screen.getByText("TestUser");
        expect(name).toBeTruthy();
        expect(username).toBeTruthy();
    });

    // test("Should render contact information", () => {
    //     render(<ProfileDetails profile={profile(true)} />);
    //     const phone = screen.getByLabelText(/phone/i);
    //     const email = screen.getByLabelText(/email/i);
    //     expect(phone).toEqual("0008675309");
    //     expect(email).toEqual("test@email.test");
    // });
});

// describe("Profile Error Views", () => {
//     const checkPage = async (tokenVal) => {
//         render(<Profile auth={tokenVal} />);
//         const page404 = await waitFor(() => screen.getByText(/not found/i));
//         expect(page404).toBeTruthy();
//     }

//     test("Should redirect to 404 for deactivated account", async () => {
//         checkPage("deactivated");
//     });

//     test("Should redirect to 404 if account not found", async () => {
//         checkPage("not-a-user");
//     });
// })