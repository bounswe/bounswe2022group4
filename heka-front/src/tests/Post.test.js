import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Post from '../components/Post/Post';
import { MemoryRouter } from 'react-router';
describe('Post Rendering', () => {
  test('Post is rendered', () => {
    render(
      <MemoryRouter>
        <Post />
      </MemoryRouter>
    );
    const post = screen.getByTestId('post');
    expect(post).toBeInDocument;
  });
  test('Post is rendered with correct props', () => {
    const test_post = {
      title: 'Test Title',
      body: 'Test Body',
      user: 'uds',
      index: 1,
      upvote: 2,
      downvote: 3,
      isUpvoted: true,
      isDownvoted: false,
      userName: 'uds',
    };
    render(
      <MemoryRouter>
        <Post testPosts={test_post} />
      </MemoryRouter>
    );
    const post = screen.getByTestId('post');
    expect(post).toBeInDocument;
    expect(screen.getByText('Test Title')).toBeInDocument;
    expect(screen.getByText('Test Body')).toBeInDocument;
    expect(screen.getByText('Test Name')).toBeInDocument;
    expect(screen.getByText('Test Mail')).toBeInDocument;
  });
});
