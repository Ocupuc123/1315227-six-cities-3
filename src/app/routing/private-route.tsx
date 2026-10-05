import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';

type Access = 'auth' | 'guest';

const RedirectMapping: Record<Access, AppRoute> = {
  auth: AppRoute.Login,
  guest: AppRoute.Main,
};

type PrivateRouteProps = {
  children: JSX.Element;
  access: Access;
};

function PrivateRoute({
  children,
  access,
}: PrivateRouteProps): JSX.Element | null {
  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus,
  );

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return null;
  }

  const isAuth = authorizationStatus === AuthorizationStatus.Auth;
  const hasAccess = access === 'auth' ? isAuth : !isAuth;

  return hasAccess ? (
    children
  ) : (
    <Navigate to={RedirectMapping[access]} replace />
  );
}

export default PrivateRoute;
