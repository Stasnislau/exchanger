import { useContext } from 'react';
import { Context } from '../main';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const store = useContext(Context);
    const navigate = useNavigate();
    return (
        <header className="bg-gradient-to-b from-[#19d8ff] from-80% inset-0 to-100% mix-blend-screen to-[#26adff] md:h-14 h-12 flex"
            style={
                {
                    boxShadow: "0px 1px 5px rgb(0, 31, 144), 0px 2px 40px rgba(248, 253, 252, 0.5)",
                }
            }
        >
            <div className="container md:mx-4 mx-2 flex grow justify-between items-center ">
                <div className="flex items-center">
                    <img src="src/assets/images/euro.png" alt="euro" className="h-10 m-0 rounded-full" style={{
                        boxShadow: '0 0 10px rgba(36, 93, 176, 0.8), 0 0 30px rgba(36, 93, 176, 0.8),  0 0 40px rgba(255, 255, 255, 0.6)'
                    }} />
                </div>
                <div className="flex items-center">
                    <h1 className="md:text-xl text-md font-bold">Currency Exchange</h1>
                </div>
                <div className="flex md:text-xl text-md items-center flex-row md:gap-4 gap-2">
                    {store.state.isLoggedIn ? <button
                        className='p-0 m-0 border-none transition-all duration-300 ease-in-out hover:text-secondary'
                        onClick={async () => {
                            await store.logout()
                            navigate('/login')
                        }}>Logout</button> : null}
                    {!store.state.isLoggedIn
                        ? <button
                            className='p-0 m-0 border-none transition-all duration-300 ease-in-out hover:text-secondary'
                            onClick={() => navigate("/login")}>Login</button> : null}
                </div>
            </div>
        </header>
    );
}

export default Header;