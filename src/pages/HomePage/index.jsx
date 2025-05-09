import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ notes, setNotes, setParams, handleSearch, handleGetDetailed, handleDeleteNote, handleArchive, navigate } ) => {
//   const [notes, setNotes] = useState([]);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const keyword = searchParams.get('keyword' || '');
//   const navigate = useNavigate();

//   useEffect(() => {
// 	const activeNotes = getActiveNotes();
// 	  if (keyword) {
// 		const filteredNotes = activeNotes.filter((note) =>
// 		  note.title.toLowerCase().includes(keyword.toLowerCase()) ||
// 		  note.body.toLowerCase().includes(keyword.toLowerCase())
// 		);
// 		setNotes(filteredNotes);
// 	  } else {
// 		setNotes(activeNotes);
// 	  }
//   }, [keyword])


//   const handleSearch = (query) => {
// 	setSearchParams({keyword: query});
//   }

//   const handleGetDetailed = (id) => {
// 	navigate(`/detail/${ id }`);
//   }

//   const handleDeleteNote = (id) => {
// 	const confirmDelete = window.confirm('Yakin ingin menghapus catatan ini?');
// 	if(confirmDelete){
// 	  deleteNote(id);
// 	  setNotes(getActiveNotes());
// 	}
//   }

//   const handleArchive = (id) => {
// 	archiveNote(id);
// 	setNotes(getActiveNotes());
//   }

  return (
	<>
		{/* <header></header> */}
		<main className="main">
			<button type="button" onClick={ () => navigate('/notes/new')}>Tambah Catatan</button>
			<button type="button" onClick={ () => navigate('/archive') }>Archived pages</button>
			{/* <SearchBar onSearch={ handleSearch }/> */}

			<div className="app-container body">
				{ 
					notes.length ? 
						<div className="notes-list">
							{
								notes.map((note) =>
									{
										return (
											<div key={ note.id } className="note-item">
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

												<button type="button" onClick={ () => handleDeleteNote(note.id) }>Delete</button>
												<button type="button" onClick={ () => handleArchive(note.id) }>Simpan</button>
												<button type="button" onClick={ () => handleGetDetailed(note.id) }>See detail</button>	
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
	</>
  )
}

export default HomePage
