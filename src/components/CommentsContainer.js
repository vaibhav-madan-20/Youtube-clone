import { getRandomName, getRandomSentence } from '../utils/helper'

import userImage from "../assets/user.png";

const randomName1 = getRandomName();
const commentsData = [
  {
    name: randomName1,
    text: getRandomSentence(),
    replies: [
      {
        name: `${randomName1} 1`,
        text: getRandomSentence(),
        replies: [
          {
            name: `${randomName1} 2`,
            text: getRandomSentence(),
            replies: [
              {
                name: `${randomName1} 3`,
                text: getRandomSentence(),
                replies: [

                ]
              },
            ]
          },
        ]
      },
    ]
  },
  {
    name: "Name 2",
    text: getRandomSentence(),
    replies: []
  },
  {
    name: "Name 3",
    text: getRandomSentence(),
    replies: []
  },
]

const Comment = ({ info }) => {
  return (
    <div className="flex">
      <img className="h-12 w-12" alt="" src={userImage} />
      <div>
        <h1>{info.name}</h1>
        <h2>{info.text}</h2>
      </div>
    </div>
  )
}

const CommentsList = ({ comments }) => {
  return comments.map(comment => {
    return (
      <div key={comment.name}>
        <Comment info={comment} />
        <div className="text-red-950 ml-4 border-l-2 border-solid border-black">
          <CommentsList
            comments={comment.replies}
          />
        </div>
      </div>
    )
  })
}

const CommentsContainer = () => {
  return (
    <div>
      <h1 className="font-bold">Comments</h1>
      <CommentsList comments={commentsData} />
    </div>
  )
}

export default CommentsContainer