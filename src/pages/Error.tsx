import { useNavigate, useLocation } from 'react-router-dom';
import { HiOutlineHome } from 'react-icons/hi2';


const Error = () => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log("Error page rendered for path:", location.pathname);

  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-10">
          <h1 className="font-bold text-7xl">
            🐔 Boom! Are you lost? 🙄
          </h1>
          <button onClick={() => navigate('/login')} className="btn">
            <HiOutlineHome className="xl:text-2xl" />
            <span>Homepage</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
