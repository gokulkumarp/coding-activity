import { render, screen, act } from '@testing-library/react';
import Post from './Post';
import mockPostData from './mockData';

describe('Post component', () => {
    test('renders posts if request succeeds', async () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => mockPostData
        })
        await act(async () => render(<Post />));
        const component = await screen.getByText('Top article title');
        expect(component).toBeInTheDocument();
        expect(component).toMatchSnapshot();
    });

    test('renders posts if request not succeeds', async () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce(new Error('Internal Server Error'));
        await act(async () => render(<Post />));
        const component = await screen.getByText('Error: response.json is not a function');
        expect(component).toBeInTheDocument();
        expect(component).toMatchSnapshot();
    });
})




