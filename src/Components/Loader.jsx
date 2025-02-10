import { Vortex } from "react-loader-spinner";

export const Loader = () => {
  return (
    <div className="mb-[300px]">
    <Vortex
      visible={true}
      height="40"
      width="80"
      ariaLabel="vortex-loading"
      wrapperStyle={{}}
      wrapperClass="vortex-wrapper"
      colors={["red", "green", "blue", "yellow", "orange", "purple"]}
    />
    </div>
  );
};
