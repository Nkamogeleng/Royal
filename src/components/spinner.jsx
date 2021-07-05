import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const Spinner = () => {
  return (
    <div id="preloader">
      <FontAwesomeIcon icon={['fas','spinner']} className="icon spin-it" aria-hidden="true" />
    </div>
  );
};

export default Spinner;
