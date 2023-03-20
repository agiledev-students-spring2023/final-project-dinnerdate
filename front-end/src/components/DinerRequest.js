import './DinerRequest.css'
const DinerRequest = (props) => {
  console.log(props)
  return (
      <div className={props.isSelected ? "diner-request selected" : "diner-request"} onClick={() => props.onClick(props.id)}>
          <div>
              {/* profile picture here */}
          </div>
          <div className="diner-info"> 
              <h2 className="text">{props.author} <span className="text">{props.rating}⭐ ({props.num_ratings} reviews)</span></h2>
              <h4 className="text">{props.message}</h4>
              {/* title, date, time, author, rating, num_ratings */}
          </div>
      </div>
  );
}

export default DinerRequest