import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";
import "./App.css";

function App() {
  const [account, setAccount] = useState(null);

  const responseFacebook = (response) => {
    if (response.accessToken) {
      setAccount({
        name: response.name,
        email: response.email,
        picture: response.picture.data.url,
      });
    }
  };

  return (
    <div className="App">
      <h1>Đăng nhập Facebook</h1>
      {account ? (
        <div className="account-info">
          <img src={account.picture} alt="Profile" className="profile-pic" />
          <table>
            <tbody>
              <tr>
                <td>Tên:</td>
                <td>{account.name}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{account.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <FacebookLogin
          appId="1052016440060467"
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
          textButton="Đăng nhập bằng Facebook"
          cssClass="facebook-button"
          version="17.0"
        />
      )}
    </div>
  );
}

export default App;
