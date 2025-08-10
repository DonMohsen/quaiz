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
      className="w-screen h-screen fixed z-[99990] flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()} 
        className="w-[80%]  max-md:w-[100%] h-[80%] max-md:h-[100%] bg-white rounded-[16px] max-md:rounded-none border-white/[0.1] border p-5"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
