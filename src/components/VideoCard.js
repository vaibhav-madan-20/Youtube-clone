import { formatTimeAgo } from "../utils/helper";


const formatViews = (count) => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count;
};

const formatDuration = (duration) => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = (match[1] || '').replace('H', '');
  const minutes = (match[2] || '').replace('M', '');
  const seconds = (match[3] || '').replace('S', '');

  if (hours) {
    return `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  }
  return `${minutes || '0'}:${seconds.padStart(2, '0')}`;
};


const VideoCard = ({ info }) => {
  // console.log(info);
  const { snippet, statistics, contentDetails } = info;
  const { title, channelTitle, thumbnails, publishedAt } = snippet;

  return (
    <div className="w-72 m-2 transition-all hover:shadow-lg rounded-lg cursor-pointer">
      <div className="relative">
        <img
          className="w-full rounded-t-lg"
          src={thumbnails.medium.url}
          alt={title}
        />
        <span className="absolute bottom-1 right-1 bg-black text-white px-2 py-1 text-xs rounded-md">
          {formatDuration(contentDetails?.duration)}
        </span>
      </div>

      <div className="p-3">
        <h1 className="font-semibold text-sm line-clamp-2 mb-2">{title}</h1>
        <div className="flex flex-col text-gray-600">
          <span className="text-sm">{channelTitle}</span>
          <div className="text-xs flex gap-2">
            <span>{formatViews(statistics?.viewCount)} views</span>
            <span>•</span>
            <span>{formatTimeAgo(publishedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCard