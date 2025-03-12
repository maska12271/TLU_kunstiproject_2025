import { Link } from "react-router-dom";
import "../CSSFiles/Authorization.scss";
import { useState } from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {useTRPC} from "../utils/trpc.js";

function LoginPage() {
  const trpc = useTRPC();
   
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');

  const loginMutation = useMutation(trpc.user.login.mutationOptions(
      {
        onSuccess: (data) => {
          console.log(data)
          window.location.href = '/admin'
        },
        onError: (err) => {
          console.log(err);
        }
      }
  ));

  const handleLogin = () => {
    loginMutation.mutate({
      username: username,
      password: pass
    });
  };

  return (
    <div className={"authorizationPage"}>
      <div className={"pageTitles"}>
        <div className={"pageTitle"}>TLÜ x PALLAS</div>
        <div className={"pageSubtitle"}>Admin</div>
      </div>
      <div className={"formCard"}>
        <div className={"cardTitle"}>Sisse logimine</div>
        <div className={"cardForm"}>
          <div className={"inputDiv"}>
            <div className={"title"}>Username</div>
            <input placeholder={"Username"} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className={"inputDiv"}>
            <div className={"title"}>Password</div>
            <input type={"password"} placeholder={"Password"}  onChange={(e) => setPass(e.target.value)} />
          </div>
          <button className={"modalSubmitButton"} onClick={() => handleLogin()}>Login</button>
          <Link to={"/registration"} className={"link"}>
            Registreeru
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
