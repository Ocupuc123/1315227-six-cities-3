import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';

type GuestRouteProps = {
  children: JSX.Element;
};

function GuestRoute({ children }: GuestRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus,
  );

  return authorizationStatus !== AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.Main} replace />
  );
}

export default GuestRoute;
