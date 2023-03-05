import { RotatingLines } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div className="loader-container">
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
      ;
    </div>
  );
};
