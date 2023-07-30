import { Modal, Snackbar } from "@material-ui/core";
import { useEffect, useState } from "react";
import useHttp from "../Hooks/usehttphook";

const DeleteConfirmation = ({
  openconfmodal,
  modalstyles,
  modalclasses,
  modalclosed,
  BASE_URL,
  postid,
  currentuser,
  postdeletedstatus,
}) => {
  const { isLoading, error, sendRequest: deletepost } = useHttp();
  const [displaySnackbar, setsnackbar] = useState(false);
  const [snackbarstatus, checksnackbardisplayed] = useState(false);
  const [postdeletestatus, setdeletestatus] = useState(false);

  const handleonclose = () => {
    modalclosed(false);
    postdeletedstatus(false, postid);
  };

  const deletestatus = (data) => {
    if (data === "ok") {
      console.log("inside function");
      setsnackbar(true);
      setdeletestatus(true);
      postdeletedstatus(true, postid);
    }
    console.log(data);
  };

  useEffect(() => {
    if (error != null) {
      setsnackbar(true);
    }
  }, [error]);
  const handlesnackbarclose = () => {
    setsnackbar(!displaySnackbar);
    checksnackbardisplayed(true);
  };
  useEffect(() => {
    if (snackbarstatus === true && postdeletestatus === true) {
      modalclosed(false);
    }
  }, []);

  const handledeltepost = async () => {
    // const json_string = JSON.stringify({
    //   id: postid,
    // });
    await deletepost(
      {
        url: BASE_URL + `post/delete/${postid}`,
        method: "DELETE",
        headers: new Headers({
          Authorization: "Bearer" + " " + currentuser.authToken,
          "Content-Type": "application/json",
        }),
      },
      deletestatus
    );
  };

  return (
    <>
      <Modal open={openconfmodal} onClose={handleonclose}>
        <div style={modalstyles} className={modalclasses.paper}>
          <div className="deletemodalcontainer">
            <div className="deleteconfirmationtitle">
              <span className="deletepostheading">Delete Post?</span>
              <span className="deletepostcontent">
                Are you sure that you want to delete this post from your
                profile?
              </span>
            </div>
            <button
              className="deleteconfirmationbutton"
              onClick={handledeltepost}
            >
              Delete
            </button>
            <button
              className="deleteconfirmationcancelbutton"
              onClick={handleonclose}
            >
              Cancel
            </button>
          </div>

          <Snackbar
            open={displaySnackbar}
            autoHideDuration={2000}
            onClose={handlesnackbarclose}
            message={error === null ? "Post Delted successfully" : error}
          />
        </div>
      </Modal>
    </>
  );
};

export default DeleteConfirmation;
