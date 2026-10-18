import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReviewsRating from './reviews-rating';

describe('Component: ReviewsRating', () => {
  it('should render 5 rating inputs', () => {
    render(
      <ReviewsRating rating={0} onChange={() => undefined} isSubmitting={false} />,
    );

    expect(screen.getAllByRole('radio')).toHaveLength(5);
  });

  it('should check input matching the selected rating', () => {
    render(
      <ReviewsRating rating={3} onChange={() => undefined} isSubmitting={false} />,
    );

    expect(screen.getByDisplayValue('3')).toBeChecked();
    expect(screen.getByDisplayValue('5')).not.toBeChecked();
  });

  it('should call onChange when rating label is clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <ReviewsRating rating={0} onChange={handleChange} isSubmitting={false} />,
    );

    await user.click(screen.getByTitle('perfect'));

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('should disable inputs while submitting', () => {
    render(
      <ReviewsRating rating={0} onChange={() => undefined} isSubmitting />,
    );

    screen.getAllByRole('radio').forEach((radio) => {
      expect(radio).toBeDisabled();
    });
  });

  it('should render labels with rating titles', () => {
    render(
      <ReviewsRating rating={0} onChange={() => undefined} isSubmitting={false} />,
    );

    expect(screen.getByTitle('terribly')).toBeInTheDocument();
    expect(screen.getByTitle('badly')).toBeInTheDocument();
    expect(screen.getByTitle('not bad')).toBeInTheDocument();
    expect(screen.getByTitle('good')).toBeInTheDocument();
    expect(screen.getByTitle('perfect')).toBeInTheDocument();
  });
});
