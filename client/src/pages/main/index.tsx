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
import moment from "moment";
import { Context } from "../../main";
import React from "react";


const MainPage = () => {
    const store = React.useContext(Context);
    const [isSwapped, setIsSwapped] = useState(false);
    const [historicalData, setHistoricalData] = useState<IRate[]>([]);
    const [currentRate, setCurrentRate] = useState<IRate>({
        id: -1,
        value: 1,
        baseCurrency: "eur",
        targetCurrency: "usd",
        createdAt: new Date(),
    });
    const [isHistorical, setIsHistorical] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [leftRate, setLeftRate] = useState(0);
    const [rightRate, setRightRate] = useState(0);
    const [defaultRateValue, setDefaultRateValue] = useState<number>(1);


    const getHistoricalData = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/rates/history`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
                },
                credentials: "include",
            });
            const data = await res.json() as IRate[];
            data?.forEach((item) => {
                item.createdAt = new Date(item.createdAt);
            });
            setHistoricalData(data);
        }
        catch (err: any) {
            console.error(err);
        }
    }

    useEffect(() => {
        getHistoricalData();
    }, []);

    const getCurrentRate = async () => {
        try {
            store.isLoading = true;
            const params = new URLSearchParams({
                main: currentRate.baseCurrency,
                target: currentRate.targetCurrency,
            });
            const res = await fetch(`${import.meta.env.VITE_API_URL}/rates/get?${params}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
                },
                credentials: "include",
            });
            const data = await res.json();
            setCurrentRate({
                ...currentRate,
                baseCurrency: data.baseCurrency,
                targetCurrency: data.targetCurrency,
                value: data.rate,
                createdAt: new Date(),
            });
            setDefaultRateValue(data.rate);
        } catch (err: any) {
            console.error(err);
        } finally {
            store.isLoading = false;
        }

    };

    const convertCurrency = () => {
        if (currentRate) {
            const result = (currentRate?.amount || 0) * currentRate.value;
            const finalResult = Number(result.toFixed(2));
            setCurrentRate({
                ...currentRate,
                result: finalResult,
            });
        }
    };

    const handleLeftCustomRate = (value: number) => {
        if (value === 0) {
            setCurrentRate({
                ...currentRate,
                value: defaultRateValue,
            });
            setLeftRate(0);
            setRightRate(0);
            return
        }
        setLeftRate(value);
        setRightRate(0);
        setCurrentRate({
            ...currentRate,
            value,
        });
        setIsHistorical(false);

    };

    const handleRightCustomRate = (value: number) => {
        if (value === 0) {
            setCurrentRate({
                ...currentRate,
                value: defaultRateValue,
            });
            setLeftRate(0);
            setRightRate(0);
            return
        }
        setRightRate(value);
        setLeftRate(0);
        setCurrentRate({
            ...currentRate,
            value: 1 / value,
        });
    };

    useEffect(() => {
        if (!isHistorical && leftRate === 0 && rightRate === 0)
            getCurrentRate();
    }, [currentRate.baseCurrency, currentRate.targetCurrency]);


    const handleSwapCurrencies = () => {

        setCurrentRate({
            ...currentRate,
            baseCurrency: currentRate.targetCurrency,
            targetCurrency: currentRate.baseCurrency,
            amount: currentRate.result,
            result: currentRate.amount,
        });
        setIsHistorical(false);
    };

    const handleReset = () => {
        setCurrentRate({
            id: -1,
            value: 1,
            baseCurrency: "eur",
            targetCurrency: "usd",
            createdAt: new Date(),
        });
        setIsHistorical(false);
        setLeftRate(0);
        setRightRate(0);
    };

    const handleSave = async () => {
        try {
            store.isLoading = true;
            const res = await fetch(`${import.meta.env.VITE_API_URL}/rates/save`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
                },
                body: JSON.stringify({
                    value: currentRate.value,
                    main: currentRate.baseCurrency,
                    target: currentRate.targetCurrency,
                    amount: currentRate.amount,
                    result: currentRate.result,
                }),
            });
            const data = await res.json();
            if (data.Success === false) {
                console.error(data.Message);
                return;
            }
            setHistoricalData([...historicalData, currentRate]);
        } catch (err: any) {
            console.error(err);
        } finally {
            store.isLoading = false;
        }
    }

    
    return (
        <div className="w-full h-screen flex flex-col">
            <Header isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
            <div className="flex-row flex grow h-full w-full lg:relative overflow-hidden">
                <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} historyItems={historicalData} onClick={(id: number) => {
                    setCurrentRate(historicalData ? historicalData.find((item) => item.id === id) || {} as IRate : {} as IRate);
                    setIsHistorical(true);
                }} changeHistory={setHistoricalData} />
                <div className={`justify-center grow items-center 2xl:${isDrawerOpen ? "mx-30" :"mx-60"} md:mt-4 xl:${isDrawerOpen ? "mx-20" : "mx-40"} md:${isDrawerOpen ? "mx-10" : "mx-5"} sm:mx-10 mx-2 flex flex-col`}>
                    <p className={`lg:text-5xl md:text-3xl text-xl text-center ${window.innerHeight < 800 ? "hidden" : ""}`}>Currency Exchange</p>
                    <div className="flex justify-between items-center md:px-4 py-2 px-2 md:mt-8 mt-4 sm:w-4/5 w-[95%] rounded-full bg-[#f5f4de] border-white border-[2px] "
                        style={{
                            boxShadow: "0px 1px 10px rgb(0, 31, 144), 0px 2px 1px rgba(248, 253, 252, 0.5)",
                        }}
                    >
                        {

                            <>
                                <p className="text-md text-black sm:mx-4 mx-2">
                                    {isHistorical ? moment(currentRate.createdAt).format("DD.MM.YYYY HH:mm") : moment(Date.now()).format("DD.MM.YYYY HH:mm")}
                                </p>
                                <button className="  hover:saturate-200 transition duration-300 ease-in-out"
                                    onClick={getCurrentRate}
                                >
                                    <img src={updateIcon} alt="update" className="h-6" />
                                </button>
                            </>}
                    </div>
                    <div className="flex flex-row w-full flex-wrap md:flex-nowrap text-black justify-between">
                        <LeftCard availableCurrencies={availableCurrencies} setMainCurrency={
                            (currency: string) => {
                                setCurrentRate({
                                    ...currentRate,
                                    baseCurrency: currency,
                                });
                                setIsHistorical(false);
                            }
                        } value={currentRate.value} mainCurrency={
                            currentRate.baseCurrency
                        }
                            customRate={leftRate}
                            onCustomRateChange={handleLeftCustomRate}
                        />
                        <RightCard availableCurrencies={availableCurrencies} setTargetCurrency={
                            (currency: string) => {
                                setCurrentRate({
                                    ...currentRate,
                                    targetCurrency: currency,
                                });
                                setIsHistorical(false);
                            }
                        } value={currentRate.value} targetCurrency={currentRate.targetCurrency}
                            onCustomRateChange={handleRightCustomRate}
                            customRate={rightRate}
                        />
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
                                Label={currentRate.baseCurrency.toLocaleUpperCase()}
                                Value={currentRate.amount || 0}
                                onChange={(e: any) => {
                                    setCurrentRate({
                                        ...currentRate,
                                        amount: e.target.value
                                    });
                                    setIsHistorical(false);
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
                                    Label={currentRate.targetCurrency.toLocaleUpperCase()}
                                    Value={currentRate.result || 0}
                                    onChange={(e: any) => {
                                        setCurrentRate({
                                            ...currentRate,
                                            result: e.target.value
                                        });
                                        setIsHistorical(false);
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
                            onClick={handleSave}
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