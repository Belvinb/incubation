import React from 'react'
import Spinner from "react-bootstrap/Spinner";

const Loading = () => {
  return (
    <div>
      
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
        variant="light"
      />
    </div>
  );
}

export default Loading