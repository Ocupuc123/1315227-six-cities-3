import { render, screen } from '@testing-library/react';
import ReviewsList from './reviews-list';
import { makeFakeComment } from '../../../../utils/mocks';

describe('Component: ReviewsList', () => {
  it('should render comment author, text and formatted date', () => {
    const comment = {
      ...makeFakeComment(),
      date: '2025-05-10T00:00:00.000Z',
    };

    render(<ReviewsList comments={[comment]} />);

    expect(screen.getByText(comment.user.name)).toBeInTheDocument();
    expect(screen.getByText(comment.comment)).toBeInTheDocument();
    expect(screen.getByText('May 2025')).toBeInTheDocument();
    expect(screen.getByAltText(comment.user.name)).toHaveAttribute(
      'src',
      comment.user.avatarUrl,
    );
  });

  it('should render rating width based on comment rating', () => {
    const comment = { ...makeFakeComment(), rating: 5 };

    const { container } = render(<ReviewsList comments={[comment]} />);

    expect(container.querySelector('.reviews__stars span')).toHaveStyle({
      width: '100%',
    });
  });

  it('should render comments sorted by date from newest to oldest', () => {
    const olderComment = {
      ...makeFakeComment(),
      date: '2024-01-15T00:00:00.000Z',
      comment: 'Older comment',
    };
    const newerComment = {
      ...makeFakeComment(),
      date: '2025-01-15T00:00:00.000Z',
      comment: 'Newer comment',
    };

    const { container } = render(
      <ReviewsList comments={[olderComment, newerComment]} />,
    );

    const items = container.querySelectorAll('.reviews__item');
    expect(items[0].textContent).toContain('Newer comment');
    expect(items[1].textContent).toContain('Older comment');
  });

  it('should limit rendered comments to 10', () => {
    const comments = Array.from({ length: 12 }, () => makeFakeComment());

    const { container } = render(<ReviewsList comments={comments} />);

    expect(container.querySelectorAll('.reviews__item')).toHaveLength(10);
  });

  it('should not render avatar when user has no avatar url', () => {
    const comment = {
      ...makeFakeComment(),
      user: { ...makeFakeComment().user, avatarUrl: '' },
    };

    render(<ReviewsList comments={[comment]} />);

    expect(screen.queryByAltText(comment.user.name)).not.toBeInTheDocument();
  });
});
