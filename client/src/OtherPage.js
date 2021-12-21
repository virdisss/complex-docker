import { Link } from "react-router-dom";
const OtherPage = () => {
  return (
    <div>
      <h1>I am some other page</h1>
      <Link to="/">Back home</Link>
    </div>
  );
};

export default OtherPage;
