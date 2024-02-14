import { useEffect, useState, FormEvent } from 'react';
import { useContext } from 'react';
import { Context } from '../../main';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
const LoginPage = observer(() => {
    const store = useContext(Context);
    const navigate = useNavigate();
    useEffect(() => {
        if (store.state.isLoggedIn) {
            navigate('/');
        }
    }, [store.state.isLoggedIn, navigate]);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        if (username === '') {
            setError('Username is required');
            return false;
        }
        if (password === '') {
            setError('Password is required');
            return false;
        }

        await onSubmit();
        return false;
    }

    const onSubmit = async () => {
        const res = await store.login(username, password) as { success: boolean, message: string };
        if (res.success === false) {
            setError(res.message);
            return false;
        } else {
            navigate('/');
        }

    }

    return (
        <section className="h-screen w-full absolute">
            <div className='absolute top-[50%] left-1/2 flex-col translate-x-[-50%] translate-y-[-50%]'>
                <div className='flex flex-col items-center'>
                    <div className='relative flex flex-row justify-center'>
                        <img src="src/assets/images/euro.png" alt="euro" className='w-[20%] m-0 rounded-full' style={{
                            boxShadow: '0 0 10px rgba(36, 93, 176, 0.8), 0 0 30px rgba(36, 93, 176, 0.8),  0 0 40px rgba(255, 255, 255, 0.6)'
                        }} />
                    </div>
                    <div className='flex flex-col pt-8 w-full xl:w-3/4 pb-14'>
                        <form onSubmit={handleSubmit} >
                            <div className='flex flex-col gap-6 sm:px-10'>
                                <input
                                    className="mb-2 bg-white border border-blue-200 shadow-xl rounded-3xl sm:p-4 p-2 sm:text-xl text-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-0 "
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    style={
                                        {
                                            boxShadow: "0 0 10px rgba(36, 93, 176, 0.8), 0 0 20px rgba(36, 93, 176, 0.8), inset 0 0 30px rgba(255, 255, 255, 0.8)",
                                        }
                                    }
                                />

                                <input
                                    className="mb-2 bg-white border border-blue-200 shadow-xl rounded-3xl sm:p-4 p-2 sm:text-xl text-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-0 "
                                    type="password"
                                    placeholder="Password"
                                    autoComplete='off'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={
                                        {
                                            boxShadow: "0 0 10px rgba(36, 93, 176, 0.8), 0 0 20px rgba(36, 93, 176, 0.8), inset 0 0 30px rgba(255, 255, 255, 0.8)",
                                        }
                                    }
                                />
                                <div className='flex justify-between flex-row'>
                                    <button className="text-text sm:pl-2 hover:text-primary transition duration-500 ease-in-out"
                                        style={{
                                            textShadow: '-2px 0 3px rgba(0, 0, 0, 0.8)',
                                            border: 'none',
                                            background: 'none',
                                        }}
                                    >Forgot Password?</button>
                                    <button className="text-text pl-2 hover:text-primary transition duration-500 ease-in-out"
                                        style={{
                                            textShadow: '-2px 0 3px rgba(0, 0, 0, 0.8)',
                                            border: 'none',
                                            background: 'none',
                                        }}
                                    >Create Account</button>
                                </div>


                                <div className='flex justify-center'>
                                    <button
                                        disabled={store.state.isLoading}
                                        className='mb-2 bg-gradient-to-b from-[#13c2fb] to-[#0261e3] xl:w-1/2 w-3/4 text-white font-bold py-2 rounded-3xl  
                                    focus:outline-none focus:ring-0 hover:scale-105 hover:saturate-150 transition duration-500 ease-in-out disabled:opacity-50'
                                        style={{
                                            textShadow: '2px 0 2px rgba(0, 0, 0, 0.7)',
                                            boxShadow: '1px 2px 40px rgb(0, 14, 63), 0 0 20px rgba(36, 93, 176, 0.5), 0 0 100px rgba(255, 255, 255, 0.8)'
                                        }}
                                        type="submit">Log in
                                    </button>
                                </div>
                                {error &&
                                    <div className='absolute bottom-0 left-1/2 translate-x-[-50%] translate-y-[-50%]'>
                                        <p
                                            style={{
                                                textShadow: '2px 0 2px rgba(0, 0, 0, 0.7), 0 0 100px rgba(255, 255, 255, 0.8)',

                                            }}
                                            className='text-red-500 '>{error}</p>
                                    </div>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section >
    );
});

export default LoginPage;