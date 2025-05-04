import React, { useEffect, useState } from 'react'
import { addNote, archiveNote, deleteNote, getActiveNotes, getAllNotes, getArchivedNotes, getNote, unarchiveNote } from '../../utils/local-data'
import { useNavigate } from 'react-router-dom';
import AddNotePage from '../AddNotePage';

const HomePage = () => {
  const [Contacts, setContacts] = useState([]);
//   const [formData, setFormData] = useState({
// 	  title: '',
// 	  body: ''
// 	});
  
  const navigate = useNavigate();

  useEffect(() => {
    setContacts(getActiveNotes());
  }, [])

  const handleGetDetailed = (id) => {
	navigate(`/${ id }`);
  }

  const handleDeleteNote = (id) => {
	deleteNote(id);
	setContacts(getAllNotes(id));
  }

	
	const handleAddNote = (event) => {
		event.preventDefault();
		addNote(formData);
		setContacts(getActiveNotes());
	  };
	
	const handleArchive = (id) => {
		archiveNote(id);
		setContacts(getActiveNotes());
		console.log(getArchivedNotes());
	}

  return (
    <main className="main">
		<button type="button" onClick={ () => navigate('/notes/new')}>Tambah Catatan</button>
		<button type="button" onClick={ () => navigate('/archive') }>Archived pages</button>
		
		<div className="app-container body">
			{Contacts.length ? 
	
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
									<button type="button" onClick={ () => handleDeleteNote(contact.id) }>Delete</button>
									<button type="button" onClick={ () => handleArchive(contact.id) }>Simpan</button>
									<button type="button" onClick={ () => handleGetDetailed(contact.id) }>See detail</button>	
								</div>
							) 
						}
					)
				}
			</div> 
			:
			<div className="note-list-empty">
				<p className="p">"Tidak ada catatan"</p> 
			</div>}
			
		</div>
    </main>
  )
}

export default HomePage
