import React, { useEffect, useState } from 'react'
import { deleteNote, getAllNotes, getNote } from '../../utils/local-data'
import DetailPage from '../DetailPage';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [Contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setContacts(getAllNotes());
  }, [])

  const getDetailedNote = (id) => {
	navigate(`/${ id }`)
  }
  const getRemainingNotes = (id) => {
	deleteNote(id);
	setContacts( );
  }

  return (
    <main className="main">
	<div className="app-container body">
        <div className="notes-list">
			{
				Contacts.map((contact) =>
					{
						return (
							<div key={ contact.id } className="note-item">
								<div className="note-item__title">
									{ contact.title }
								</div>

								<div className="note-item__createdAt">
									{
										new Date(contact.createdAt).toLocaleDateString("id-ID", {
											day: "numeric",
											month: "long",
											year: "numeric"
										}) 
									}
								</div>

								<div className="note-item__body">
									{ contact.body }
								</div>
								<button type="button" onClick={() => getRemainingNotes(contact.id)}>Delete</button>
							</div>
						) 
					}
				)
			}
        </div>
	</div>
		
    </main>
  )
}

export default HomePage
