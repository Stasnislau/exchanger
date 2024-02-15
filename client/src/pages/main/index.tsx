import { useState } from "react";
import { Header } from "../../components";
import { availableCurrencies } from "../../constants";
import RightCard from "../../components/cards/rightCard";
import Input from "../../components/mui/input";
import LeftCard from "../../components/cards/leftCard";
import SwapIcon from "../../assets/icons/swap.svg";

const MainPage = () => {
    const [date, setDate] = useState(new Date());
    const [mainCurrency, setMainCurrency] = useState("BTC");
    const [mainCurrencyValue, setMainCurrencyValue] = useState(0);
    const [targetCurrency, setTargetCurrency] = useState("ETH");
    const [targetCurrencyValue, setTargetCurrencyValue] = useState(0);
    const [isSwapped, setIsSwapped] = useState(false);

    return (
        <div className="w-full h-screen flex flex-col">
            <Header />
            <div className="justify-center grow items-center md:mt-4 xl:mx-40 md:mx-20 sm:mx-10 mx-2 flex flex-col">
                <p className="lg:text-5xl md:text-3xl text-xl text-center">Currency Exchange</p>
                <div className="flex justify-start items-center p-2 md:mt-8 mt-4 sm:w-4/5 w-[95%] rounded-full bg-[#f5f4de] border-white border-[2px] "
                    style={{
                        boxShadow: "0px 1px 10px rgb(0, 31, 144), 0px 2px 1px rgba(248, 253, 252, 0.5)",
                    }}
                >
                    <p className="text-md text-black sm:mx-4 mx-2">
                        {date.toLocaleString()}
                    </p>
                </div>
                <div className="flex flex-row w-full flex-wrap lg:flex-nowrap text-black justify-between">
                    <LeftCard availableCurrencies={availableCurrencies} setMainCurrency={setMainCurrency} value={1000} />
                    <RightCard availableCurrencies={availableCurrencies} setTargetCurrency={setTargetCurrency} value={1000} />
                </div>
                <div className="flex flex-row items-center mt-8 w-full md:h-10 h-6"
                >
                    <div className="w-2/5 bg-[#f1f2e0] text-black flex flex-row justify-center sm:py-2 py-0"
                        style={{
                            borderTopLeftRadius: "999px",
                            borderBottomLeftRadius: "999px",
                            boxShadow: "0px 1px 10px rgb(0, 31, 144), 0px 2px 1px rgba(248, 253, 252, 0.5)",
                            zIndex: 2
                        }}
                    >
                        <Input
                            Label={mainCurrency}
                            Value={mainCurrencyValue}
                            onChange={(e: any) => setMainCurrencyValue(e.target.value)}
                        />
                    </div>
                    <div className="w-1/5 bg-gradient-to-b  border-red-800 from-[#b5c7c5] to-[#a7c2ce] text-black flex flex-row justify-center 
                        hover:to-[#b0c9d3] hover:from-[#b4c9c6] transition duration-300 ease-in-out"
                        onMouseEnter={() => setIsSwapped(true)}
                        onMouseLeave={() => setIsSwapped(false)}
                        style={
                            {
                                boxShadow: "0px 1px 1px rgba(0, 31, 144, 0.4), 0px 1px 5px rgba(248, 253, 252, 0.4)",
                                zIndex: 3
                            }
                        }
                    >
                        <button className="w-full sm:py-2 py-0 flex justify-center items-center">
                            <img src={SwapIcon} alt="swap" className={`h-10 ${isSwapped ? "scale-110" : ""} transition 
                            ${isSwapped ? "rotate-180" : "rotate-0"}
                            duration-300 ease-in-out transform`} />
                        </button>
                    </div>
                    <div className="w-2/5 sm:py-2 py-0 bg-[#f1f2e0] text-black flex flex-row justify-center"
                        style={{
                            borderTopRightRadius: "999px",
                            borderBottomRightRadius: "999px",
                            boxShadow: "0px 1px 10px rgb(0, 31, 144), 0px 2px 1px rgba(248, 253, 252, 0.5)",
                            zIndex: 1
                        }}
                    >
                        <Input
                            Label={targetCurrency}
                            Value={targetCurrencyValue}
                            onChange={(e: any) => setTargetCurrencyValue(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-row items-center mt-8 w-full md:h-16 h-10 justify-between">
                    <button className="sm:w-2/5 w-[45%] rounded-full bg-gradient-to-b from-[#13c2fb] to-[#0261e3] flex flex-row justify-center py-2 hover:scale-105 hover:saturate-200 transition duration-300 ease-in-out"

                        style={{
                            textShadow: '2px 0 2px rgba(0, 0, 0, 0.7)',
                            boxShadow: '1px 2px 40px rgb(0, 14, 63), 0 0 20px rgba(36, 93, 176, 0.5), 0 0 40px rgba(255, 255, 255, 0.6)'
                        }}
                    >
                        Convert
                    </button>

                    <button className="sm:w-1/6 w-[25%] rounded-full bg-gradient-to-b from-blue-300 to-indigo-500 flex flex-row justify-center py-2 hover:scale-105 hover:saturate-150 transition duration-300 ease-in-out"
                        style={{
                            textShadow: '2px 0 2px rgba(0, 0, 0, 0.7)',
                            boxShadow: '1px 2px 40px rgb(0, 14, 63), 0 0 20px rgba(36, 93, 176, 0.5), 0 0 40px rgba(255, 255, 255, 0.6)'
                        }}
                    >
                        Save
                    </button>
                    <button className="sm:w-1/6 w-[25%] rounded-full bg-gradient-to-b from-[#FFB347] to-[#FF8C00] flex flex-row justify-center py-2 hover:scale-105 hover:saturate-200 transition duration-300 ease-in-out"
                        style={{
                            textShadow: '2px 0 2px rgba(0, 0, 0, 0.7)',
                            boxShadow: '1px 2px 40px rgba(255, 181, 91, 0.6), 0 0 20px rgba(36, 93, 176, 0.5), 0 0 40px rgba(184, 184, 184, 0.6)'
                        }}
                    >
                        Reset
                    </button>
                </div>
                    
            </div>
        </div >

    );
}

export default MainPage;