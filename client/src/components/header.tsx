import { useContext } from 'react';
import { Context } from '../main';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '../assets/icons/menu.svg';

const Header = ({ isDrawerOpen, setIsDrawerOpen }: {
    isDrawerOpen: boolean,
    setIsDrawerOpen: (value: boolean) => void
}) => {
    const store = useContext(Context);
    const navigate = useNavigate();
    return (
        <header className="bg-gradient-to-b z-[100] relative from-[#19d8ff] from-80% to-100% mix-blend-screen to-[#08a7f1] md:h-14 h-12 flex"
            style={
                {
                    boxShadow: "0px 2px 1px rgb(0, 31, 144), 0px 1px 100px rgba(248, 253, 252, 0.4)",
                }
            }
        >
            <div className="container md:mx-8 mx-2 flex grow justify-between items-center ">
                {store.state.isLoggedIn ? <button
                    className='p-0 m-0 border-none transition-all duration-300 ease-in-out hover:text-secondary'
                    onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
                    <img src={MenuIcon} alt="menu" className="h-6" />
                </button>
                    : null}
                <div className="items-center sm:flex hidden">
                    <h1 className="md:text-xl text-md font-bold">Currency Exchange</h1>
                </div>
                <div className="flex md:text-xl text-md items-center flex-row md:gap-4 gap-2">
                    {store.state.isLoggedIn ? <button
                        className='p-0 m-0 border-none transition-all duration-300 ease-in-out hover:text-[#161637] hover:underline'
                        onClick={async () => {
                            await store.logout()
                            navigate('/login')
                        }}>Logout</button> : null}
                </div>
            </div>
        </header>
    );
}

export default Header;