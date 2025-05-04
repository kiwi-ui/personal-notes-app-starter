import React, { useState } from 'react'
import { addNote } from '../../utils/local-data';

const FormAddNewNote = ({formData, handleChange, handleAddNote}) => {
  return (
    <div>
      <form onSubmit={handleAddNote}>
        <div>
          <label htmlFor="title">judul</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="body">isi</label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
          />
        </div>

        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default FormAddNewNote;
