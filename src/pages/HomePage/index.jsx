import React, { useEffect, useState } from 'react'
import { addNote, deleteNote, getAllNotes, getNote } from '../../utils/local-data'
import { useNavigate } from 'react-router-dom';
import FormAddNewNote from '../../components/Modal/FormAddNewNote';

const HomePage = () => {
  const [Contacts, setContacts] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    body: ''
  });
  useEffect(() => {
    setContacts(getAllNotes());
  }, [])

  const getDetailedNote = (id) => {
	navigate(`/${ id }`);
  }
  const handleDeleteNote = (id) => {
	deleteNote(id);
	setContacts(getAllNotes(id));
  }
   const handleChange = (event) => {
	  const { name, value } = event.target;
	  setFormData({
		...formData,
		[name]: value
	  });
	};
	
	const handleAddNote = (event) => {
		event.preventDefault();
		addNote(formData)
		setContacts(getAllNotes);
	  };
	
// 	const handleAddNote = () => {
// 	setShowModal(e => !e);

// 	// addNote();
// 	console.log(showModal)
//   }

  return (
    <main className="main">
		<button type="button" onClick={ () => setShowModal(e => !e) }>Tambah Catatan</button>
		{ showModal && <FormAddNewNote handleChange={ handleChange } handleAddNote={ handleAddNote } formData={formData}/> }
		
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
									<button type="button" onClick={() => handleDeleteNote(contact.id)}>Delete</button>
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
