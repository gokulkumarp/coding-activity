import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Loading...', () => {
  render(<App />);
  const component = screen.getByText('Loading...');
  expect(component).toBeInTheDocument();
  expect(component).toMatchSnapshot();
});


