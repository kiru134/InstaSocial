import Navbar from "../Navbar";
import "./messaging.css";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";

const Messaging = () => {
  document.title = "InstaSphere-Chats";
  return (
    <>
      <div className="messagemaincontainer">
        <Navbar></Navbar>
        <div className="messagecontainer">
          {/* add a div if the user has newly logged in to the page * text="start a converation"*/}
          <div className="messageleft">
            <div className="messageleftheading">
              <div className="username">
                <h1>kiru_go_w_d_a</h1>
              </div>
            </div>
            <div className="messagingsubheading">
              <span>Messages</span>
            </div>
            <div aria-label="Chats" role="list" className="chatscontainer">
              <div className="userchatprofile">
                {/* map the user chat profile */}
              </div>
            </div>
          </div>
          {/* on click of each char right container with details should open up */}
          <div className="messageright">
            <div className="messagerightheader">
              <div className="messagerightheadercontents">
                <div className="chatprofileuserdetails">
                  <Link to="profile/:username">
                    <Avatar
                      style={{ width: "44px", height: "44px" }}
                      src=""
                    ></Avatar>
                  </Link>
                  <Link style={{ textDecoration: "none", color: "black" }}>
                    <span className="chatusername">Sourabh R</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="chatinputboxcontainer">
              <input className="messageinput"></input>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messaging;
