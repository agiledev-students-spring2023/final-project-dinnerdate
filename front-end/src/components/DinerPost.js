import './dinerpost.css'
const DinerPost = (props) => {
    return (
        <div className={props.isSelected ? "diner-post selected" : "diner-post"} onClick={() => props.onClick(props.id)}>
            <div>
                {/* profile picture here */}
            </div>
            <div className="diner-info"> 
                <h2 className="text">{props.title}</h2>
                <h5 className="text">{props.date} at {props.time}</h5>
                <h3 className="text">{props.author} {props.rating}⭐ ({props.num_ratings} reviews)</h3>
                {/* title, date, time, author, rating, num_ratings */}
            </div>
        </div>
    );
}

export default DinerPost;