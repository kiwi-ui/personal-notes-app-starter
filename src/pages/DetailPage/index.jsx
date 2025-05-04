import React from 'react'
import { getNote } from '../../utils/local-data'
import { useParams } from 'react-router-dom'

const DetailPage = ({ selectedContact }) => {
  const { id } = useParams();
  const note = getNote(id);

  return (
    <>
    {note ? 

<div className="note-item">
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
      </div>
      : 
      <div className="note-list-empty">
        <p className="p">"Tidak ada catatan"</p> 
      </div>
    }
    </>
  )
}

export default DetailPage