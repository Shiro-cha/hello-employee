const TopBar: React.FC<{ currentUser: string }> = ({ currentUser }) => (
    <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <span className="text-lg font-semibold">Dashboard</span>
      <span>Bievenue, {currentUser}</span>
    </div>
  );
  export default TopBar;