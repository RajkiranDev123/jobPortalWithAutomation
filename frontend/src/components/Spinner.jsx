
import { DotLoader } from "react-spinners";

const Spinner = () => {
  return (
    <>
      <section
        style={{
          minHeight: "525px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DotLoader size={60} />
      </section>
    </>
  );
};

export default Spinner;