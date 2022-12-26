import ProfilePage from '../pages/ProfilePage/ProfilePage';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

describe('ProfilePage Rendering', () => {
  test('ProfilePage is rendered', () => {
    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );
    const profilePage = screen.getByTestId('profile-page');
    expect(profilePage).toBeInDocument;
  });
  test('ProfilePage is rendered with correct props', () => {
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
        <ProfilePage testPosts={post} />
      </MemoryRouter>
    );
    const profilePage = screen.getByTestId('profile-page');
  });
});
