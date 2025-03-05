import { useEffect } from "react";

function UnexcitingPage() {
  useEffect(() => {
    window.location.href = "/";
  }, []);

  return <div></div>;
}

export default UnexcitingPage;
