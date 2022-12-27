import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Comment from '../components/Comment/Comment';
import { MemoryRouter } from 'react-router';
describe('Comment Rendering', () => {
  test('Comment is rendered', () => {
    render(
      <MemoryRouter>
        <Comment />
      </MemoryRouter>
    );
    const post = screen.getByTestId('comment');
    expect(comment).toBeInDocument;
  });
  test('comment is rendered with correct props', () => {
    const test_comment = {
    user: 'mbm',
    title: 'Test Title',
    body: 'Test Body',
    index: 1,
    upvote: 2,
    downvote: 3,

      
    
    };
    render(
      <MemoryRouter>
        <Post testComments={test_comment} />
      </MemoryRouter>
    );
    const comment = screen.getByTestId('comment');
    expect(post).toBeInDocument;
    expect(screen.getByText('Test Title')).toBeInDocument;
    expect(screen.getByText('Test Body')).toBeInDocument;
  });
});
