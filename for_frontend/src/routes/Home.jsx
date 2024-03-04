import { Link } from "react-router-dom";
import { Header } from "../components/_index";

const Home = () => {
  return (
    <>
      <Header />
      <div className="bg-gray-100 p-8 text-center">
        <h1 className="text-4xl font-bold text-blue-600 m-8">Welcome!!</h1>
        <p className="text-xl text-gray-800 mb-4">This is Flask and React App.</p>
        <div className="flex justify-center space-x-4">
          <Link to='/login'
            className="text-2xl bg-gray-200 px-8 py-4 m-4 rounded-lg text-blue-600  hover:text-blue-800"
          >Login</Link>
          <Link to='/signup'
            className="text-2xl bg-gray-200 px-8 py-4 m-4 rounded-lg text-blue-600  hover:text-blue-800"
          >Signup</Link>
        </div>
      </div>
    </>
  )
}

export default Home;
