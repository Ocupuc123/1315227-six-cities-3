import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from '../const';
import MainScreen from '../pages/main-screen/main-screen';
import FavoritesScreen from '../pages/favorites-screen/favorites-screen';
import LoginScreen from '../pages/login-screen/login-screen';
import OfferScreen from '../pages/offer-screen/offer-screen';
import NotFoundScreen from '../pages/not-found-screen/not-found-screen';
import PrivateRoute from './routing/private-route';
import GuestRoute from './routing/guest-route';
import Layout from '../layout/layout';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Main} element={<Layout />}>
            <Route index element={<MainScreen />} />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute>
                  <FavoritesScreen />
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.Login}
              element={
                <GuestRoute>
                  <LoginScreen />
                </GuestRoute>
              }
            />
            <Route path={AppRoute.Offer} element={<OfferScreen />} />
            <Route path={AppRoute.NotFound} element={<NotFoundScreen />} />
            <Route path="*" element={<NotFoundScreen />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
