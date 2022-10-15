import img from "./error.gif";

const styleError = {
  display: "block",
  width: "250px",
  height: "250px",
  objectFit: "contain",
  margin: "0 auto",
};

const ErrorMessage = () => {
  return <img style={styleError} src={img} alt="Error" />;
};

export default ErrorMessage;
