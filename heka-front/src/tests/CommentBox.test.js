import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CommentBox from '../components/CommentBox/CommentBox';
import { MemoryRouter } from 'react-router';
describe('CommentBox Rendering', () => {
  test('CommentBox is rendered', () => {
    render(
      <MemoryRouter>
        <CommentBox />
      </MemoryRouter>
    );
    const commentBox = screen.getByTestId('comment-box');
    expect(commentBox).toBeInDocument;
  });
  test('CommentBox is rendered with correct props', () => {
    const post = {
      
          id: 1,
          postId: 1,
          name: 'Test Name',
          email: 'Test Mail',
          body: 'Test Body',
        
    };
    render(
      <MemoryRouter>
        <CommentBox testPosts={post} />
      </MemoryRouter>
    );
    const postBox = screen.getByTestId('post-box');
    expect(postBox).toBeInDocument;
    expect(screen.getByText('Test Name')).toBeInDocument;
    expect(screen.getByText('Test Mail')).toBeInDocument;
    expect(screen.getByText('Test Body')).toBeInDocument;
  });
});
