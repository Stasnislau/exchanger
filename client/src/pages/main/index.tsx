import { useState } from "react";
import { Header } from "../../components";
// import euroIcon from "../../assets/icons/euro.png"
import giveIcon from "../../assets/icons/give.svg"
import receiveIcon from "../../assets/icons/receive.svg"

const MainPage = () => {
    const [date, setDate] = useState(new Date());

    return (
        <div className="w-full h-screen ">
            <Header />
            <div className="justify-center items-center md:mt-8 mt-4 md:mx-40 mx-10 flex flex-col">
                <p className="text-6xl text-center">Currency Exchange</p>
                <div className="flex justify-start items-center p-2 md:mt-8 mt-4 w-4/5 rounded-full bg-[#f5f4de] "
                    style={{

                    }}
                >
                    <p className="text-md text-black mx-4">
                        {date.toLocaleString()}

                    </p>
                </div>
                <div className="flex flex-row w-full text-black justify-between">
                    <div className="flex flex-col mt-8 rounded-lg py-4 px-8 w-[45% bg-gradient-to-b from-[#d5e4db] to-[#b0c9c7]">
                        <p className="text-lg font-bold">
                            Base Currency
                        </p>
                        <div className="flex flex-row justify-between">
                            <img src={giveIcon} alt="give" className="w-28 h-28" />
                            <p className="text-2xl text-center">Currency Exchange</p>
                        </div>
                    </div>
                    <div className="flex flex-col mt-8 rounded-lg py-4 px-8 w-[45%] bg-gradient-to-b from-[#d5e4db] to-[#b0c9c7]">
                        <p className="text-lg font-bold">
                            Target Currency
                        </p>
                        <p className="text-2xl text-center">Currency Exchange</p>
                        <img src={receiveIcon} alt="receive" className="w-28 h-28" />
                    </div>
                </div>

            </div>
        </div >

    );
}

export default MainPage;