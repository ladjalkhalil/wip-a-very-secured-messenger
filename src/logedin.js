import React  from "react"
import iconsend from "./images/iconsend.png"
import iconmic from "./images/iconmic.png"
import iconlens from "./images/iconlens.png"
import { Person } from "blockstack"
import ReactRoundedImage from "react-rounded-image";




//import { Person } from "blockstack"

class Logedin extends React.Component {
  
  //my state
   state = {
    contacts: [{id:"15EJPHFQN8HFrucs4ft7ytDtGJhqNnjGHE",username: "Wash the dishes"}],
      
    messages: [],
    newMessage: "",
    user: null, //user profile set to null
    curTime : "",
  }
  //handle signout
  handleSignout = () => {
    this.props.userSession.signUserOut(window.location.origin)
  }


  componentDidMount() {
    this.fetchData();
}
hanldeInputChange = e => {
  this.setState({
    newMessage: e.target.value,
    curTime:new Date().toLocaleString()
  })
}


handleAddMessageClick = e => {
  e.preventDefault()
  const newMessage = {
    id: this.state.messages.length + 1,
    content: this.state.newMessage,
    time : this.state.curTime,
  
  }
  const messages = [...this.state.messages]
  messages.push(newMessage)
  const options = { encrypt: true }
  this.props.userSession
    .putFile("messages.json", JSON.stringify(messages), options)
    .then(() => {
      this.setState({
        messages,
        newMessage: "",
      })
    })
}

async fetchData() {
  const options = { decrypt: true };
  const file = await this.props.userSession.getFile("messages.json", options);
  let messages = JSON.parse(file || "[]");
  this.setState({
    messages,
    user: new Person(this.props.userSession.loadUserData().profile)
  });
}
  render() {
    const { user } = this.state;
    return (




<div
       style={{ flex:1 ,display:'flex',color:'#fafafa',backgroundColor:'#000a12',
               margin:'0vh !important', padding:'0vh !important',  height: '100vh',
               left:'0vh' , position:'absolute',right:'0vh',top:'0vh',bottom:'0vh'}}
       className="App container" >

         {/* options div */ }
          <div className="Options div"
              style={{backgroundColor:'#000a12' , alignSelf:'flex-start',flex:0.25
              ,height: '100vh', margin:'0 !important', padding:'0 !important',
              border: '0.5px solid rgba(236, 239, 241, 0.5)',}}>
                   <button className="ui button negative" onClick={this.handleSignout}>
                   Sign out
                   </button>
          </div>

        {/* search and contacts div  */}
        <div className="search and cotnacts div"
             style={{backgroundColor:'#000a12' , alignSelf:'center' , flex:0.7, height:'100vh',
                     margin:'0 !important', padding:'0 !important',
                     border: '0.5px solid rgba(236, 239, 241, 0.5)',}}>
           <div className="search div">
              search div
           </div>
           <div className="conacts div">
              contacts
        </div>

        </div>


       {/* // //user information  and chat*/}
        <div  className="userInfo and chat"
               style={{ justifyContent:'flex-end', flex:2,height:'100vh'


         }} >
          <div className="userInfo 1"
               style={{  display:'flex',
                         height:'10pv', border: '0.5px solid rgba(236, 239, 241, 0.5)',
          }}>

              <div className="userInfo 2"
                   style={{marginLeft:'70%',
                   marginBottom:'8px', marginTop:'8px', borderRadius:'50px',width:'30%',display:'flex',
                   marginRight:'5%', height:'40px',alignContent:'space-around',
                   border: '0.5px solid rgba(236, 239, 241, 0.5)',

                                }}>
                           <div style={{paddingLeft:'3%',}}>
                                <ReactRoundedImage 
                                          image={user &&   user.avatarUrl()}
                                          roundedColor="#321124"
                                          imageWidth="40"
                                          imageHeight="40"
                                          roundedSize="5"
                                          borderRadius="70"
                                          hoverColor="#DD1144" 
                                        />
                           </div>

                        <div style={{padding:'5%',}}>
                          {user && user.name()}

                        </div>

                    </div>
          </div>
            <div className="flex display" style={{display:'flex',height:'90vh',flex:'1'
                                                  }}>
                    <div className="contact chat and input"
                          style={{border: '0.5px solid rgba(236, 239, 241, 0.5)',flex:'8.6'
                                                                    }}>
                              <div className=" contact info"
                                    style={{alignSelf:'stretch'
                                            ,border: '0.5px solid rgba(236, 239, 241, 0.5)', 
                                             padding:'1.5%', }}>
                                contact info
                              </div>
                              <div className=" chat" style={{ alignSelf:'stretch',height:'67%'
                                            ,border: '0.5px solid rgba(236, 239, 241, 0.5)', 
                                             padding:'2%',}}>

                                       <h3>Chat box</h3>

                                        <div className="grouped fields" 
                                              style={{ alignSelf:'center',
                                                      
                                                      border: '0.5px solid rgba(236, 239, 241, 0.5)',
                                                      width:'100%',height:'80%',
                                                      borderRadius:"18px",overflow:'scroll'
                                        }}>

                                          {this.state.messages
                                             
                                            .map(message => (
                                              <div key={message.id} className="show message field"
                                                    style={{ alignSelf:'center',
                                                    padding:'1%',}}>
                                                  
                                                   {message.content}: ........
                                                   ...................{message.time}
                                                
                                              </div>
                                            ))}
                                        </div>
                              
                              </div>
                              <div className=" text input" style={{padding:'3%',paddingLeft:'10%',height:'13%',
                                                                    marginBottom:'0% !important'}}>
                                    <input  style={{color:'#fafafa',backgroundColor:'#000a12',
                                                    borderRadius:'50px',
                                                    width:'90%',height:'60px',}}
                                      type="text"
                                      value={this.state.newMessage}
                                      onChange={this.hanldeInputChange}
                                    />
                              </div>
                    </div>

                    <div className="chat options" 
                          style={{ display:"list-item",
                                  border: '0.5px solid rgba(236, 239, 241, 0.5)',flex:'1.4',
                                  
                                                           }}>


                           <div className="options" 
                                style={{height:'60%',display:'row',padding:'30%',  }}>

                                  <div className="div sghir" style={{height:'30%',display:'row', width:'80%',
                                                marging:'20%',}}>
                                        <img src={iconlens} alt="icon imge  " 
                                                style={{width:'40px',height:'40px',marginBottom:'20px',
                                                }}/>  

                                      <img src={iconmic} alt="mic icon  " style={{width:'40px',height:'40px'}}/>  
                                  </div>

                           </div>



                           <div className="send button"
                                 style={{height:'60%',padding:'30%',paddingTop:'60%',width:'50%'}}>
                                  <div className="div sghir"  style={{height:'10%', width:'80%',
                                                marging:'30%',}}>
                                    <form className="ui form" onSubmit={this.handleAddMessageClick}>
                                      <button className="submit message" type="submit"
                                              style={{width:'47px',height:'47px',padding:'0%',
                                            borderRadius:'50px',backgroundColor:'#000a12',
                                             
                                             }}>
                                          <img src={iconsend} alt="send icon  " 
                                                     style={{width:'44px',height:'44px',marging:'2px'}}/>   
                                     </button>  
                                    </form>         
                                  </div>

                           </div>
                          {/* options photo and mic */}
                        {/* <div className="options" style={{alignSelf:'center',position:'absolute',
                                                         padding:'2%',flex:'8',height:'60%',
                                                         border: '0.5px solid rgba(236, 239, 241, 0.5)',}}>                                    
                            <img src={iconlens} alt="icon imge  " 
                                       style={{width:'40px',height:'40px',marginBottom:'20px',
                                      }}/>  

                            <img src={iconmic} alt="mic icon  " style={{width:'40px',height:'40px'}}/>   
                        </div>  */}

                        {/* send button */}
                        {/* <div className="send button" style={{ borderRadius:'200px',flex:'2',
                                                             paddingTop:'40%',position:'absolute',
                                                             margin:'2%',
                                                            border: '0.5px solid rgba(236, 239, 241, 0.5)',}}>

                            <button style={{width:'45px',height:'45px',position:'absolute',
                                            borderRadius:'50px',backgroundColor:'#000a12',
                                            padding:'1.5%',
                                             }}>
                              <img src={iconsend} alt="send icon  " 
                                 style={{width:'45px',height:'45px',}}/>   
                           </button>           
                        </div> */}
                    </div>
            </div>
        </div>


      </div>//parent div
        )
  }
}
export default Logedin

// const UserDiv = {
//   backgroundColor:'blue',
//   position: 'absolute',
//   right: 5,
//   top: 5,
//   border: '1px solid rgba(0, 0, 0, 0.05)',
//   alignItems:'center', alignSelf:'flex-end'

// };

// const UserDiv2 = {
//   right: 5,
//   top: 5,
//   height: "45px",
//   width: "120px", border: '1px solid rgba(0, 0, 0, 0.05)',
//   borderRadius: '50px' ,  justifyContent: "space-between",




// };