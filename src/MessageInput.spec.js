import { render, screen, fireEvent } from '@testing-library/react';
import MessageInput from './MessageInput';

describe('MessageInput', () => {
  it('should have send button disabled if no input', () => {
    render(<MessageInput />);
    const sendBtn = screen.getByText(/Send >/i);
    expect(sendBtn).toBeDisabled();
  });

    it('should enable send button when user inputs text', () => {
      render(<MessageInput />);
      const sendBtn = screen.getByText(/Send >/i);
      const textInput = screen.getByTestId('textInput');
      fireEvent.change(textInput, {
        target: { value: 'test' },
      });
      expect(sendBtn).toBeEnabled();
    });
});
