import '../App.css';
import React, {
    useState,  
    useEffect
  } from 'react';
  import { 
    useNavigate 
  } from 'react-router-dom';
  import axios from 'axios';
  // D
  import { useDispatch, useSelector } from 'react-redux';
//   import actions, {handleAdd} from '../../actions.js'
// import Autosuggest from 'react-autosuggest';


  function Community() {
    const [communityData, setCommunityData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
  
    useEffect(() => {
        console.log("Community Search")
        axios.get(`http://localhost:5000/posts?searchTerm=${searchTerm}`)
          .then(response => {
            console.log()
            setCommunityData(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      }, [searchTerm]);
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
      };
      


  return (
    <div className="Community">
      Community
      <div>
        <input
          type="text"
          placeholder="Search posts"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      
<div class="communityContainer">
    <div class=" cards">
        <div class="card">
            <h2>EXAMPLE community post title: What do I try in New York?</h2>
            <div class="card__content">
                <p>
                    EXAMPLE post details: Think you're up to the challenge. Recently picked up running and trying to keep improving
                </p>
                <div>Posted by: user</div>
                <div class="card_stats">
                    <div>
                        <p>Likes: </p>
                    </div>
                    <div>
                        <p>Comments: </p>
                    </div>
                </div>
            </div>
        </div>
        {communityData.map((post) => (
          <div class="card">
            <h2>{post.title}</h2>
            <div class="card__content">
              <p>{post.content}</p>
              <div>Posted by: {post.username}</div>
              <div class="card_stats">
                <div>
                  <p>Likes: {post.likes}</p>
                </div>
                <div>
                  <p>Comments: {post.comments}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>

    </div>
    </div>
  );
}

export default Community;
