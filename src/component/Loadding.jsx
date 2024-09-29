import  { useState } from 'react';
import RingLoader from 'react-spinners/RingLoader';

// Define a regular object for the override styles
const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

const Loadding = () => {
  // Define the color and loading state using useState hooks
  const [color] = useState('#f00'); // Set a default color value
  const [loading] = useState(true); // Set loading state to true initially

  return (
    <RingLoader
      color={color}
      loading={loading}
      cssOverride={override} // Applying the override styles
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Loadding;
