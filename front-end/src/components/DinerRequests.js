import DinerRequest from './DinerRequest.js'

const DinerRequests = (props) => {
  return (
    <div className='diner-requests'>
      {props.diners.map((dinerRequest) => (<DinerRequest
      key={dinerRequest.id}
      id={dinerRequest.id}
      author={dinerRequest.author}
      rating={dinerRequest.rating}
      num_ratings={dinerRequest.num_ratings}
      message={dinerRequest.message}
      isSelected={dinerRequest.id === props.selectedDiner}
      onClick={props.onClick}
      />))}
    </div>
  );
}

export default DinerRequests