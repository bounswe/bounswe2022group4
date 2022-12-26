import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignUpVerificationPage from '../pages/SignUpVerificationPage/SignUpVerificationPage';

describe('SignUpVerificationPage', () => {
  it('Verification page is rendered correctly', () => {
    const { getByText, getByPlaceholderText } = render(<SignUpVerificationPage />);
    expect(getByText('Verify your account')).toBeInTheDocument();
    expect(getByPlaceholderText('Verification Code')).toBeInTheDocument();
  });

  it('Submits the form correctly', () => {
    const { getByText, getByPlaceholderText } = render(<SignUpVerificationPage />);
    const verificationCodeInput = getByPlaceholderText('Verification Code');
    fireEvent.change(verificationCodeInput, { target: { value: '111130' } });
    const verifyButton = getByText('Verify');
    fireEvent.click(verifyButton);
    expect(getByText('Your account has been verified')).toBeInTheDocument();
  });

  it('An warning message is displayed when the verification code is incorrect', () => {
    const { getByText, getByPlaceholderText } = render(<SignUpVerificationPage />);
    const verificationCodeInput = getByPlaceholderText('Verification Code');
    fireEvent.change(verificationCodeInput, { target: { value: 'invalid' } });
    const verifyButton = getByText('Verify');
    fireEvent.click(verifyButton);
    expect(getByText('Incorrect validation code')).toBeInTheDocument();
  });
});
