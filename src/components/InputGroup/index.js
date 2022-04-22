import PropTypes from 'prop-types';

function InputGroup({ children }) {
  return (
    <div className='inputGroup'>
      {children}
    </div>
  )
}
InputGroup.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InputGroup;