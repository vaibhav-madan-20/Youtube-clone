const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export const YOUTUBE_API_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&maxResults=50&key=${GOOGLE_API_KEY}`;

export const YOUTUBE_API_SEARCH_URL = `https://www.googleapis.com/youtube/v3/search?key=${GOOGLE_API_KEY}&maxResults=50&part=snippet&type=video&q=`;

export const YOUTUBE_SUGGESTIONS_API_URL = "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";
// export const YOUTUBE_SUGGESTIONS_API_URL = "http://crossorigin.me/http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

export const LIVE_CHAT_COUNT = 25;