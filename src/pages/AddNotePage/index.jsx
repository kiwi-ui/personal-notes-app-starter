import { useState } from 'react'
import { addNote } from '../../utils/network-data';

const AddNotePage = () => {
  const [formData, setFormData] = useState({
    title: '',
    body: ''
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleAddNote = async(event) => {
    event.preventDefault();
    if (!formData.title || !formData.body) {
      alert('Judul dan isi harus diisi');
      return;
    } else {
      await addNote(formData);
      setFormData({
        title: '',
        body: ''  
      })
    }
  }

  return (
    <section className="text-white app-container d-flex flex-column justify-content-center w-75 mx-auto">
        <h1 className="text-center mb-3">Tambah Catatan</h1>
        <form onSubmit={ handleAddNote }>
            <div className="mb-3">
                <label className="form-label mb-2" for="title">Judul</label>
                <input 
                    className="form-control"
                    type="text"
                    id="title"
                    name="title"
                    value={ formData.title }
                    onChange={ handleChange }
                />
            </div>

            <div className="mb-3">
                <label className="form-label mb-2" for="body">Isi</label>
                <textarea
                    className="form-control"
                    id="body"
                    name="body"
                    value={ formData.body }
                    onChange={ handleChange }
                    rows="3"
                />
            </div>

            <button className="btn-sbmt btn text-white fw-semibold" type="submit">Submit</button>
        </form>
    </section>
  );
};

export default AddNotePage;
