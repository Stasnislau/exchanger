
import Select from "react-select";
import leftArrow from "../../assets/icons/left-arrow.svg";
import receiveIcon from "../../assets/icons/receive.svg";

interface RightCardProps {
    availableCurrencies: {
        name: string;
        tag: string;
    }[],
    setTargetCurrency: any,
    value: number,
    targetCurrency: string
}

const RightCard = ({
    availableCurrencies, setTargetCurrency, value, targetCurrency
}: RightCardProps) => {

    return (
        <div className="flex flex-col md:mt-8 mt-4 rounded-lg md:py-4 py-2 lg:px-8 sm:px-4 px-2 md:w-[48%] w-full bg-gradient-to-b from-[#d5e4db] to-[#b0c9c7] border-white border-2"
            style={{
                boxShadow: "2px 4px 6px rgb(9, 71, 166)"
            }}
        >
            <p className="sm:text-lg text-md font-bold">
                Target Currency
            </p>
            <div className="hidden md:flex flex-row justify-between items-center pt-2">
                <div className="md:py-4 sm:w-[45%] md:w-[70%] h-fit lg:px-8 md:px-4 px-2 rounded-full bg-[#082748] text-white xl:text-5xl md:text-3xl sm:text-2xl text-lg font-bold flex flex-row justify-between items-center"
                    style={{
                        boxShadow: "0px 0px 4px rgb(123, 150, 156), 0px -3px 2px rgb(33, 139, 186), 0px -6px 2px rgb(225, 255, 255), 0px 6px 2px rgb(0, 5, 24)",
                        textShadow: "2px 1px 0px rgb(0, 5, 24)"
                    }}>
                    <img src={leftArrow} alt="left" className="md:w-10 md:h-10 sm:w-8 sm:h-8 w-6 h-6 inline sm:mr-4 mr-2" />
                    {value < 1 ? (value).toFixed(4) : (value).toFixed(2)}
                </div>
                <img src={receiveIcon} alt="give" className="lg:w-32 lg:h-32 sm:w-20 sm:h-20 w-12 h-12 mr-3 sm:mr-0" />

            </div>
            <div className="py-4 h-fit xl:px-8 md:px-4 px-2 text-white md:text-lg sm:text-md text-sm flex flex-row justify-between items-center">
                <Select
                    options={availableCurrencies.map((currency) => ({ value: currency.tag, label: currency.name }))}
                    isSearchable
                    maxMenuHeight={150}
                    value={{ value: targetCurrency, label: availableCurrencies.find((currency) => currency.tag === targetCurrency)?.name }}
                    className="w-[68%] border-none"
                    placeholder="Currency"
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
                                zIndex: 5
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
                    className="w-[28%] rounded-full bg-[#f2f0df] py-2 md:px-4 px-2 text-black text-sm border-[#001b44] sm:border-2 border-[1px] focus:outline-none"
                    min="0"
                    placeholder="Rate"
                    disabled
                />
            </div>
        </div>
    )

}

export default RightCard;