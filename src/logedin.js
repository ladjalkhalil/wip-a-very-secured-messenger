import React from "react"

class Logedin extends React.Component {
    
  handleSignout = () => {
    this.props.userSession.signUserOut(window.location.origin)
  }
  
  render() {
    return (    
          <div
        style={{ padding: "30px 0" }}
        className="ui text container center aligned" >
        <div>Nice Meme</div>
        <button className="ui button negative" onClick={this.handleSignout}>
        Sign out
      </button>
      </div>
        )
  }
}
export default Logedin