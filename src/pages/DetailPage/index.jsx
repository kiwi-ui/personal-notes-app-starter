import { showFormattedDate } from '../../utils';
import { useParams } from 'react-router-dom'
import { getNote } from '../../utils/network-data';
import { useEffect, useState } from 'react';

const DetailPage = () => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    handleGetDetailed();
  }, [])
  const handleGetDetailed = async () => {
    const { data } = await getNote(id);
    console.log(data)
    setNotes(data);
  };
  const { id } = useParams();

  return (
    <section className="text-white app-container d-flex flex-column justify-content-center">
        <div className="detail-page w-75">
            <div className="detail-page__title">
              { notes.title }
            </div>
        
            <div className="detail-page__createdAt">
              { showFormattedDate(notes.createdAt) }
            </div>
          
            <div className="detail-page__body">
              { notes.body }
            </div>
        </div> 
    </section>
  )
}

export default DetailPage;
