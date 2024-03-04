import { Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <div className="flex flex-col mt-16">
      <Outlet />
    </div>
  );
};

export default Root;
