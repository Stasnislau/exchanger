import React, { useState } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import { AnimatePresence, motion } from 'framer-motion';
import { Context } from '../../main';


interface loginModalInterface {
    isOpen: boolean;
    onClose: () => void;
}

const ForgotPasswordModal = ({
    isOpen, onClose }: loginModalInterface) => {
    const store = React.useContext(Context);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');
    const ref = React.useRef<HTMLDivElement>(null);
    useClickOutside(ref, () => onClose());
    const close = () => {
        setUsername('');
        setPassword('');
        setEmail('');
        setError('');
        onClose();
    }

    const handleSubmit = () => {
        if (username === '') {
            setError('Username is required');
            return;
        }
        if (email === '') {
            setError('Email is required');
            return;
        }
        else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setError('Invalid email format');
                return;
            }
        }
        if (password === '') {
            setError('Password is required');
            return;
        }

        onSubmit();
    }
    const onSubmit = async () => {
        try {
            store.isLoading = true;
            const res = await fetch(`${import.meta.env.VITE_API_URL}/authorization/forgot`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username, email,
                    newPassword: password
                })
            });
            const data = await res.json();
            if (data.Success === false) {
                setError(data.Message);
                return;
            }
            close();
        } catch (error) {
            setError('An error occurred');
        } finally {
            store.isLoading = false;
        }
    }
    return (
        <AnimatePresence >
            {isOpen &&
                <motion.div className="fixed bg-black h-screen w-screen bg-opacity-55 flex justify-center items-center "
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <div className="bg-gradient-to-b from-[#4174ab] to-[#10407f] sm:w-fit sm:h-fit w-full h-full md:px-16 md:py-16 lg:px-24 px-6 py-12 sm:rounded-3xl justify-center items-center flex flex-col text-text relative"
                        ref={ref}
                        style={{
                            boxShadow: "0px 0px 5px rgba(36, 93, 176, 0.6), 0px 0px 20px rgba(36, 93, 176, 0.4)",
                        }}

                    >
                        <div className="flex flex-col items-center justify-between">
                            <h1 className="text-3xl mb-6 text-white font-bold text-center">Forgot Password</h1>
                            <button onClick={close} className="text-white absolute text-3xl font-bold top-[4%] right-[8%]
                    hover:scale-110 hover:text-red-500 transition duration-300 ease-in-out"
                                style={{
                                    textShadow: '1px 0 2px rgba(0, 0, 0, 0.7)'
                                }}
                            >X</button>
                            <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
                                <div className="flex flex-col gap-2 text-xl relative">
                                    <input
                                        className="mb-2 bg-white border border-blue-200 shadow-xl rounded-3xl sm:p-4 p-2 text-gray-800 placeholder-gray-400 focus:outline-none"
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        style={
                                            {
                                                boxShadow: "0 0 10px rgba(36, 93, 176, 0.8), 0 0 20px rgba(36, 93, 176, 0.8), 0 0 30px rgba(255, 255, 255, 0.8)",
                                            }
                                        }
                                    />
                                    <input
                                        className="mb-2 bg-white border border-blue-200 shadow-xl rounded-3xl sm:p-4 p-2 text-gray-800 placeholder-gray-400 focus:outline-none"
                                        type="text"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={
                                            {
                                                boxShadow: "0 0 10px rgba(36, 93, 176, 0.8), 0 0 20px rgba(36, 93, 176, 0.8), 0 0 30px rgba(255, 255, 255, 0.8)",
                                            }
                                        }
                                    />
                                    <input
                                        className="mb-2 bg-white border border-blue-200 shadow-xl rounded-3xl sm:p-4 p-2 text-gray-800 placeholder-gray-400 focus:outline-none"
                                        type="password"
                                        placeholder="New Password"
                                        autoComplete='off'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={
                                            {
                                                boxShadow: "0 0 10px rgba(36, 93, 176, 0.8), 0 0 20px rgba(36, 93, 176, 0.8),0 0 30px rgba(255, 255, 255, 0.8)",
                                            }
                                        }
                                    />

                                </div>

                                <div className="flex w-full flex-row items-center mt-8 justify-between">
                                    <button className="rounded-full bg-gradient-to-b from-[#13c2fb] to-[#0261e3] py-2 px-4 hover:scale-105 hover:saturate-200 transition duration-300 ease-in-out"
                                        style={{
                                            textShadow: '2px 0 2px rgba(0, 0, 0, 0.7)',
                                            boxShadow: '1px 2px 10px rgb(0, 14, 63, 0.7), 0px 0px 20px rgba(36, 93, 176, 0.5), 0px 0px 40px rgba(255, 255, 255, 0.6)'
                                        }}
                                        type='submit'
                                    >
                                        Submit
                                    </button>
                                    <button className="rounded-full bg-gradient-to-b from-[#FFB347] to-[#FF8C00] py-2 px-4 hover:scale-105 hover:saturate-200 transition duration-300 ease-in-out"
                                        style={{
                                            textShadow: '2px 0 2px rgba(0, 0, 0, 0.7)',
                                            boxShadow: '1px 2px 40px rgba(255, 181, 91, 0.6), 0 0 20px rgba(36, 93, 176, 0.5), 0 0 40px rgba(184, 184, 184, 0.6)'
                                        }}
                                        onClick={close}
                                        type='button'
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                            {error && <p className="text-red-500 text-center mt-4 sm:absolute sm:text-lg text-md sm:bottom-[2%]">{error}</p>}
                        </div>

                    </div>
                </motion.div>
            }
        </AnimatePresence>
    );
}

export default ForgotPasswordModal;