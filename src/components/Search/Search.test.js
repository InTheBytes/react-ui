import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import Search from "./Search";

describe('Search Route', () => {
	test('search bar', () => {
		render(<Search />);

		expect(screen.getByLabelText( "Search")).toBeTruthy();
	});
});

describe('Side Filter', () => {
	test('sort buttons are displayed', () => {
		render(<Search />);

		expect(screen.getByLabelText("Low to High")).toBeTruthy();
		expect(screen.getByLabelText("High to Low")).toBeTruthy();
		expect(screen.getByLabelText("Star Rating")).toBeTruthy();
	});

	test('sort buttons are grouped', () => {
		render(<Search />);

		const lth = screen.getByLabelText("Low to High")
			, htl = screen.getByLabelText("High to Low")
			, sr = screen.getByLabelText("Star Rating");

		fireEvent.click(lth);
		expect(lth).toBeChecked();
		expect(htl).not.toBeChecked();
		expect(sr).not.toBeChecked();

		fireEvent.click(htl);
		expect(lth).not.toBeChecked();
		expect(htl).toBeChecked();
		expect(sr).not.toBeChecked();

		fireEvent.click(sr);
		expect(lth).not.toBeChecked();
		expect(htl).not.toBeChecked();
		expect(sr).toBeChecked();
	});

	test('price filter buttons are displayed', () => {
		render(<Search />);

		const moneySymbol = "attach_money";

		expect(screen.getByLabelText(moneySymbol)).toBeTruthy();
		expect(screen.getByLabelText(moneySymbol.repeat(3))).toBeTruthy();
	});

	test('rating filter buttons are displayed', () => {
		render(<Search />);

		const starSymbol = "star_rate";

		expect(screen.getByLabelText(starSymbol)).toBeTruthy();
		expect(screen.getByLabelText(starSymbol.repeat(2))).toBeTruthy();
		expect(screen.getByLabelText(starSymbol.repeat(3))).toBeTruthy();
		expect(screen.getByLabelText(starSymbol.repeat(4))).toBeTruthy();
		expect(screen.getByLabelText(starSymbol.repeat(5))).toBeTruthy();
	});

	test('price filter buttons are grouped', () => {
		render(<Search />);

		const moneySymbol = "attach_money";

		const money1 = screen.getByLabelText(moneySymbol)
			, money3 = screen.getByLabelText(moneySymbol.repeat(3));

		fireEvent.click(money1);
		expect(money1).toBeChecked();
		expect(money3).not.toBeChecked();

		fireEvent.click(money3);
		expect(money1).not.toBeChecked();
		expect(money3).toBeChecked();
	});

	test('rating filter buttons are grouped', () => {
		render(<Search />);

		const starSymbol = "star_rate";

		const money1 = screen.getByLabelText(starSymbol)
			, money2 = screen.getByLabelText(starSymbol.repeat(2))
			, money3 = screen.getByLabelText(starSymbol.repeat(3))
			, money4 = screen.getByLabelText(starSymbol.repeat(4))
			, money5 = screen.getByLabelText(starSymbol.repeat(5));

		fireEvent.click(money1);
		expect(money1).toBeChecked();
		expect(money2).not.toBeChecked();
		expect(money3).not.toBeChecked();
		expect(money4).not.toBeChecked();
		expect(money5).not.toBeChecked();

		fireEvent.click(money2);
		expect(money1).not.toBeChecked();
		expect(money2).toBeChecked();
		expect(money3).not.toBeChecked();
		expect(money4).not.toBeChecked();
		expect(money5).not.toBeChecked();

		fireEvent.click(money3);
		expect(money1).not.toBeChecked();
		expect(money2).not.toBeChecked();
		expect(money3).toBeChecked();
		expect(money4).not.toBeChecked();
		expect(money5).not.toBeChecked();

		fireEvent.click(money4);
		expect(money1).not.toBeChecked();
		expect(money2).not.toBeChecked();
		expect(money3).not.toBeChecked();
		expect(money4).toBeChecked();
		expect(money5).not.toBeChecked();

		fireEvent.click(money5);
		expect(money1).not.toBeChecked();
		expect(money2).not.toBeChecked();
		expect(money3).not.toBeChecked();
		expect(money4).not.toBeChecked();
		expect(money5).toBeChecked();
	});
});

describe('Result tab', () => {
	test('result tab shows', () => {
		render(<Search/>);

		expect(screen.getByLabelText("Food")).toBeTruthy();
		expect(screen.getByLabelText("Restaurant")).toBeTruthy();
	});

	test('result tab alternates', async () => {
		render(<Search/>);

		const foodTab = screen.getByLabelText("food results tab")
			, restTab = screen.getByLabelText("restaurant results tab");

		fireEvent.click(screen.getByText("Food"));
		expect(foodTab).toBeVisible();
		expect(restTab).not.toBeVisible();

		fireEvent.click(screen.getByText("Restaurant"));
		expect(foodTab).not.toBeVisible();
		expect(restTab).toBeVisible();
	});
});