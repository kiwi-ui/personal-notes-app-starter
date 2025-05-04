import React, { useEffect, useState } from 'react'
import { archiveNote, getActiveNotes, getArchivedNotes, unarchiveNote } from '../../utils/local-data';
import { useNavigate } from 'react-router-dom';

const ArchivePage = () => {
    const [archivedNote, setArchivedNote] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        setArchivedNote(getArchivedNotes());
        console.log(getArchivedNotes());
    }, [])

    const handleUnarchive = (id) => {
        unarchiveNote(id);
        setArchivedNote(getArchivedNotes());
    }
    return (
    <>
        <div onClick={() => navigate('/')}>back</div>
        {
         archivedNote.map((note,index) => 
         (
            <div key={ index } className="note-item">
                <div className="note-item__title">
                    { note.title }
                </div>

                <div className="note-item__createdAt">
                    {
                        new Date(note.createdAt).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                        }) 
                    }
                </div>

                <div className="note-item__body">
                    { note.body }
                </div>
                {/* <button type="button" onClick={() => handleDeleteNote(note.id)}>Delete</button> */}
                <button type="button" onClick={ () => handleUnarchive(note.id) }>Unarchive</button>
            </div>
         ))
         }
    </>
  )
}

export default ArchivePage
