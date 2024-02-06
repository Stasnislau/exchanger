import React, { useState } from 'react';

interface loginModalInterface {
    isOpen: boolean;
    close: () => void;
}

const ForgotPasswordModal = ({
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
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
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
        <section className="h-screen w-full absolute">

        </section >
    );
}

export default ForgotPasswordModal;