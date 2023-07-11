import Header from "../Components/CommonHeader";
const Dummy = () => {
  return (
    <>
      <Header></Header>
      <>
        <p
          style={{
            display: "grid",
            gridTemplateColumns: "30% 70%",
            padding: "4rem 0",
          }}
        >
          Build the profile here
        </p>
      </>
    </>
  );
};

export default Dummy;
