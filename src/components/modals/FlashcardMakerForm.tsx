import React from "react";
import Modal from "../ui/Modal";

const   FlashcardMakerForm = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  return (
    <Modal onClose={onClose}>
      <div className="w-full h-full bg-rose-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, possimus! Quibusdam non delectus repudiandae, quidem earum eligendi provident ipsam accusamus pariatur dolores tenetur, qui ipsum. Soluta rerum exercitationem facilis explicabo.</div>;
    </Modal>
  );
};

export default FlashcardMakerForm;
