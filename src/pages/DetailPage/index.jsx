import React from 'react'
import { getNote } from '../../utils/local-data'
import { useNavigate, useParams } from 'react-router-dom'

const DetailPage = () => {
  const { id } = useParams();
  const note = getNote(id);
  const navigate = useNavigate();

  return (
    <>
    <button type='button' onClick={ () => navigate('/') }>X</button>
    { note ? 
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