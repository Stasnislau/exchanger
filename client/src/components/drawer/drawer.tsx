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
            width: window.innerWidth > 600 ? window.innerHeight < 1024 ? "15%" : "30%" : "100%",
            height: "100%", 
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
                >
                    <div className="flex flex-col grow relative bg-white">
                        <div className="flex justify-end p-4">
                            <button
                                className="p-0 m-0 border-none transition-all duration-300 ease-in-out hover:text-secondary"
                                onClick={props.onClose}
                            >
                                X
                                {/* <img src="/assets/icons/close.svg" alt="close" className="h-6" /> */}
                            </button>
                        </div>
                        <div className="flex flex-col gap-4 p-4">
                            <h1 className="text-xl font-bold">History</h1>
                            <div className="flex flex-col gap-4">
                                {props.historyItems?.map((item, index) => (
                                    <div key={index} className="flex flex-col gap-2">
                                        <div className="flex justify-between">
                                            <span>{item.baseCurrency}</span>
                                            <span>{item.targetCurrency}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>{item.value}</span>
                                            <span>{item.result}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )
            }

        </AnimatePresence>
    );
}

export default Drawer;