import React from "react"
import { UserSession, AppConfig } from "blockstack"
import Login from "./login"
import Logedin from "./logedin"

const appConfig = new AppConfig(["store_write"])
const userSession = new UserSession({ appConfig: appConfig })


class App extends React.Component {
  UNSAFE_componentWillMount() {
    if (userSession.isSignInPending()) {
      userSession
        .handlePendingSignIn()
        .then(() => {
          window.location = window.location.origin;
        })
        .catch(err => console.log(err));
    }
  }
  render() {
    return (
      <div>
        {userSession.isUserSignedIn() ? (
          <Logedin userSession={userSession} />
        ) : (
          <Login userSession={userSession} />
        )}
      </div>
    )
  }
}

export default App