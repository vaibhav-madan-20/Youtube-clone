import user_icon from "../assets/user.png"

const ChatMessage = ({ name, message }) => {
    return (
        <div className="flex items-start p-4 hover:bg-gray-100 border-b w-full">
            <img
                className="h-8 w-8 rounded-full mr-3 flex-shrink-0"
                src={user_icon}
                alt=""
            />
            <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-baseline">
                    <span className="font-bold mr-2 flex-shrink-0">{name}</span>
                    <span className="text-gray-600 line-clamp-2 break-words">
                        {message}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ChatMessage