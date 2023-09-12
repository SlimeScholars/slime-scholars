import PuffLoader from "react-spinners/PuffLoader";

const override = {
  display: "block",
  margin: "0 auto",
};

export default function MainSpinner() {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <PuffLoader
        color={"#F649DA"}
        loading={true}
        css={override}
        size={150}
      />
      <h1 className="text-5xl font-black text-primary mt-10 phase">
        Loading...
      </h1>
    </div>
  )
}
