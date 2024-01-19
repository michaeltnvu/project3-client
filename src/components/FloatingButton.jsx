import create from "../assets/create-icon.png";
const FloatingButton = ({ onClick }) => {
  return (
    <button
      className="flex fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-all duration-300"
      onClick={onClick}
      style={{ zIndex: 9999 }}
    >
      <img className="w-6 h-6 mr-2" src={create} alt="Create post" />
      Create post
    </button>
  );
};

export default FloatingButton;
