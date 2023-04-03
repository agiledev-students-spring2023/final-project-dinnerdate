import './DinerPost.css'
const DinerPost = (props) => {
    console.log(props);
    return (
        <div className={props.isSelected ? "diner-post selected" : "diner-post"} onClick={() => props.onClick(props.id)}>
            <div>
                {/* profile picture here */}
            </div>
            <div className="diner-info"> 
                <h2 className="text">{props.title}</h2>
                <h5 className="text">{props.datetime}</h5>
                <h3 className="text">{props.full_name} {props.rating}⭐ ({props.num_ratings} reviews)</h3>
            </div>
        </div>
    );
}

export default DinerPost;