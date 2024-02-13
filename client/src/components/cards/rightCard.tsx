
import Select from "react-select";
import leftArrow from "../../assets/icons/left-arrow.svg";
import receiveIcon from "../../assets/icons/receive.svg";

interface RightCardProps {
    availableCurrencies: {
        name: string;
        tag: string;
    }[],
    setTargetCurrency: any
    value: number
}

const RightCard = ({
    availableCurrencies, setTargetCurrency, value
}: RightCardProps) => {

    return (
        <div className="flex flex-col mt-8 rounded-lg py-4 px-8 lg:w-[48%] w-full bg-gradient-to-b from-[#d5e4db] to-[#b0c9c7] border-white border-2"
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
                    {1/value < 1 ? (1/value).toFixed(4) : (1/value).toFixed(2)}
                </div>
                <img src={receiveIcon} alt="give" className="w-32 h-32" />

            </div>
            <div className="py-4 h-fit px-8 text-white text-lg flex flex-row justify-between items-center">
                <Select
                    options={availableCurrencies.map((currency) => ({ value: currency.tag, label: currency.name }))}
                    isSearchable
                    maxMenuHeight={150}
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
    )

}

export default RightCard;