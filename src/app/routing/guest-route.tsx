import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';

type GuestRouteProps = {
  children: JSX.Element;
};

function GuestRoute({ children }: GuestRouteProps): JSX.Element | null {
  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus,
  );

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return null;
  }

  return authorizationStatus !== AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.Main} replace />
  );
}

export default GuestRoute;
