import React from "react";
import { AuroraBackground } from "../components/ui/aurora-background";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import Navbar from "../components/ui/Navbar";
import { BankSuit } from "../pages/BankSuit";
import { BankMove } from "../pages/BankMove";

const HomeLayout = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isRegis, setIsRegis] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);
  const [userRole, setUserRole] = React.useState(null);
  const [isOpenBankSuit, setIsOpenBankSuit] = React.useState(false);
  const [isOpenBankMove, setIsOpenBankMove] = React.useState(false);

  React.useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setIsLogin(true);
      setUserRole(user.role?.name?.toLowerCase());
    } else {
      setIsLogin(false);
      setUserRole(null);
    }
  }, []);

  const closeLoginModal = () => {
    setIsOpen(false);
  };

  const closeRegisterModal = () => {
    setIsRegis(false);
  };

  const closeBankSuitModal = () => {
    setIsOpenBankSuit(false);
  };

  const closeBankMoveModal = () => {
    setIsOpenBankMove(false);
  };

  const getButtonText = () => {
    switch (userRole) {
      case "pegawai":
        return "Bank Suit";
      case "professional sales":
        return "Bank Move";
      default:
        return "BankCash";
    }
  };

  const handleMainButtonClick = () => {
    switch (userRole) {
      case "pegawai":
        setIsOpenBankSuit(true);
        break;
      case "professional sales":
        setIsOpenBankMove(true);
        break;
      default:
        // Default action
        console.log("Open default BankCash modal");
        break;
    }
  };

  return (
    <div>
      <Navbar />
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.1,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className={`relative flex-col gap-4 items-center justify-center px-4 ${
            isOpen || isRegis ? "hidden" : "flex"
          }`}
        >
          <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
            Your Assistant for
          </div>
          <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
            Accurate Bank Product Recommendations.
          </div>

          {!isLogin ? (
            <div className="flex space-x-5">
              <button
                className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2 cursor-pointer"
                onClick={() => setIsOpen(true)}
              >
                Login to Get Started
              </button>
              <button
                className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2 cursor-pointer"
                onClick={() => setIsRegis(true)}
              >
                Register Now
              </button>
            </div>
          ) : (
            <div className="flex space-x-5">
              <button
                className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2 cursor-pointer"
                onClick={handleMainButtonClick}
              >
                {getButtonText()}
              </button>
            </div>
          )}
        </motion.div>
      </AuroraBackground>

      {!isLogin && isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-0 left-0 size-full bg-white/10 text-white"
        >
          <div className="flex items-center justify-center h-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: 0.1,
              }}
            >
              <Login onClick={closeLoginModal} setIsOpen={setIsOpen} />
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Modal Register */}
      {!isLogin && isRegis && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-0 left-0 size-full bg-white/10 text-white"
        >
          <div className="flex items-center justify-center h-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: 0.1,
              }}
            >
              <Register onClick={closeRegisterModal} setIsRegis={setIsRegis} />
            </motion.div>
          </div>
        </motion.div>
      )}

      {isLogin && isOpenBankSuit && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute z-[100] top-0 left-0 size-full bg-white/10 text-white"
        >
          <div className="flex items-center justify-center h-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: 0.1,
              }}
            >
              <BankSuit
                onClick={closeBankSuitModal}
                setIsOpen={setIsOpenBankSuit}
              />
            </motion.div>
          </div>
        </motion.div>
      )}

      {isLogin && isOpenBankMove && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute z-[100] top-0 left-0 size-full bg-white/10 text-white"
        >
          <div className="flex items-center justify-center h-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: 0.1,
              }}
            >
              <BankMove
                onClick={closeBankMoveModal}
                setIsOpen={setIsOpenBankMove}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default HomeLayout;
