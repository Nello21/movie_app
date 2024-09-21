import { PacmanLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <PacmanLoader
        color="white"
        loading={true}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
