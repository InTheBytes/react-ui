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