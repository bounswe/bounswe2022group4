import EditProfilePage from '../pages/EditProfilePage/EditProfilePage';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

describe('EditProfilePage Rendering', () => {
  test('EditProfilePage is rendered', () => {
    render(
      <MemoryRouter>
        <EditProfilePage />
      </MemoryRouter>
    );
    const editProfilePage = screen.getByTestId('edit-profile-page');
    expect(editProfilePage).toBeInDocument;
  });
  test('EditProfilePage is rendered with correct props', () => {
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
        <EditProfilePage testPosts={post} />
      </MemoryRouter>
    );
    const editProfilePage = screen.getByTestId('edit-profile-page');
  });
});
