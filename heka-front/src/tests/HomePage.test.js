import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from '../pages/HomePage/HomePage';
import { MemoryRouter } from 'react-router';
describe('login', () => {
  test('Header is placed on Home Page', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    const headerText = screen.getByText('Welcome to HEKA');
    expect(headerText).toBeInDocument;
  });
  test('Comment Button is working', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    const commentButton = screen.getByTestId('comment-button-0');
    expect(
      (commentButton,
      {
        name: /Close/i,
      })
    );

    fireEvent.click(commentButton);
    expect(screen.getByText('Comment'));
  });
  test('Show Comments Button is working', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    const showCommentButton = screen.getByTestId('show-comments-button-0');
    expect(
      (showCommentButton,
      {
        name: /Close Comments/i,
      })
    );

    fireEvent.click(showCommentButton);
    expect(screen.getByText('Show Comments'));
  });
  test('Delete Button is working', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    const deleteButton = screen.getByTestId('delete-button-0');
    window.alert = jest.fn();
    fireEvent.click(deleteButton);
    expect(window.alert).toBeCalledWith(
      'Delete functionality not implemented yet and will be available only for admins and the user who created the post'
    );
  });
  test('Edit Button is working', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    const editButton = screen.getByTestId('edit-button-0');
    window.alert = jest.fn();
    fireEvent.click(editButton);
    expect(window.alert).toBeCalledWith(
      'Edit functionality not implemented yet and will be available only for admins and the user who created the post'
    );
  });
});
