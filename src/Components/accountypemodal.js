import { Modal, makeStyles } from "@material-ui/core";
import { useState } from "react";
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
    height: 180,
    borderRadius: "12px",
    boxShadow: theme.shadows[5],
    border: "0px",

    // padding: theme.spacing(2, 4, 3)
  },
}));
const AccountTypeModal = (props) => {
  const modalclasses = useStyles();
  const [modalStyle, setModalStyle] = useState(getModalStyle);
  const [accounttype, setacc] = useState("");
  const handleonclose = () => {
    props.modalclose(accounttype);
  };
  console.log(props.setaccountype);
  console.log(props.modalclose);
  console.log(props);
  const selectaccounttype = (e) => {
    console.log(e.target.value);
    setacc(e.target.value);
  };
  console.log("insideaccountmodal");
  return (
    <Modal open={props.openaccmodal} onClose={handleonclose}>
      <div style={modalStyle} className={modalclasses.paper}>
        <div className="accountmodaltitle">
          <span>Account Type</span>
        </div>
        <div className="accountyperadiocontainer">
          <fieldset className="fieldsetaccountype">
            <div className="accountypeinputfields">
              <input
                type="radio"
                id="public"
                name="accounttype"
                value="PUBLIC"
                onClick={selectaccounttype}
              />
              <label htmlFor="public">PUBLIC</label>
            </div>
            <div className="accountypeinputfields">
              <input
                type="radio"
                id="private"
                name="accounttype"
                value="PRIVATE"
                onClick={selectaccounttype}
              />
              <label htmlFor="private">PRIVATE</label>
            </div>
          </fieldset>
        </div>
        <div className="donebuttoncontainer">
          <button className="Donebutton" onClick={handleonclose}>
            Done
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default AccountTypeModal;
