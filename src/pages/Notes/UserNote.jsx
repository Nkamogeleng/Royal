import { useState } from "react";
import AddNote from "../../components/notes/addnote";
import useContextGetter from "../../hooks/useContextGetter";
import Header from '../../components/header/header';
const UserNote = () => {
  const {
    dispatch,
    state: { userData },
  } = useContextGetter();
  // const userNotes = notes.filter((item) => item.userid === userData.id);

  const [alertMessage, setAlertMessage] = useState({
    message: "",
    variant: "",
  });

  // // Sets note to edit
  // function handleEdit({ _id, userid, topic, title, note }){
  //   setNoteToEdit({ _id, userid, topic, title, note });
  // };

  
  const addNote = ({ topic, note, title }) => {
    setAlertMessage({ message: "sending request...", variant: "info" });
    let newnote = {
      topic: topic,
      title: title,
      note: note,
      userid: userData.id,
      useremail: userData.email,
    };

    fetch(`https://staging-express-api.herokuapp.com/notes`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newnote),
    })
      .then((res) => res.json())
      .then((result) => {
        dispatch({
          type: "NEW_NOTE",
          payload: result.data,
        });
        setAlertMessage({ message: result.message, variant: "success" });
      })
      .catch((err) => {
        console.log("this error occurred", err);
        setAlertMessage({
          message: "An error occured, please try again",
          variant: "danger",
        });
      });
  };
  return (
    <main>
      <Header pageTitle={`Add Note`}/>
      <div className="py-3 px-3">
        <AddNote
          addNote={addNote}
          alertMessage={alertMessage}
        />
        
      </div>
    </main>
  );
};
export default UserNote;


