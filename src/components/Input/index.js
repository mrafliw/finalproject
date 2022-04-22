import './index.css';
import PropTypes from 'prop-types'; 

function ElementInput({ type, ...props }) {
  if (type === 'textarea') {
    return <textarea {...props} />
  }
  return <input type={type} {...props} />
}

function Input({ label, id, required, type, error, className, ...props }) {

  const classInput = ['input'];
  if (type === 'textarea') {
    classInput.push('inputLarge');
  }

  if (className) {
    classInput.push(className);
  }
  
  if (error) {
    classInput.push('inputError');
  }

  return (
    <>
      {label && <label htmlFor={id}>{label}{required && <span>*</span>}</label>}

      <ElementInput
        type={type}
        id={id}
        className={classInput.join(' ')}
        
        required={required}
        {...props}
      />
      {error && <span className='inputGroupError'>{error}</span>}
    </>
  )
}

Input.defaultProps = {
  label: null,
  type: 'text',
  error: null,
  required: false,
  className: '',
};

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  required: PropTypes.bool,
  className: PropTypes.string,
}; 

export default Input;