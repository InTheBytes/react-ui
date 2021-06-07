import {render, screen, fireEvent} from "@testing-library/react";
import Login from "./Login";
import Register from "./Register";

describe('Login', () => {
	test('fields displayed & functional', () => {
		const onSubmit = jest.fn(e => e.preventDefault());
		render(<Login onSubmit={onSubmit} />);

		const user = screen.getByLabelText( "username")
			, pass = screen.getByLabelText( "password")
			, btn = screen.getByText( "Login");

		expect(user).toBeTruthy();
		expect(pass).toBeTruthy();
		expect(btn).toBeTruthy();

		fireEvent.click(btn);

		expect(onSubmit).toHaveBeenCalled();
	});
});

describe('Register', () => {
	test('fields displayed & functional', () => {
		const onSubmit = jest.fn(e => e.preventDefault());
		render(<Register onSubmit={onSubmit} />);

		const user = screen.getByLabelText( "Username *")
			, email = screen.getByLabelText( "Email *")
			, pass = screen.getByLabelText( "Password *")
			, conPass = screen.getByLabelText( "Confirm Password *")
			, fullName = screen.getByLabelText( "Full Name *")
			, phone = screen.getByLabelText( "Phone *")
			, address = screen.getByLabelText( "Address *")
			, city = screen.getByLabelText( "City *")
			, state = screen.getByLabelText( "State *")
			, zip = screen.getByLabelText( "Zip Code *")
			, btn = screen.getByText( "Register");

		expect(user).toBeTruthy();
		expect(email).toBeTruthy();
		expect(pass).toBeTruthy();
		expect(conPass).toBeTruthy();
		expect(fullName).toBeTruthy();
		expect(phone).toBeTruthy();
		expect(address).toBeTruthy();
		expect(city).toBeTruthy();
		expect(state).toBeTruthy();
		expect(zip).toBeTruthy();
		expect(btn).toBeTruthy();

		fireEvent.click(btn);

		expect(onSubmit).toHaveBeenCalled();
	});
});