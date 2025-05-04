import React, { useEffect, useState } from 'react'
import { archiveNote, getActiveNotes, getArchivedNotes } from '../../utils/local-data';

const ArchivePage = () => {
    const [archivedNote, setArchivedNote] = useState([])

    useEffect(() => {
        setArchivedNote(getArchivedNotes());
        console.log(getArchivedNotes());
    }, [])
    
    return (
    <>
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
                <button type="button" onClick={() => handleDeleteNote(note.id)}>Delete</button>
            </div>
         ))
         }
    </>
  )
}

export default ArchivePage
