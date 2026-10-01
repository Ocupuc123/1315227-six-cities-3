import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element | null {
  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus,
  );

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return null;
  }

  return authorizationStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.Login} replace />
  );
}

export default PrivateRoute;
