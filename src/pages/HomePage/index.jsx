import React, { useEffect, useState } from 'react';
import { archiveNote, deleteNote, getActiveNotes } from '../../utils/local-data'
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';

const HomePage = () => {
  const [Contacts, setContacts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword' || '');
  const navigate = useNavigate();

  useEffect(() => {
	const activeNotes = getActiveNotes();
	  if (keyword) {
		const filteredNotes = activeNotes.filter((note) =>
		  note.title.toLowerCase().includes(keyword.toLowerCase()) ||
		  note.body.toLowerCase().includes(keyword.toLowerCase())
		);
		setContacts(filteredNotes);
	  } else {
		setContacts(activeNotes);
	  }
  }, [keyword])


  const handleSearch = (query) => {
//   const activeNotes = getActiveNotes();

//   const notes = activeNotes.filter((note) => note.body.toLocaleLowerCase().includes(event)) || note.title.toLowerCase().includes(event.toLowerCase());
	setSearchParams({keyword: query})
	// setContacts(notes);
  }

  const handleGetDetailed = (id) => {
	navigate(`/detail/${ id }`);
  }

  const handleDeleteNote = (id) => {
	const confirmDelete = window.confirm('Yakin ingin menghapus catatan ini?');
	if(confirmDelete){
	  deleteNote(id);
	  setContacts(getActiveNotes());
	}
  }

  const handleArchive = (id) => {
	archiveNote(id);
	setContacts(getActiveNotes());
  }

  return (
    <main className="main">
		<button type="button" onClick={ () => navigate('/notes/new')}>Tambah Catatan</button>
		<button type="button" onClick={ () => navigate('/archive') }>Archived pages</button>
		<SearchBar onSearch={ handleSearch }/>

		<div className="app-container body">
			{ 
				Contacts.length ? 
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
					</div> 
			}
		</div>
    </main>
  )
}

export default HomePage
