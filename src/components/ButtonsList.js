import { useNavigate } from "react-router-dom";

const buttonsList = ["Music", "Cricket", "Comedy", "Live", "Gaming", "Podcast", "Cooking"];

const ButtonComponent = ({ name, handleClick }) => {
  return (
    <div>
      <button
        className="px-5 py-2 m-2 text-sm font-medium text-gray-700 transition-all 
    bg-gray-100 rounded-lg hover:bg-gray-200 hover:shadow-md"
        onClick={handleClick}
      >
        {name}
      </button>
    </div>
  )
}

const ButtonsList = () => {
  const navigate = useNavigate();
  return (
    <div className="flex">
      {buttonsList.map(button => <ButtonComponent name={button} key={button} handleClick={() => navigate("/search?q=" + button)} />)}
    </div>
  )
}

export default ButtonsList