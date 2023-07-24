import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function CreateNote(props) {
    const [note, setNote] = useState({
        title: "",
        content: "",
    });

    const [isExpended, setExpended] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;

        setNote((prevNote) => {
            return {
                ...prevNote,
                [name]: value,
            };
        });
    }

    function submitNote(event) {
        event.preventDefault();

        props.onAdd(note);

        setNote({
            title: "",
            content: "",
        });
    }

    function expendNote() {
        setExpended(true);
    }

    return (
        <div>
            <form className="create-note">
                {isExpended && (
                    <input
                        onChange={handleChange}
                        name="title"
                        placeholder="Title"
                        value={note.title}
                    />
                )}

                <textarea
                    onClick={expendNote}
                    onChange={handleChange}
                    name="content"
                    placeholder="Take a note..."
                    rows={isExpended ? 4 : 1}
                    value={note.content}
                />

                <Zoom in={isExpended}>
                    <Fab onClick={submitNote}>
                        <AddIcon />
                    </Fab>
                </Zoom>
            </form>
        </div>
    );
}

export default CreateNote;
