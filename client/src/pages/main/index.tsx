import  { useState } from "react";
import { Header } from "../../components";
import { availableCurrencies } from "../../constants";
import RightCard from "../../components/cards/rightCard";
import Input from "../../components/mui/input";
import LeftCard from "../../components/cards/leftCard";

const MainPage = () => {
    const [date, setDate] = useState(new Date());
    const [mainCurrency, setMainCurrency] = useState("BTC");
    const [mainCurrencyValue, setMainCurrencyValue] = useState(0);
    const [targetCurrency, setTargetCurrency] = useState("ETH");
    const [targetCurrencyValue, setTargetCurrencyValue] = useState(0);

    return (
        <div className="w-full h-screen ">
            <Header />
            <div className="justify-center items-center md:mt-8 mt-4 md:mx-40 mx-10 flex flex-col">
                <p className="text-6xl text-center">Currency Exchange</p>
                <div className="flex justify-start items-center p-2 md:mt-8 mt-4 w-4/5 rounded-full bg-[#f5f4de] border-white border-[2px] "
                    style={{
                        boxShadow: "0px 6px 2px rgb(9, 42, 108), 0px 4px 1px rgb(248, 253, 252)  , 0px -3px 2px rgb(0, 5, 24) "
                    }}
                >
                    <p className="text-md text-black mx-4">
                        {date.toLocaleString()}
                    </p>
                </div>
                <div className="flex flex-row w-full flex-wrap lg:flex-nowrap text-black justify-between">
                    <LeftCard availableCurrencies={availableCurrencies} setMainCurrency={setMainCurrency} value={1000}/>
                    <RightCard availableCurrencies={availableCurrencies} setTargetCurrency={setTargetCurrency} value={1000} />
                </div>
                <div className="flex flex-row items-center mt-4 w-full">
                    <div className="w-2/5 py-2 bg-[#f1f2e0] text-black flex flex-row justify-center"
                        style={{
                            borderTopLeftRadius: "999px",
                            borderBottomLeftRadius: "999px",
                        }}
                    >
                        <Input
                            Label={mainCurrency}
                            Value={mainCurrencyValue}
                            onChange={(e: any) => setMainCurrencyValue(e.target.value)}
                        />
                    </div>
                    <div className="w-1/5 py-2 bg-[#bbd0cd] text-black flex flex-row justify-center">
                        <p className="text-4xl font-bold">=</p>
                    </div>
                    <div className="w-2/5 py-2 bg-[#f1f2e0] text-black flex flex-row justify-center"
                        style={{
                            borderTopRightRadius: "999px",
                            borderBottomRightRadius: "999px",
                        }}
                    >
                        <Input
                            Label={targetCurrency}
                            Value={targetCurrencyValue}
                            onChange={(e: any) => setTargetCurrencyValue(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-row justify-between items-center mt-8">

                </div>

            </div>
        </div >

    );
}

export default MainPage;