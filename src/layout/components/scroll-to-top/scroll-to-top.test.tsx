import { render } from '@testing-library/react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AppRoute } from '../../../const';
import ScrollToTop from './scroll-to-top';
import { withHistory } from '../../../utils/mock-component';

const scrollToMock = vi.fn();

beforeAll(() => {
  window.scrollTo = scrollToMock as unknown as typeof window.scrollTo;
});

beforeEach(() => {
  scrollToMock.mockClear();
});

const Navigator = ({ to }: { to: string }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to);
  }, [navigate, to]);

  return null;
};

const renderScrollToTop = (route: string = AppRoute.Main) =>
  render(withHistory(<ScrollToTop />, [route]));

describe('Component: ScrollToTop', () => {
  it('should render nothing', () => {
    const { container } = renderScrollToTop();

    expect(container).toBeEmptyDOMElement();
  });

  it('should call window.scrollTo on mount with instant behavior', () => {
    renderScrollToTop();

    expect(scrollToMock).toHaveBeenCalledTimes(1);
    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  });

  it('should call window.scrollTo again when pathname changes', () => {
    render(
      withHistory(
        <>
          <ScrollToTop />
          <Routes>
            <Route path="*" element={<Navigator to={AppRoute.Favorites} />} />
          </Routes>
        </>,
        [AppRoute.Main],
      ),
    );

    expect(scrollToMock).toHaveBeenCalledTimes(2);
    scrollToMock.mock.calls.forEach(([options]) => {
      expect(options).toEqual({ top: 0, left: 0, behavior: 'instant' });
    });
  });

  it('should not call window.scrollTo again when pathname stays the same', () => {
    const { rerender } = renderScrollToTop(AppRoute.Main);

    rerender(withHistory(<ScrollToTop />, [AppRoute.Main]));

    expect(scrollToMock).toHaveBeenCalledTimes(1);
  });
});
