import PropTypes from 'prop-types';

function Empty({ resourceName }) {
  return <p>{resourceName} could not be found.</p>;
}

Empty.propTypes = {
  resourceName: PropTypes.string,
};

export default Empty;
