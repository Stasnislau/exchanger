import React, { useState } from 'react';

interface loginModalInterface {
    isOpen: boolean;
    close: () => void;
}

const LoginModal = ({
    isOpen, close }: loginModalInterface) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    if (!isOpen) return null;
    const handleSubmit = () => {
        if (username === '') {
            setError('Username is required');
            return;
        }
        if (password === '') {
            setError('Password is required');
            return;
        }
        onSubmit();
    }
    const onSubmit = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            // do something with data
            console.log(data);
            // close();
        } catch (err: any) {
            setError(err.message as string);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className=" w-full h-[100dvh] bg-opacity-[50%] bg-stone-950 justify-center items-center flex absolute">
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
                        disabled={loading}
                        onClick={handleSubmit}
                        className='mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        type="submit">Login</button>
                </div>
                {error &&
                    <div className='flex justify-center'>
                        <p className='text-red-500'>{error}</p>
                    </div>
                }
            </div>
        </div >
    );
}

export default LoginModal;