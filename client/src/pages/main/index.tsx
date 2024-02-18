import { useState, useEffect } from "react";
import { Header } from "../../components";
import { availableCurrencies } from "../../constants";
import RightCard from "../../components/cards/rightCard";
import Input from "../../components/mui/input";
import LeftCard from "../../components/cards/leftCard";
import SwapIcon from "../../assets/icons/swap.svg";
import { IRate } from "../../types";
import updateIcon from "../../assets/icons/update.svg";
import Drawer from "../../components/drawer/drawer";

const mockRates: IRate[] = [
    {
        id: 1,
        value: 1.12,
        baseCurrency: "eur",
        targetCurrency: "usd",
        createdAt: new Date(),
    },
    {
        id: 2,
        value: 0.892857143,
        baseCurrency: "usd",
        targetCurrency: "eur",
        createdAt: new Date(),
    },
    {
        id: 3,
        value: 0.73,
        baseCurrency: "gbp",
        targetCurrency: "usd",
        createdAt: new Date(),
    },
    {
        id: 4,
        value: 1.36986301,
        baseCurrency: "usd",
        targetCurrency: "gbp",
        createdAt: new Date(),
    },
];


const MainPage = () => {
    const [date, setDate] = useState(new Date());
    const [mainCurrency, setMainCurrency] = useState("eur");
    const [mainCurrencyValue, setMainCurrencyValue] = useState(0);
    const [targetCurrency, setTargetCurrency] = useState("usd");
    const [targetCurrencyValue, setTargetCurrencyValue] = useState(0);
    const [isSwapped, setIsSwapped] = useState(false);
    const [historicalData, setHistoricalData] = useState<IRate[]>([]);
    const [currentRate, setCurrentRate] = useState<IRate | undefined>(undefined);
    const [isHistorical, setIsHistorical] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const getCurrentRate = async () => {
        mockRates.forEach((rate) => {
            if (rate.baseCurrency === mainCurrency && rate.targetCurrency === targetCurrency) {
                setCurrentRate(rate);
            }
        });
    };

    const convertCurrency = () => {
        if (currentRate) {
            const result = mainCurrencyValue * currentRate.value;
            const finalResult = Number(result.toFixed(2));
            setTargetCurrencyValue(finalResult);
        }
    };

    useEffect(() => {
        getCurrentRate();
    }, [mainCurrency, targetCurrency]);


    const handleSwapCurrencies = () => {
        const temp = mainCurrency;
        setMainCurrency(targetCurrency);
        setTargetCurrency(temp);
        setMainCurrencyValue(targetCurrencyValue);
        setTargetCurrencyValue(mainCurrencyValue);
        setIsHistorical(false);
    };

    const handleReset = () => {
        setMainCurrencyValue(0);
        setTargetCurrencyValue(0);
        setIsHistorical(false);
    };

    return (
        <div className="w-full h-screen flex flex-col">
            <Header isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
            <div className="flex-row flex w-full grow">
                <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} historyItems={historicalData} />
                <div className="justify-center grow items-center md:mt-4 xl:mx-40 md:mx-20 sm:mx-10 mx-2 flex flex-col">

                    <p className="lg:text-5xl md:text-3xl text-xl text-center">Currency Exchange</p>
                    <div className="flex justify-between items-center md:px-4 py-2 px-2 md:mt-8 mt-4 sm:w-4/5 w-[95%] rounded-full bg-[#f5f4de] border-white border-[2px] "
                        style={{
                            boxShadow: "0px 1px 10px rgb(0, 31, 144), 0px 2px 1px rgba(248, 253, 252, 0.5)",
                        }}
                    >
                        {currentRate && isHistorical ?
                            null
                            : <>
                                <p className="text-md text-black sm:mx-4 mx-2">
                                    {date.toLocaleString()}
                                </p>
                                <button className="  hover:saturate-200 transition duration-300 ease-in-out"
                                    onClick={getCurrentRate}
                                >
                                    <img src={updateIcon} alt="update" className="h-6" />
                                </button>
                            </>}
                    </div>
                    <div className="flex flex-row w-full flex-wrap md:flex-nowrap text-black justify-between">
                        <LeftCard availableCurrencies={availableCurrencies} setMainCurrency={setMainCurrency} value={currentRate ? currentRate.value : 0} mainCurrency={mainCurrency} />
                        <RightCard availableCurrencies={availableCurrencies} setTargetCurrency={setTargetCurrency} value={currentRate ? currentRate.value : 0} targetCurrency={targetCurrency} />
                    </div>
                    <div className="flex flex-row items-center mt-8 w-full md:h-10 h-6"
                    >
                        <div className="w-2/5 bg-[#f1f2e0] text-black flex flex-row justify-end"
                            style={{
                                borderTopLeftRadius: "999px",
                                borderBottomLeftRadius: "999px",
                                boxShadow: "0px 1px 10px rgb(0, 31, 144), 0px 2px 1px rgba(248, 253, 252, 0.5)",
                                zIndex: 2
                            }}
                        >
                            <Input
                                Label={mainCurrency.toLocaleUpperCase()}
                                Value={mainCurrencyValue}
                                onChange={(e: any) => {
                                    setMainCurrencyValue(e.target.value)
                                    setIsHistorical(false);
                                    setTargetCurrencyValue(0);
                                }
                                }
                                isReversed={true}
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
                            <button className="w-full py-2 flex justify-center items-center"
                                onClick={handleSwapCurrencies}
                            >
                                <img src={SwapIcon} alt="swap" className={`h-10 ${isSwapped ? "scale-110" : ""} transition 
                            ${isSwapped ? "rotate-180" : "rotate-0"}
                            duration-300 ease-in-out transform`} />
                            </button>
                        </div>
                        <div className="w-2/5 bg-[#f1f2e0] text-black flex flex-row justify-start"
                            style={{
                                borderTopRightRadius: "999px",
                                borderBottomRightRadius: "999px",
                                boxShadow: "0px 1px 10px rgb(0, 31, 144), 0px 2px 1px rgba(248, 253, 252, 0.5)",
                                zIndex: 1

                            }}
                        >
                            <div className="flex flex-row justify-end w-full">
                                <Input
                                    Label={targetCurrency.toLocaleUpperCase()}
                                    Value={targetCurrencyValue}
                                    onChange={(e: any) => {
                                        setTargetCurrencyValue(e.target.value)
                                        setIsHistorical(false);
                                        setMainCurrencyValue(0);
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row items-center mt-8 w-full md:h-16 h-10 justify-between">
                        <button className="sm:w-2/5 w-[45%] rounded-full bg-gradient-to-b from-[#13c2fb] to-[#0261e3] flex flex-row justify-center py-2 hover:scale-105 hover:saturate-200 transition duration-300 ease-in-out"

                            style={{
                                textShadow: '2px 0 2px rgba(0, 0, 0, 0.7)',
                                boxShadow: '1px 2px 40px rgb(0, 14, 63), 0 0 20px rgba(36, 93, 176, 0.5), 0 0 40px rgba(255, 255, 255, 0.6)'
                            }}
                            onClick={convertCurrency}
                        >
                            Convert
                        </button>

                        <button className="sm:w-1/6 w-[25%] rounded-full bg-gradient-to-b from-blue-300 to-indigo-500 flex flex-row justify-center py-2 hover:scale-105 hover:saturate-150 transition duration-300 ease-in-out"
                            style={{
                                textShadow: '2px 0 2px rgba(0, 0, 0, 0.7)',
                                boxShadow: '1px 2px 40px rgb(0, 14, 63), 0 0 20px rgba(36, 93, 176, 0.5), 0 0 40px rgba(255, 255, 255, 0.6)'
                            }}
                            onClick={() => {
                                console.log("Save button clicked");
                            }}
                        >
                            Save
                        </button>
                        <button className="sm:w-1/6 w-[25%] rounded-full bg-gradient-to-b from-[#FFB347] to-[#FF8C00] flex flex-row justify-center py-2 hover:scale-105 hover:saturate-200 transition duration-300 ease-in-out"
                            style={{
                                textShadow: '2px 0 2px rgba(0, 0, 0, 0.7)',
                                boxShadow: '1px 2px 40px rgba(255, 181, 91, 0.6), 0 0 20px rgba(36, 93, 176, 0.5), 0 0 40px rgba(184, 184, 184, 0.6)'
                            }}
                            onClick={handleReset}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div >
        </div>

    );
}

export default MainPage;