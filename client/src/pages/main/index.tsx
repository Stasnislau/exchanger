import { useState } from "react";
import LoginModal from "../../components/loginModal";

const MainPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);

    return (
        <div className="w-full h-[100dvh] md:py-10 py-4 bg-opacity-[15%] bg-stone-950 justify-center items-center flex">
            <h1 className='flex justify-center'>Exchanger</h1>
            <LoginModal isOpen={isModalOpen} close={
                () => console.log("close")
            } />
        </div>

    );
}

export default MainPage;