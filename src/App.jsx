import React, { useState, useEffect } from "react";

import Header from "./components/Header.jsx";
import Note from "./components/Note.jsx";
import CreateNote from "./components/CreateNote.jsx";

function App() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetch(
            "", // API Endpoint Here To Fetch Data //
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                const loadedNotes = [];

                for (const key in data) {
                    loadedNotes.push({
                        id: key,
                        title: data[key].title,
                        content: data[key].content,
                    });
                }

                setNotes(loadedNotes);
            });
    }, []);

    function addNote(newNote) {
        if (newNote.title === "" && newNote.content === "") {
            return;
        }

        fetch(
            "", // API Endpoint Here To Store Data //
            {
                method: "POST",
                body: JSON.stringify(newNote),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        setNotes((prevNotes) => {
            return [...prevNotes, newNote];
        });
    }

    function deleteNote(id) {
        fetch(
            ``,
            // API Endpoint Here To Delete Data //
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        setNotes((prevNotes) => {
            return prevNotes.filter((noteItem, index) => index !== id);
        });
    }

    return (
        <div>
            <Header />
            <CreateNote onAdd={addNote} />
            <div className="note-container">
                {notes.map((noteItem, index) => {
                    return (
                        <Note
                            key={index}
                            id={index}
                            title={noteItem.title}
                            content={noteItem.content}
                            onDelete={deleteNote}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default App;
