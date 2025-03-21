import { useEffect, useState } from 'react'

import {YOUTUBE_API_URL} from "../utils/constants"
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';

const VideoContainer = () => {
  const [videos,setVideos] = useState([]);

  const getVideos = async ()=>{
    try {
      const p = await fetch(YOUTUBE_API_URL);
      const json = await p.json();
      // console.log(json);
      setVideos(json.items);
    }
    catch (e) {
      console.log(e);
    }
  }

  useEffect(()=>{
    getVideos();
  },[])

  if (videos.length === 0) return null;
  return (
    <div className="flex flex-wrap">
      {videos.map(video => 
      (
        <Link to={"/watch?v=" + video.id} key={video.id}>
          <VideoCard info={video}/>
        </Link>
      ))}
    </div>
  )
}

export default VideoContainer