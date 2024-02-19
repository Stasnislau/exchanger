import { IRate } from "../../types";
import { motion, AnimatePresence } from "framer-motion";
import closeIcon from "../../assets/icons/close.svg";


interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    historyItems: IRate[] | undefined;
}

const Drawer = (props: DrawerProps) => {
    const drawerVariants = {
        open: {
            width: window.innerWidth > 768 ? window.innerWidth < 860 ? "35%" : "20%" : "100%",
            height: window.innerWidth <= 768 ? "100%" : "100%",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
            },
            opacity: 1,
        },
        closed: {
            width: "0%",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
            },
            opacity: 0,
        },
    };
    return (
        <AnimatePresence >
            {props.isOpen && (
                <motion.div
                    className="z-50 bg-white lg:relative absolute top-0 left-0"
                    initial="closed"
                    animate="open"
                    exit="closed"
                    transition={{ duration: 0.2 }}
                    variants={drawerVariants}
                    style={
                        {
                            boxShadow: "0px 0px 5px rgba(36, 93, 176, 0.6), 0px 0px 20px rgba(36, 93, 176, 0.4)",
                        }
                    }
                >
                    <div className="flex flex-col bg-gradient-to-b 
                    from-[#4174ab] to-[#10407f] w-full h-full text-text relative overflow-y-auto px-2
                    ">

                        <div className="absolute md:top-[2%] top-[3%] right-[5%] lg:hidden">
                            <button
                                className="p-0 m-0 border-none transition-all duration-300 ease-in-out hover:text-secondary"
                                onClick={props.onClose}
                            >
                                <img src={closeIcon} alt="close" className="w-6 h-6" />
                            </button>
                        </div>
                        <h1 className="text-2xl my-6 font-bold text-center text-white">History</h1>
                        <div className="flex flex-col gap-4">
                            {!props.historyItems || props.historyItems.length === 0 ? (
                                <span className="text-center text-gray-500">No history</span>
                            ) : (
                                props.historyItems.map((item, index) => (
                                    <button key={index} className="flex w-full flex-col gap-2 py-4 lg:px-4 md:px-2 sm:px-1 px-6 bg-white rounded-lg shadow-md sm:text-sm text-xl
                                        hover:bg-gray-200 transition-all duration-300 ease-in-out">
                                        <div className="flex flex-row justify-between text-gray-700 w-full">
                                            <p>{item.baseCurrency.toUpperCase()}/{item.targetCurrency.toUpperCase()}</p>
                                            <p>{item.createdAt.toLocaleDateString()}</p>
                                        </div>
                                        <div className="flex flex-row justify-between text-gray-700 w-full">
                                            <span>Rate: {item.value.toFixed(4)}</span>
                                        </div>
                                        {item.amount && item.result && (
                                            <div className="flex flex-row justify-between text-gray-700 w-full">
                                                <p>Amount: {item.amount.toFixed(2)}</p>
                                                <p>Result: {item.result.toFixed(2)}</p>
                                            </div>
                                        )}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                </motion.div>
            )
            }

        </AnimatePresence>
    );
}

export default Drawer;