import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const categories_1 = ["Home", "Shorts", "Videos", "Live"];
const categories_2 = ["Sports", "Games", "Movies", "Music"];

const Sidebar = () => {
  const navigate = useNavigate();
  const isMenuOpen = useSelector(store => store.app.isMenuOpen);

  if (!isMenuOpen) return;
  return (
    <div
      className="m-5 grid grid-flow-col h-fit">
      <div className="shadow-lg">
        <h1 className="font-bold px-2 mb-2 text-center">Subscriptions</h1>
        <ul className="space-y-1">
          {categories_1.map((category,i) => (
            <li key={i}
            className="px-4 py-1 hover:bg-gray-100 rounded-lg cursor-pointer"
            onClick={()=>navigate(`/search?q=${category}`)}>{category}</li>
          ))}
        </ul>
        <h1 className="font-bold px-2 mb-2 text-center">Watch later</h1>
        <ul className="space-y-1">
          {categories_2.map((category,i) => (
            <li key={i}
            className="px-4 py-1 hover:bg-gray-100 rounded-lg cursor-pointer"
            onClick={()=>navigate(`/search?q=${category}`)}>{category}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar