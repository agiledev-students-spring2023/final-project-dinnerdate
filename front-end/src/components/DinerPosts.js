import DinerPost from './DinerPost.js'
const DinerPosts = (props) => {
    return (
        <div className="diner-posts">
            {props.diners.map((dinerPost) => (<DinerPost 
                key={dinerPost.id}
                id={dinerPost.id}
                title={dinerPost.title} 
                date={dinerPost.date}
                time={dinerPost.time}
                author={dinerPost.author}
                rating={dinerPost.rating}
                num_ratings={dinerPost.num_ratings}
                isSelected={dinerPost.id === props.selectedDiner}
                onClick={props.onClick} />))}
        </div>
    );
}

export default DinerPosts;