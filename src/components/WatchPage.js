import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { closeMenu } from '../utils/appSlice';
import { useSearchParams } from 'react-router-dom';
import CommentsContainer from './CommentsContainer';
import LiveChat from './LiveChat';

const WatchPage = () => {
    const dispatch = useDispatch();

    const [searchParams] = useSearchParams();
    useEffect(() => {
        dispatch(closeMenu());
    })

    return (
        <div className="m-5 w-full">
            <div className="flex w-full">
                <iframe
                    className="w-[800px] h-[400px]"
                    src={`https://www.youtube.com/embed/${searchParams.get("v")}?autoplay=1&color=white&enablejsapi=1`}
                    title="YouTube video player"
                    allowFullScreen
                />
                <LiveChat />
            </div>
            <CommentsContainer />
        </div>
    )
}

export default WatchPage