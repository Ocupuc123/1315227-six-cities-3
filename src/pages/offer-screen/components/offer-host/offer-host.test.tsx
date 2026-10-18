import { render, screen } from '@testing-library/react';
import OfferHost from './offer-host';
import type { User } from '../../../../types/user';

const makeHost = (overrides: Partial<User> = {}): User => ({
  name: 'Angelina',
  avatarUrl: '/img/avatar-angelina.jpg',
  isPro: true,
  ...overrides,
});

describe('Component: OfferHost', () => {
  it('should render host name, avatar and description', () => {
    const host = makeHost();

    render(<OfferHost host={host} description="Great place" />);

    expect(screen.getByText('Meet the host')).toBeInTheDocument();
    expect(screen.getByText(host.name)).toBeInTheDocument();
    expect(screen.getByText('Great place')).toBeInTheDocument();
    expect(screen.getByAltText(host.name)).toHaveAttribute(
      'src',
      host.avatarUrl,
    );
  });

  it('should render pro status and pro class for pro host', () => {
    const { container } = render(
      <OfferHost host={makeHost({ isPro: true })} description="Desc" />,
    );

    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(container.querySelector('.offer__avatar-wrapper')).toHaveClass(
      'offer__avatar-wrapper--pro',
    );
  });

  it('should not render pro status for non pro host', () => {
    const { container } = render(
      <OfferHost host={makeHost({ isPro: false })} description="Desc" />,
    );

    expect(screen.queryByText('Pro')).not.toBeInTheDocument();
    expect(container.querySelector('.offer__avatar-wrapper')).not.toHaveClass(
      'offer__avatar-wrapper--pro',
    );
  });

  it('should not render avatar when host has no avatar url', () => {
    const host = makeHost({ avatarUrl: '' });

    render(<OfferHost host={host} description="Desc" />);

    expect(screen.queryByAltText(host.name)).not.toBeInTheDocument();
  });

  it('should render nothing when host is missing', () => {
    const { container } = render(
      <OfferHost host={undefined as unknown as User} description="Desc" />,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
