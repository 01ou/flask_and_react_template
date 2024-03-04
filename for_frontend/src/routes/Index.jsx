import { UserName } from "../components/_index";

const Index = () => {
    return (
        <div className="container px-10 mt-10">
            <div className="flex items-center mb-4">
                <h1 className="text-4xl font-bold text-indigo-700"><UserName prefix="Welcome back, " suffix=" !" /></h1>
            </div>
            <div className="bg-gray-200 p-4 rounded-md shadow-md">
                <p className="text-lg mb-2 text-gray-700">Your content goes here.</p>
            </div>
        </div>
    );
}

export default Index;
