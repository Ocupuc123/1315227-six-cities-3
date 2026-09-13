import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from '../../const';
import { getAuthorizationStatus } from '../../utils/auth';
import MainScreen from '../../pages/main-screen/main-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import GuestRoute from '../guest-route/guest-route';
import Layout from '../../layout/layout';
import type { Offer, FullOffer } from '../../types/offer';
import type { Comment } from '../../types/comment';

type AppScreenProps = {
  offers: Offer[];
  favorites: Offer[];
  offersNearby: Offer[];
  offer: FullOffer;
  comments: Comment[];
};

function App({ offers, favorites, offersNearby, offer, comments }: AppScreenProps) {
  const authorizationStatus = getAuthorizationStatus();
  const isFavoriteEmpty = favorites.length === 0;

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Main} element={<Layout isFavoriteEmpty={isFavoriteEmpty} />}>
            <Route index element={<MainScreen offers={offers} />} />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute authorizationStatus={authorizationStatus}>
                  <FavoritesScreen favorites={favorites} />
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.Login}
              element={
                <GuestRoute authorizationStatus={authorizationStatus}>
                  <LoginScreen />
                </GuestRoute>
              }
            />
            <Route
              path={AppRoute.Offer}
              element={
                <OfferScreen
                  authorizationStatus={authorizationStatus}
                  offersNearby={offersNearby}
                  comments={comments}
                  offer={offer}
                />
              }
            />
            <Route path="*" element={<NotFoundScreen />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
