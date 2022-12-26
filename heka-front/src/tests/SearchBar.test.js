import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SearchBar from '../pages/SearchBar/SearchBar';
import BackendApi from '../api';

jest.mock('../../api');

const mockGetSearchPost = jest.fn().mockResolvedValue({ data: [{ title: 'Post 1' }, { title: 'Post 2' }] });
const mockGetSearchUser = jest.fn().mockResolvedValue({ data: [{ username: 'User 1' }, { username: 'User 2' }] });
BackendApi.getSearchPost.mockImplementation(mockGetSearchPost);
BackendApi.getSearchUser.mockImplementation(mockGetSearchUser);

test('search input and search icon are placed correctl', () => {
  const { getByPlaceholderText, getByTestId } = render(<SearchBar />);
  const searchInput = getByPlaceholderText('Search');
  const searchIcon = getByTestId('search-icon');

  expect(searchInput).toBeInTheDocument();
  expect(searchIcon).toBeInTheDocument();
});

test('Search results are displayed when search term is entered ', async () => {
  const { getByPlaceholderText, getByTestId } = render(<SearchBar />);
  const searchInput = getByPlaceholderText('Search');

  fireEvent.change(searchInput, { target: { value: 'test' } });

  await waitFor(() => expect(mockGetSearchPost).toHaveBeenCalledWith('test', 4));
  await waitFor(() => expect(mockGetSearchUser).toHaveBeenCalledWith('test', 4));

  const searchResults = getByTestId('search-results');
  const post1 = getByTestId('post-1');
  const post2 = getByTestId('post-2');
  const user1 = getByTestId('user-1');
  const user2 = getByTestId('user-2');

  expect(searchResults).toBeInTheDocument();
  expect(post1).toHaveTextContent('Post 1');
  expect(post2).toHaveTextContent('Post 2');
  expect(user1).toHaveTextContent('User 1');
  expect(user2).toHaveTextContent('User 2');
});

test('Clears search input and results works correctly when clear icon is clicked', async () => {
  const { getByPlaceholderText, getByTestId } = render(<SearchBar />);
  const searchInput = getByPlaceholderText('Search');
  const clearIcon = getByTestId('clear-icon');

  fireEvent.change(searchInput, { target: { value: 'test' } });
  fireEvent.click(clearIcon);

  expect(searchInput).toHaveValue('');
  expect(mockGetSearchPost).toHaveBeenCalledTimes(1);
  expect(mockGetSearchUser).toHaveBeenCalledTimes(1);

  await waitFor(() => expect(mockGetSearchPost).toHaveBeenCalledTimes(
