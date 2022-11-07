import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <div>
      <Link to='/'>Home</Link>
      <Link to='/profile'>Profile</Link>
    </div>
  );
};

export default Header;
