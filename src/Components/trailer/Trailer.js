import {useParams} from 'react-router-dom';
import ReactPlayer from 'react-player';
import './Trailer.css';

import React from 'react'

const Trailer = () => {

    const { ytTrailerId: url } = useParams();
    // console.log(url);

  return (
    <div className="react-player-container">
      {(url!=null)?<ReactPlayer controls="true" playing={true} url ={`https://www.youtube.com/watch?v=${url}`} 
      width = '100%' height='100%' />:null}
    </div>
  )
}

export default Trailer