import { useState } from "react";
import { Header } from "../../components";
import giveIcon from "../../assets/icons/give.svg"
import receiveIcon from "../../assets/icons/receive.svg"
import rightArrow from "../../assets/icons/right-arrow.svg"
import leftArrow from "../../assets/icons/left-arrow.svg"
import { availableCurrencies } from "../../constants";
import Select from "react-select";

const MainPage = () => {
    const [date, setDate] = useState(new Date());

    return (
        <div className="w-full h-screen ">
            <Header />
            <div className="justify-center items-center md:mt-8 mt-4 md:mx-40 mx-10 flex flex-col">
                <p className="text-6xl text-center">Currency Exchange</p>
                <div className="flex justify-start items-center p-2 md:mt-8 mt-4 w-4/5 rounded-full bg-[#f5f4de] border-white border-[2px]"
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
                                    boxShadow: "0px 0px 4px rgba(123, 150, 156), 0px -3px 2px rgb(33, 139, 186), 0px -6px 2px rgb(225, 255, 255), 0px 6px 2px rgb(0, 5, 24)",
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
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        backgroundColor: "#082748",
                                        border: "none",
                                        boxShadow: "none",
                                        color: "white",
                                    }),
                                    singleValue: (provided) => ({
                                        ...provided,
                                        color: "white",
                                    }),
                                    option: (provided, state) => ({
                                        ...provided,
                                        backgroundColor: state.isFocused ? "#0b3d91" : "#082748",
                                        color: "white",
                                    }),
                                    menu: (provided) => ({
                                        ...provided,
                                        backgroundColor: "#082748",
                                    }),
                                    menuList: (provided) => ({
                                        ...provided,
                                        backgroundColor: "#082748",
                                    }),
                                }}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div >

    );
}

export default MainPage;