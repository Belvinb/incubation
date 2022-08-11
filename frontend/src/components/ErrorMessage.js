import React from 'react'
import Alert from "react-bootstrap/Alert";

const ErrorMessage = ({variant="info",children}) => {
  return (
    <Alert key={variant} variant={variant} style={{fontSize:20}}>
      <strong>{children}</strong>
    </Alert>
  );
}

export default ErrorMessage