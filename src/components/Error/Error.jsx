import PropTypes from 'prop-types';

export const Error = ({ error }) => {
  return (
    <div>
      <h1>Something went wrong!</h1>
      <p>{error}</p>
    </div>
  );
};

Error.propTypes = {
  Error: PropTypes.string,
};
