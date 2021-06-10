import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import App from './App';

describe('Navigation Bar', () => {
	test('side bar menu show up when button is clicked', () => {
		render(<App />);

		const menuButton = screen.getByLabelText('menu');

		fireEvent.click(menuButton);

		expect(screen.getByText("Home")).toBeTruthy();
		expect(screen.getByText("About Us")).toBeTruthy();
		expect(screen.getByText("Join StackLunch")).toBeTruthy();
		expect(screen.getByText("Search Our Menu")).toBeTruthy();
		expect(screen.getByText( "Contact")).toBeTruthy();
	});

	test('logged out account button', () => {
		render(<App />);

		const accountButton = screen.getByLabelText('account');

		fireEvent.click(accountButton);

		expect(screen.getByText("Login")).toBeTruthy();
		expect(screen.getByText("Sign Up")).toBeTruthy();
	});
});