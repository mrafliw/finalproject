import './index.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


function Button({ children, type, variant, className, onClick, href, external, ...props }) {
  const classButton = ['btn'];
  
  if (variant !== 'primary') {
    classButton.push(`btn-${variant}`);
  }

  if (className !== '') {
    classButton.push(className);
  }

  if (href) {
    classButton.push('btn-link');
    if (external) {
      return (
        <a
          href={href}
          className={classButton.join(' ')}
          {...props}
        >
          {children}
        </a>
      )
    }
    
    return (
      <Link
        to={href}
        className={classButton.join(' ')}
        {...props}
      >
        {children}
      </Link>
    )
  }
  
  return (
    <button
      type={type}
      className={classButton.join(' ')}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  type: 'button',
  className: '',
  variant: 'primary',
  onClick: null,
  href: null,
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'text']),
  onClick: PropTypes.func,
  href: PropTypes.string,
};

export default Button;