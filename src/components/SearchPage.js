import { useEffect, useState } from 'react'

import { YOUTUBE_API_SEARCH_URL } from "../utils/constants"
import { Link } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";
import { formatTimeAgo } from '../utils/helper';

const SearchCard = ({ info }) => {
  const { snippet } = info;
  const { thumbnails, title, channelTitle, publishedAt } = snippet;

  return (
    <div className="flex p-2 m-2 shadow-lg rounded-lg hover:bg-gray-100">
      <div className="w-96 h-52">
        <img
          className="rounded-lg w-full h-full object-cover"
          src={thumbnails.high.url}
          alt={title}
        />
      </div>

      <div className="flex flex-col ml-4 flex-1">
        <h3 className="font-semibold text-xl line-clamp-2">
          {title}
        </h3>

        <div className="mt-2 text-sm text-gray-600">
          {formatTimeAgo(publishedAt)}
        </div>

        <div className="mt-2 flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
          <span className="ml-2 text-sm font-medium text-gray-700">
            {channelTitle}
          </span>
        </div>

        <div className="mt-2 text-sm text-gray-600 line-clamp-2">
          {snippet.description}
        </div>
      </div>
    </div>
  );
};

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  useEffect(() => {
    const getVideos = async () => {
      try {
        const p = await fetch(YOUTUBE_API_SEARCH_URL + query);
        const json = await p.json();
        // console.log(json);
        setVideos(json.items);
      }
      catch (e) {
        console.error(e);
      }
    }
    getVideos();
  }, [query]);
  if (videos.length === 0) return;

  return (
    <div className="max-w-4xl mx-auto">
      {videos.map(video => (
        <Link key={video.id.videoId} to={"/watch?v=" + video.id.videoId}>
          <SearchCard info={video} />
        </Link>
      ))}
    </div>
  );
}

export default VideoContainer