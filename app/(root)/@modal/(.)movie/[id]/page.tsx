import { Modal } from "@/features/modal";
import MoviePage from "../../../movie/[id]/page";

export default function MovieModal({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <>
      <Modal id={id}>
        <MoviePage />
      </Modal>
    </>
  );
}
