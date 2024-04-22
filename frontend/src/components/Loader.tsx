import { Spinner } from "react-bootstrap";
type Props = {
  width?: string;
  height?: string;
};
const Loader = ({ width = "100px", height = "100px" }: Props) => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: width,
        height: height,
        margin: "auto",
        display: "block",
      }}
    ></Spinner>
  );
};

export default Loader;
