import { IRate } from "../../types";
import { motion, AnimatePresence } from "framer-motion";


interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    historyItems: IRate[] | undefined;
}

const Drawer = (props: DrawerProps) => {
    const drawerVariants = {
        open: {
            width: window.innerWidth > 600 ? window.innerHeight < 1024 ? "20%" : "30%" : "100%",
            height: window.innerWidth < 601 ? "100%" : "auto",
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
                    className="z-50 bg-white sm:relative absolute top-0 left-0"
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

                        <div className="absolute top-5 right-5 sm:hidden blok">
                            <button
                                className="p-0 m-0 border-none transition-all duration-300 ease-in-out hover:text-secondary"
                                onClick={props.onClose}
                            >
                                X
                            </button>
                        </div>
                        <h1 className="text-2xl mb-2 font-bold text-center text-white">History</h1>
                        <div className="flex flex-col gap-4">
                            {!props.historyItems || props.historyItems.length === 0 ? (
                                <span className="text-center text-gray-500">No history</span>
                            ) : (
                                props.historyItems.map((item, index) => (
                                    <button key={index} className="flex w-full flex-col gap-2 p-4 bg-white rounded-lg shadow-md text-sm
                                        hover:bg-gray-200 transition-all duration-300 ease-in-out">
                                        <div className="flex flex-row justify-between text-gray-700 w-full">
                                            <p>{item.baseCurrency.toUpperCase()}/{item.targetCurrency.toUpperCase()}</p>
                                            <p>{item.createdAt.toLocaleDateString()}</p>
                                        </div>
                                        <div className="flex flex-row justify-between text-gray-700 w-full">
                                            <span>Rate: {item.value}</span>
                                            <span>{item.result}</span>
                                        </div>
                                        {item.amount && item.result && (
                                            <div className="flex flex-row justify-between text-gray-700 w-full">
                                                <p>Amount: {item.amount}</p>
                                                <p>Result: {item.result}</p>
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