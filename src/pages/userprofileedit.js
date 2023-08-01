import "./userprofiledit.css";
import Navbar from "../Components/Navbar";
import { Avatar, Modal, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux/es/hooks/useSelector";
import useHttp from "../Hooks/usehttphook";
import { useState, useRef, useCallback, useEffect } from "react";
import Profileuploadmodal from "../Components/profilepicuploadmodal";
import AccountTypeModal from "../Components/accountypemodal";
import Snackbarcomp from "../Components/snackbar";
import { useDispatch } from "react-redux";
import { editUser } from "../features/UserSlice";

const UserprofileEdit = () => {
  console.log("inside edit profile");
  let user = useSelector((state) => state.data.user);
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [profilepic, setprofilepic] = useState(user.userauth.dp);
  const [accountType, setaccountType] = useState("");
  const [accountypemodal, setaccounttypeModal] = useState(false);
  const acounttypref = useRef(null);
  const [updatedfullname, setUpatedfullname] = useState("");
  const [updatedpassword, setUpdated] = useState("");
  const [updatedemail, setUpdatedemail] = useState("");
  const passwordInputRef = useRef();
  const emailInputRef = useRef();
  const userfullnameInputRef = useRef();
  const { isLoading, error, sendRequest: updateUser } = useHttp();
  const { Loading, profileerror, sendRequest: fetchUser } = useHttp();
  const [updatedprofile, setupadateprofile] = useState(false);
  const [profile, setupdateduser] = useState({});
  const[{defaultbio,defaultcount},setdefaultbio]=useState({});

  const [{ content, wordCount }, setContent] = useState({});
  const userbioInputRef = useRef(null);
  let errormessage = "";
  let emailerrormessage = "";
  let userfullnameerrormsg = "";
  const limit = 150;



  const BASE_URL = process.env.REACT_APP_BASE_URL;
  //   const [usernameblur, setusernametouched] = useState(false);
  //   const [passwordblur, setpasswordtouched] = useState(false);
  //   const [emailblur, setEnteredemailtouched] = useState(false);

  const handleclick = () => {
    setOpenModal(true);
  };
  // const setaccountTypefrommodal = (acctype) => {
  //   setaccountType(acctype);
  //   console.log(acctype);
  // };
  const populateuserprofile=(data)=>{
    setUpatedfullname(data.fullname);
    setUpdatedemail(data.email);
    setContent(data.bio,limit)
    setdefaultbio({defaultbio:data.bio,defaultcount:data.bio.length});
    console.log(content)
    setaccountType(data.public===1?"PUBLIC":"PRIVATE")

  }
  

  useEffect(()=>{
      console.log("inside fetch profileuser details");
      const awaituserprofile = async () => {
        await fetchUser(
          {
            url: BASE_URL + `users/user/${encodeURIComponent(user.userauth.username)}`,
            headers: { "Content-Type": "application/json" },
          },
          populateuserprofile
        );
      };
      awaituserprofile();
  
  },[])

  const emailValidate = (emailentered) => {
    // if (emailentered.length < 0) {
    //   emailerrormessage = "Email must not be Empty";
    //   return false;
    // }
    if (emailentered.length > 1) {
      if (/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(emailentered)) {
        return true;
      } else {
        emailerrormessage = "Please Enter a Valid Email!";
        return false;
      }
    }
  };

  const passwordValidate = (passwordentered) => {
    if (passwordentered.length > 1) {
      // if (passwordentered.length < 8) {
      //   errormessage = "Password must contain at least 8 characters!";
      //   return false;
      // }
      if (passwordentered.length > 10) {
        errormessage =
          "Password must be minimum 8 characters and max 10 characters long!";
        return false;
      }
      const num = /[0-9]/;
      if (!num.test(passwordentered)) {
        errormessage = "password must contain at least one number (0-9)!";
        return false;
      }
      const alp = /[a-z]/;
      if (!alp.test(passwordentered)) {
        errormessage =
          "password must contain at least one lowercase letter (a-z)!";

        return false;
      }
      const specialchar = /[@$!%*?&]/;
      if (!specialchar.test(passwordentered)) {
        errormessage = "password must contain at least one special character";

        return false;
      }
      const cap = /[A-Z]/;
      if (!cap.test(passwordentered)) {
        errormessage =
          "password must contain at least one uppercase letter (A-Z)!";

        return false;
      } else {
        if (passwordentered == "") {
          errormessage = "";
          return false;
        }
      }
      return true;
    }
  };

  const validatefullname = (fullname) => {
    if (fullname.length > 1) {
      if (fullname.length >= 30) {
        userfullnameerrormsg = "FullName must be les than 30 characters long!";
        return false;
      } else {
        userfullnameerrormsg = "";
        return true;
      }
    }
  };

  const enteredemailisvalid = emailValidate(updatedemail.trim());
  const enteredPasswordisValid = passwordValidate(updatedpassword);
  const enteredfullnameisValid = validatefullname(updatedfullname);



  useEffect(() => {
    if (updatedprofile === true) {
      dispatch(
        editUser({
          dp: profilepic,
        })

        // authToken: null,
        // authTokenType: "",
        // username: "",
        // userId: "",
        // })
      );
      console.log(updatedprofile);
      console.log("dispacthed action successfully");
    }
  }, [updatedprofile]);

  const updatevalidate = (data) => {
    if (data.username != "") {
      setupadateprofile(true);
      setupdateduser(data);
      console.log("Updated successfully");
    }
  };
  const handleeditprofilesubmit = (event) => {
    event.preventDefault();

    const json_string = JSON.stringify({
      username: user.userauth.username,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
      public: accountType === "PUBLIC" ? 1 : 0,
      dp: profilepic,
      bio: content,
      fullname: userfullnameInputRef.current.value,
    });

    updateUser(
      {
        url: BASE_URL + "users/update",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: json_string,
      },
      updatevalidate
    );
  };

  console.log("acc" + accountType);

  console.log(accountypemodal);

  const handlepasswordKeyDown = (event) => {
    setUpdated(passwordInputRef.current.value);
  };
  const handleemailKeyDown = (event) => {
    setUpdatedemail(emailInputRef.current.value);
  };
  const handleuserfullnamekeydown = () => {
    setUpatedfullname(userfullnameInputRef.current.value);
  };
  const openaccountmodal = () => {
    setaccounttypeModal(true);
  };
  const handleaccountmodalclose = (acctpe) => {
    console.log(acctpe);
    setaccountType(acctpe);
    setaccounttypeModal(false);
  };

  const setFormattedContent = useCallback(
    (text) => {
      let words = text.trim();
      if (words.length > limit) {
        setContent({
          content: words.slice(0, limit).join(" "),
          wordCount: limit,
        });
      } else {
        setContent({ content: text, wordCount: words.length });
      }
    },
    [limit,setContent]
  );

  return (
    <>
      {/*   "username": "string",
  "email": "string",
  "password": "string",
  "public": 0,
  "dp": "string",
  "newusername": "string" */}
      <Navbar></Navbar>
      <div className="editprofilecontainer">
        <div className="settingheader">
          <h1>Settings</h1>
        </div>
        <div className="settingsectioncontainer">
          <div className="settingsubcontainerheading">
            <h2>Edit Profile</h2>
            <form>
              <div className="usernameditcontainer">
                <div style={{ margin: "0px 40px" }}>
                  <Avatar
                    style={{ height: "80px", width: "80px" }}
                    src={profilepic}
                  ></Avatar>
                </div>
                <div className="userinfocontainer">
                  <span>{user.userauth.username}</span>
                  <button type="button" onClick={handleclick}>
                    Change Profile Photo
                  </button>

                  {openModal && (
                    <Profileuploadmodal
                      modalclose={() => setOpenModal(!openModal)}
                      setuploadedpic={setprofilepic}
                      username={user.userauth.username}
                    />
                  )}
                </div>
              </div>
              <div className="bioeditfield">
                <aside style={{ width: "120px" }}>Bio</aside>
                <div className="biotextfieldcontainer">
                  <textarea
                    ref={userbioInputRef}
                    id="bio"
                    type="text"
                    autoCapitalize="off"
                    autoCorrect="off"
                    maxLength="125"
                    onChange={(event) =>
                      setFormattedContent(event.target.value)
                      
                    }
                    value={content===undefined?defaultbio:content}
                    //   onKeyDown={handleuserfullnamekeydown}
                    rows="2"
                    cols="50"
                  />
                  <span className="wordcountfield">
                    {wordCount===undefined?defaultcount:wordCount}/{limit}
                  </span>
                </div>
              </div>

              <div className="inputfields">
                <span className="fullnamespan">FullName</span>
                <input
                  ref={userfullnameInputRef}
                  id="FullName"
                  type="text"
                  autoCapitalize="off"
                  autoCorrect="off"
                  maxLength="75"
                  onChange={handleuserfullnamekeydown}
                  placeholder="FullName"
                  value={updatedfullname}
                />
              </div>
              {!enteredfullnameisValid && (
                <p className="errortext">{userfullnameerrormsg}</p>
              )}
              <div className="inputfields">
                <span className="passwordspan">New Password</span>
                <input
                  ref={passwordInputRef}
                  id="password"
                  type="password"
                  // value={password}
                  placeholder="Password"
                  onChange={handlepasswordKeyDown}
                  
                />
              </div>
              {!enteredPasswordisValid && (
                <p className="errortext">{errormessage}</p>
              )}

              <div className="inputfields">
                <span className="emailspan">Email</span>
                <input
                  ref={emailInputRef}
                  id="email"
                  type="email"
                  onChange={handleemailKeyDown}
                  placeholder="Email address"
                  value={updatedemail}
                  // onChange={emailInputChangeHandler}
                />
              </div>
              {!enteredemailisvalid && (
                <p className="errortext">{emailerrormessage}</p>
              )}

              <div className="accountfield">
                <span className="accountype">Account Type</span>
                <input
                  className="accountinput"
                  type="button"
                  onClick={openaccountmodal}
                  value={accountType}
                  ref={acounttypref}
                ></input>
                <AccountTypeModal
                  openaccmodal={accountypemodal}
                  modalclose={handleaccountmodalclose}
                  // modalclose={setaccounttypeModal(false)}
                />
              </div>
              <div className="usereditedsubmit">
                <button
                  type="submit"
                  onClick={handleeditprofilesubmit}
                  disabled={
                    !(
                      enteredPasswordisValid ||
                      enteredemailisvalid ||
                      enteredfullnameisValid ||
                      accountType !== "" ||
                      userbioInputRef !== null
                    )
                  }
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {updatedprofile && (
        <Snackbarcomp
          openmodal={true}
          message={updatedprofile ? "Updated Successfully" : error}
        />
      )}
      {error && <Snackbarcomp openmodal={true} message={error} />}
    </>
  );
};

export default UserprofileEdit;
