import { showFormattedDate } from '../../utils';
import { getNote } from '../../utils/local-data'
import { useNavigate, useParams } from 'react-router-dom'

const DetailPage = () => {
  const { id } = useParams();
  const note = getNote(id);

  return (
    <section className="text-white app-container d-flex flex-column justify-content-center">
        <div className="detail-page w-75">
            <div className="detail-page__title">
              { note.title }
            </div>
        
            <div className="detail-page__createdAt">
              { showFormattedDate(note.createdAt) }
            </div>
          
            <div className="detail-page__body">
              { note.body }
            </div>
        </div> 
    </section>
  )
}

export default DetailPage;
