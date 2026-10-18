import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'react-toastify';
import ReviewsForm from './reviews-form';
import { withHistory, withStore } from '../../../../utils/mock-component';
import { makeFakeStore } from '../../../../utils/mocks';
import { addCommentAction } from '../../../../store/api-actions';
import { NameSpace } from '../../../../const';
import type { State } from '../../../../types/state';

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock('../../../../store/api-actions', () => ({
  addCommentAction: vi.fn(() => ({
    type: 'data/addComment/pending',
    unwrap: () => Promise.resolve(),
  })),
}));

const mockOfferId = 'offer-1';
const reviewText = 'A very quiet and beautiful place to stay in the heart of the city.';

const renderReviewsForm = (initialState: Partial<State> = {}) => {
  const { withStoreComponent } = withStore(
    <ReviewsForm offerId={mockOfferId} />,
    makeFakeStore(initialState),
  );
  const preparedComponent = withHistory(withStoreComponent);

  return render(preparedComponent);
};

const getTextarea = () =>
  screen.getByPlaceholderText(
    'Tell how was your stay, what you like and what can be improved',
  );

const fillValidForm = async () => {
  const user = userEvent.setup();

  await user.type(getTextarea(), reviewText);
  await user.click(screen.getByTitle('perfect'));

  return user;
};

describe('Component: ReviewsForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render form elements and disable submit button initially', () => {
    renderReviewsForm();

    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(screen.getByText(`${50} characters`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
  });

  it('should disable submit button when review is too short', async () => {
    const user = userEvent.setup();

    renderReviewsForm();

    await user.type(getTextarea(), 'Too short');
    await user.click(screen.getByTitle('perfect'));

    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
  });

  it('should enable submit button when review and rating are valid', async () => {
    renderReviewsForm();
    await fillValidForm();

    expect(screen.getByRole('button', { name: 'Submit' })).toBeEnabled();
  });

  it('should dispatch addCommentAction with review data on submit', async () => {
    renderReviewsForm();
    const user = await fillValidForm();

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(addCommentAction).toHaveBeenCalledWith({
      offerId: mockOfferId,
      comment: reviewText,
      rating: 5,
    });
  });

  it('should reset form and show success toast after successful submit', async () => {
    renderReviewsForm();
    const user = await fillValidForm();

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() =>
      expect(toast.success).toHaveBeenCalledWith(
        'The comment has been published.',
      ),
    );
    expect(getTextarea()).toHaveValue('');
    expect(
      screen.getByRole('button', { name: 'Submit' }),
    ).toBeDisabled();
  });

  it('should show error toast when submitting fails', async () => {
    vi.mocked(addCommentAction).mockImplementationOnce(
      (() => ({
        type: 'data/addComment/pending',
        unwrap: () => Promise.reject(new Error('Submit failed')),
      })) as unknown as typeof addCommentAction,
    );

    renderReviewsForm();
    const user = await fillValidForm();

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(
        'The comment has not been published.',
      ),
    );
  });

  it('should disable form controls while submitting', () => {
    renderReviewsForm({
      [NameSpace.Data]: {
        ...makeFakeStore()[NameSpace.Data],
        isCommentSubmitting: true,
      },
    });

    expect(getTextarea()).toBeDisabled();
    expect(
      screen.getByRole('button', { name: 'Submitting...' }),
    ).toBeDisabled();
    screen.getAllByRole('radio').forEach((radio) => {
      expect(radio).toBeDisabled();
    });
  });

  it('should not submit the form when review data is invalid', async () => {
    const user = userEvent.setup();

    renderReviewsForm();

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(addCommentAction).not.toHaveBeenCalled();
  });
});
