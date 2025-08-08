"use client";
const Modal = ({
  onClose,
  children,
}: Readonly<{
  children: React.ReactNode;
  onClose: () => void;
}>) => {
  return (
    <div
      onClick={onClose}
      className="w-screen h-screen fixed z-[50] flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()} 
        className="w-[60%] max-md:w-[90%] h-[70%] max-md:h-[90%] bg-black rounded-[16px] border-white/[0.1] border p-5"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
