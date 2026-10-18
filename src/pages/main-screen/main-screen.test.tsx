import { render, screen } from '@testing-library/react';
import { makeFakeOffer, makeFakeStore } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';
import { DEFAULT_CITY, NameSpace } from '../../const';
import MainScreen from './main-screen';

describe('Component: MainScreen', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<MainScreen />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Cities')).toBeInTheDocument();
  });

  it('should render offers count when there are offers', () => {
    const fakeOffer = makeFakeOffer();
    const offer = {
      ...fakeOffer,
      city: { ...fakeOffer.city, name: DEFAULT_CITY },
    };
    const { withStoreComponent } = withStore(
      <MainScreen />,
      makeFakeStore({
        [NameSpace.Data]: {
          ...makeFakeStore()[NameSpace.Data],
          offers: [offer],
        },
      }),
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(/place to stay in/i)).toBeInTheDocument();
  });
});
