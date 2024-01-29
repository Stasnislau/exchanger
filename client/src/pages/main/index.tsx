import { useState } from 'react';

const MainPage = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    return (
        <div className="w-full h-[100dvh] md:py-10 py-4 bg-opacity-[15%] bg-stone-950 justify-center flex">
            <div className='flex flex-col p-4 bg-white rounded-lg h-fit'>
                <h1 className='flex justify-center'>Exchanger</h1>
                <div className='flex flex-col pt-2'>
                    <input
                        className='mb-2 border-2 border-gray-300 rounded-md p-2'
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        className='mb-2 border-2 border-gray-300 rounded-md p-2'
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        className='mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        type="submit">Login</button>
                </div>
            </div>
        </div>
    );
}

export default MainPage;