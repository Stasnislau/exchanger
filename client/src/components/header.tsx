import { useContext } from 'react';
import { Context } from '../main';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const store = useContext(Context);
    const navigate = useNavigate();
    return (
        <header className="bg-gradient-to-t from-[#0fb2fc] from-70% inset-0 to-100% mix-blend-screen to-[#10cffc] md:h-14 flex"
            style={
                {
                    boxShadow: '0 0 3px rgba(0, 0, 0), 0 0 10px rgba(36, 93, 176, 0.8), 0 0 30px rgba(36, 93, 176, 0.8),  0 0 40px rgba(255, 255, 255, 0.6)'
                }
            }
        >
            <div className="container mx-4 flex grow justify-between items-center ">
                <div className="flex items-center">
                    <img src="src/assets/images/euro.png" alt="euro" className="h-10 m-0 rounded-full" style={{
                        boxShadow: '0 0 10px rgba(36, 93, 176, 0.8), 0 0 30px rgba(36, 93, 176, 0.8),  0 0 40px rgba(255, 255, 255, 0.6)'
                    }} />
                </div>
                <div className="flex items-center">
                    <h1 className="text-xl font-bold">Currency Exchange</h1>
                </div>
                <div className="flex items-center flex-row gap-4">
                    {store.state.isLoggedIn ? <button
                        className='p-0 m-0 border-none transition-all duration-300 ease-in-out hover:text-secondary'
                        onClick={() => console.log("HISTORY")}>History</button> : null}
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