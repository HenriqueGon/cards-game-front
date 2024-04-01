import React from 'react';

const Button = ({onClick, disabled, className, text}) => {

  return (
    <>
      <button 
        onClick={onClick} 
        disabled={disabled} 
        className={className ? className : 'btn btn-primary btn-block'}        >
          {text}
        </button >
    </>
  );
}

export default Button;
