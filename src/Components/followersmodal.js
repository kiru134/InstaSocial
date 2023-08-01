import { Modal, makeStyles } from "@material-ui/core";
import React, { useState, useEffect,useRef} from "react";
import { useNavigate, useParams } from "react-router-dom";
import useHttp from "../Hooks/usehttphook";
import "./followersmodal.css";
import Followerlist from "./followerlist";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    variant: "outlined",
    backgroundColor: theme.palette.background.paper,
    position: "absolute",
    width: 350,
    minHeight: 200,
    maxHeight: 400,
    borderRadius: "12px",
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 0, 3),
  },
}));

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Userfollowers = () => {
  const modalclasses = useStyles();
  const [modalStyle, setModalStyle] = useState(getModalStyle);
  const [openModal, setModal] = useState(true);
  const [followers, setfollowers] = useState({});
  const { isLoading, error, sendRequest: fetchprofileUser } = useHttp();
  const [searchInput, setSearchInput] = useState("");
  const [filtereddata,setFiltereddata] =useState({});
  let searchInputref = useRef(null);
  const navigate = useNavigate();
  let { username } = useParams();
  const handleonclose = () => {
    setModal(false);
    navigate(`/profile/${username}/`);
  };
  const getuserfollowers = (data) => {
    setfollowers(data.followers);
    setFiltereddata(data.followers);

  };
  useEffect(() => {
    const awaituserprofile = async () => {
      await fetchprofileUser(
        {
          url: BASE_URL + `users/user/${encodeURIComponent(username)}`,
          headers: { "Content-Type": "application/json" },
        },
        getuserfollowers
      );
    };
    awaituserprofile();
  }, []);
  console.log("insidefollowers");


  const searchItems=(searchval)=>{
      setSearchInput(searchval)
      if (searchInput !== '') {
        const filteredData =followers.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFiltereddata(filteredData)
    }
    else(setFiltereddata(followers))
  }



  const removefollower = (removeddata) => {
    if (removeddata != null) {
      setFiltereddata(filtereddata.filter((item) => item !== removeddata));
    }
  };
  return (
    <>
      <Modal open={openModal} onClose={handleonclose}>
        <div style={modalStyle} className={modalclasses.paper}>
          <div className="followerscontainer">
            <div className="followersmodalheader">
              <h1>Followers</h1>
            </div>
            <div className="followersmodalcontent">
              <div className="searchcomponent">
                <input
                  type="search"
                  placeholder="Search"
                  onChange={(e) => searchItems(e.target.value)}
                  ref={searchInputref}
                  value={searchInput}
                ></input>
              </div>
              {filtereddata.length >= 1 &&
                filtereddata.map((item) => (
                  <Followerlist
                    key={item.id}
                    follower={item}
                    profileuser={username}
                    setremovefollower={removefollower}
                  />
                ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Userfollowers;
