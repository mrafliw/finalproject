import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

function GuardRoute({ children, type, ...props }) {
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);

  if (type === 'guest') {
    return (
      <Route {...props}>
        {!isAuthorized ? children : <Redirect to="/create-playlist" />}
      </Route>
    )
  }

  return (
    <Route {...props}>
      {isAuthorized ? children : <Redirect to="/" />}
    </Route>
  )
}

GuardRoute.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['guest', 'private']).isRequired,
};

export default GuardRoute;