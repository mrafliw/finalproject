import PropTypes from 'prop-types';
import Navbar from '../Navbar';

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
} 

export default Layout;