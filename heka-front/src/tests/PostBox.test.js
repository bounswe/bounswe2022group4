import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PostBox from '../components/PostBox/PostBox';
import { MemoryRouter } from 'react-router';
describe('PostBox Rendering', () => {
  test('PostBox is rendered', () => {
    render(
      <MemoryRouter>
        <PostBox />
      </MemoryRouter>
    );
    const postBox = screen.getByTestId('post-box');
    expect(postBox).toBeInDocument;
  });
  test('PostBox is rendered with correct props', () => {
    const post = {
      id: 1,
      title: 'Test Title',
      body: 'Test Body',
      userId: 1,
      comments: [
        {
          id: 1,
          postId: 1,
          name: 'Test Name',
          email: 'Test Mail',
          body: 'Test Body',
        },
      ],
    };
    render(
      <MemoryRouter>
        <PostBox testPosts={post} />
      </MemoryRouter>
    );
    const postBox = screen.getByTestId('post-box');
    expect(postBox).toBeInDocument;
    expect(screen.getByText('Test Title')).toBeInDocument;
    expect(screen.getByText('Test Body')).toBeInDocument;
    expect(screen.getByText('Test Name')).toBeInDocument;
    expect(screen.getByText('Test Mail')).toBeInDocument;
  });
});
