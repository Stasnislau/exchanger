import React, { useState } from "react";
import { Header } from "../../components";
import giveIcon from "../../assets/icons/give.svg"
import receiveIcon from "../../assets/icons/receive.svg"
import rightArrow from "../../assets/icons/right-arrow.svg"
import leftArrow from "../../assets/icons/left-arrow.svg"
import { availableCurrencies } from "../../constants";
import Select from "react-select";
import Input from "../../components/mui/input";

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
                <div className="flex flex-row w-full text-black justify-between">
                    <div className="flex flex-col mt-8 rounded-lg py-4 px-8 w-[48%] bg-gradient-to-b from-[#d5e4db] to-[#b0c9c7] border-white border-2"
                        style={{
                            boxShadow: "2px 4px 6px rgb(9, 71, 166)"
                        }}
                    >
                        <p className="text-lg font-bold">
                            Base Currency
                        </p>
                        <div className="flex flex-row justify-between items-center">
                            <img src={giveIcon} alt="give" className="w-32 h-32" />
                            <div className="py-4 h-fit px-8 rounded-full bg-[#082748] text-white text-3xl font-bold flex flex-row justify-between items-center"
                                style={{
                                    boxShadow: "0px 0px 4px rgba(123, 150, 156), 0px -3px 2px rgb(33, 139, 186), 0px -6px 2px rgb(225, 255, 255), 0px 6px 2px rgb(0, 5, 24)",
                                    textShadow: "2px 1px 0px rgb(0, 5, 24)"
                                }}>
                                108,000.00
                                <img src={rightArrow} alt="right" className="w-10 h-10 inline ml-4" />
                            </div>

                        </div>
                        <div className="py-4 h-fit px-8 text-white text-lg flex flex-row justify-between items-center">
                            <Select
                                options={availableCurrencies.map((currency) => ({ value: currency.tag, label: currency.name }))}
                                isSearchable
                                maxMenuHeight={200} // Adjust this value to control the max height of the dropdown menu
                                className="w-[68%] border-none"
                                placeholder="Select Currency"
                                onChange={(e: any) => setMainCurrency(e.value)}
                                styles={
                                    {
                                        container: (base, state) => ({
                                            ...base,
                                            backgroundColor: 'inherit',
                                            boxShadow: 'none',
                                            borderTop: '2px solid rgb(33, 139, 186)',
                                            borderBottom: '2px solid rgb(33, 139, 186)',
                                            borderLeft: "none",
                                            borderRight: "none",
                                            ":hover": {
                                                borderTop: '2px solid rgb(33, 139, 186)',
                                                borderBottom: '2px solid rgb(33, 139, 186)',
                                                borderLeft: "none",
                                                borderRight: "none",
                                                boxShadow: "none",

                                            },
                                            ":focus": {
                                                borderTop: '2px solid rgb(33, 139, 186)',
                                                borderBottom: '2px solid rgb(33, 139, 186)',
                                                borderLeft: "none",
                                                borderRight: "none",
                                            },
                                            borderColor: state.isFocused ? 'none' : base.borderColor,
                                            outline: state.isFocused ? 'none' : base.outline,
                                        }),
                                        control: (base, state) => ({
                                            ...base,
                                            backgroundColor: 'inherit',
                                            boxShadow: 'none',
                                            border: 'none',
                                            ":hover": {
                                                border: 'none',
                                                boxShadow: "none",

                                            },
                                            ":focus": {
                                                border: 'none',
                                            },
                                        }),
                                        menu: (base, props) => ({
                                            ...base,
                                            backgroundColor: '#b0c9c7',
                                            color: 'black',
                                        }),
                                        option: (base, props) => ({
                                            ...base,
                                            backgroundColor: props.isSelected ? '#226a8d' : '#b0c9c7',
                                            color: props.isSelected ? 'white' : 'black',
                                            '&:hover': {
                                                backgroundColor: '#226a8d',
                                                color: 'white'
                                            }
                                        }),
                                        indicatorsContainer: (base, props) => ({
                                            ...base,
                                            backgroundColor: '#f2f0df',
                                            color: 'black',
                                        }),
                                        indicatorSeparator: (base, props) => ({
                                            ...base,
                                            backgroundColor: '#f2f0df',
                                            color: 'black',
                                        }),
                                        noOptionsMessage: (base, props) => ({
                                            ...base,
                                            backgroundColor: 'inherit',
                                            color: 'black',
                                        }),
                                        placeholder: (base, props) => ({
                                            ...base,
                                            backgroundColor: 'inherit',
                                            color: 'black',
                                        }),
                                    }
                                }
                            />
                            <input type="number"
                                className="w-[22%] rounded-full bg-[#f2f0df] py-2 px-4 text-black text-sm border-[#001b44] border-2 focus:outline-none                                "
                                min="0"
                                placeholder="Rate"
                                disabled
                            />
                        </div>
                    </div>
                    <div className="flex flex-col mt-8 rounded-lg py-4 px-8 w-[48%] bg-gradient-to-b from-[#d5e4db] to-[#b0c9c7] border-white border-2"
                        style={{
                            boxShadow: "2px 4px 6px rgb(9, 71, 166)"
                        }}
                    >
                        <p className="text-lg font-bold">
                            Target Currency
                        </p>
                        <div className="flex flex-row justify-between items-center">
                            <div className="py-4 h-fit px-8 rounded-full bg-[#082748] text-white text-3xl font-bold flex flex-row justify-between items-center"
                                style={{
                                    boxShadow: "0px 0px 4px rgb(123, 150, 156), 0px -3px 2px rgb(33, 139, 186), 0px -6px 2px rgb(225, 255, 255), 0px 6px 2px rgb(0, 5, 24)",
                                    textShadow: "2px 1px 0px rgb(0, 5, 24)"
                                }}>
                                <img src={leftArrow} alt="left" className="w-10 h-10 inline mr-4" />
                                0.000,025
                            </div>
                            <img src={receiveIcon} alt="give" className="w-32 h-32" />

                        </div>
                        <div className="py-4 h-fit px-8 text-white text-lg flex flex-row justify-between items-center">
                            <Select
                                options={availableCurrencies.map((currency) => ({ value: currency.tag, label: currency.name }))}
                                isSearchable
                                maxMenuHeight={200} // Adjust this value to control the max height of the dropdown menu
                                className="w-[68%] border-none"
                                placeholder="Select Currency"
                                onChange={(e: any) => setTargetCurrency(e.value)}
                                styles={
                                    {
                                        container: (base, state) => ({
                                            ...base,
                                            backgroundColor: 'inherit',
                                            boxShadow: 'none',
                                            borderTop: '2px solid rgb(33, 139, 186)',
                                            borderBottom: '2px solid rgb(33, 139, 186)',
                                            borderLeft: "none",
                                            borderRight: "none",
                                            ":hover": {
                                                borderTop: '2px solid rgb(33, 139, 186)',
                                                borderBottom: '2px solid rgb(33, 139, 186)',
                                                borderLeft: "none",
                                                borderRight: "none",
                                                boxShadow: "none",

                                            },
                                            ":focus": {
                                                borderTop: '2px solid rgb(33, 139, 186)',
                                                borderBottom: '2px solid rgb(33, 139, 186)',
                                                borderLeft: "none",
                                                borderRight: "none",
                                            },
                                            borderColor: state.isFocused ? 'none' : base.borderColor,
                                            outline: state.isFocused ? 'none' : base.outline,
                                        }),
                                        control: (base, state) => ({
                                            ...base,
                                            backgroundColor: 'inherit',
                                            boxShadow: 'none',
                                            border: 'none',
                                            ":hover": {
                                                border: 'none',
                                                boxShadow: "none",

                                            },
                                            ":focus": {
                                                border: 'none',
                                            },
                                        }),
                                        menu: (base, props) => ({
                                            ...base,
                                            backgroundColor: '#b0c9c7',
                                            color: 'black',
                                        }),
                                        option: (base, props) => ({
                                            ...base,
                                            backgroundColor: props.isSelected ? '#226a8d' : '#b0c9c7',
                                            color: props.isSelected ? 'white' : 'black',
                                            '&:hover': {
                                                backgroundColor: '#226a8d',
                                                color: 'white'
                                            }
                                        }),
                                        indicatorsContainer: (base, props) => ({
                                            ...base,
                                            backgroundColor: '#f2f0df',
                                            color: 'black',
                                        }),
                                        indicatorSeparator: (base, props) => ({
                                            ...base,
                                            backgroundColor: '#f2f0df',
                                            color: 'black',
                                        }),
                                        noOptionsMessage: (base, props) => ({
                                            ...base,
                                            backgroundColor: 'inherit',
                                            color: 'black',
                                        }),
                                        placeholder: (base, props) => ({
                                            ...base,
                                            backgroundColor: 'inherit',
                                            color: 'black',
                                        }),
                                    }
                                }
                            />
                            <input type="number"
                                className="w-[22%] rounded-full bg-[#f2f0df] py-2 px-4 text-black text-sm border-[#001b44] border-2 focus:outline-none"
                                min="0"
                                placeholder="Rate"
                                disabled
                            />
                        </div>
                    </div>
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