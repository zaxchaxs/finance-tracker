import { Toaster } from "react-hot-toast";

type Props = {
  gap?: number;
  className?: string;
};

const ToastContainer = ({ className, gap = 8 }: Props) => {
  return (
    <Toaster
      position={"top-right"}
      reverseOrder={false}
      gutter={gap}
      containerClassName={className}
      containerStyle={{}}
      toastOptions={{
        className: "",
        duration: 5000,
        style: {
          background: "#91AC8F",
          color: "#052E16",
        },
      }}
    />
  );
};

export default ToastContainer;
