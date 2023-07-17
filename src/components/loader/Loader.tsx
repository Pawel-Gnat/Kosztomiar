import { RevolvingDot } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <RevolvingDot
      height="100"
      width="100"
      radius={+'10'}
      color="#02121c"
      secondaryColor=""
      ariaLabel="revolving-dot-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};
