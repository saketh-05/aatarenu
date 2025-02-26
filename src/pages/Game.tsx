import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import OutEffect from "../components/helpers/OutEffect";

type GamePhase = "toss" | "playing" | "ended";

const Game = () => {
  // Existing state declarations
  const navigate = useNavigate();
  const [showTossResult, setShowTossResult] = useState<boolean>(false);
  const [animateHands, setAnimateHands] = useState<boolean>(false);
  const [shake, setShake] = useState<boolean>(false);
  const [showOutEffect, setShowOutEffect] = useState<boolean>(false);

  // Game phase state
  const [gamePhase, setGamePhase] = useState<GamePhase>("toss");

  // Additional states required for the game
  const [playerChoice, setPlayerChoice] = useState<number | null>(null);
  const [computerChoice, setComputerChoice] = useState<number | null>(null);
  const [tossChoice, setTossChoice] = useState<"odd" | "even" | null>(null);
  const [tossPlayerChoice, setTossPlayerChoice] = useState<number | null>(null);
  const [tossComputerChoice, setTossComputerChoice] = useState<number | null>(
    null
  );
  const [playerWonToss, setPlayerWonToss] = useState<boolean>(false);
  const [isBatting, setIsBatting] = useState<boolean>(true);
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [computerScore, setComputerScore] = useState<number>(0);
  const [target, setTarget] = useState<number | null>(null);
  const [innings, setInnings] = useState<number>(1);
  const [winner, setWinner] = useState<
    | "player"
    | "computer"
    | "draw"
    | "Unknown error occured! We are sorry for the inconvenience"
    | null
  >(null);

  // Dummy hand images object (update the paths as needed)
  const handImages: {
    [key: number]: string;
    default: string;
    defaultCom: string;
  } = {
    1: "/hand-signs/1-hand.png",
    2: "/hand-signs/2-hand.png",
    3: "/hand-signs/3-hand.png",
    4: "/hand-signs/4-hand.png",
    5: "/hand-signs/5-hand.png",
    6: "/hand-signs/6-hand.png",
    default: "/hand-signs/default.png",
    11: "/hand-signs/1-handCom.png",
    12: "/hand-signs/2-handCom.png",
    13: "/hand-signs/3-handCom.png",
    14: "/hand-signs/4-handCom.png",
    15: "/hand-signs/5-handCom.png",
    16: "/hand-signs/6-handCom.png",
    defaultCom: "/hand-signs/defaultCom.webp",
  };

  // Returns a random number between 1 and 6
  const generateComputerChoice = (): number => {
    return Math.floor(Math.random() * 6) + 1;
  };

  // Called when a player gets out
  const handleOut = (): void => {
    if (innings === 1) {
      // First innings ends: set target and switch batting roles for the second innings.
      setTarget(isBatting ? playerScore : computerScore);
      setPlayerScore(0);
      setComputerScore(0);
      setInnings(2);
      setGamePhase("playing");
      setIsBatting(!isBatting);
    } else {
      // Second innings ends: check win condition
      if (target !== null) {
        if (isBatting && playerScore > target) {
          setWinner("player");
          setGamePhase("ended");
        } else if (isBatting && playerScore < target) {
          setWinner("computer");
          setGamePhase("ended");
        } else if (!isBatting && computerScore > target) {
          setWinner("computer");
          setGamePhase("ended");
        } else if (!isBatting && computerScore < target) {
          setWinner("player");
          setGamePhase("ended");
        } else if (playerScore === target || computerScore === target) {
          setWinner("draw");
          setGamePhase("ended");
        } else {
          setWinner(
            "Unknown error occured! We are sorry for the inconvenience"
          );
          setGamePhase("ended");
        }
      }
    }
  };

  // Checks win condition during the second innings.
  const checkWinCondition = (): void => {
    if (innings === 2 && target !== null) {
      if (isBatting && playerScore > target) {
        setWinner("player");
        setGamePhase("ended");
      } else if (!isBatting && computerScore > target) {
        setWinner("computer");
        setGamePhase("ended");
      }
    }
  };

  useEffect(() => {
    checkWinCondition();
  }, [playerScore, computerScore]);

  // Resets the game to its initial state.
  const resetGame = (): void => {
    setPlayerScore(0);
    setComputerScore(0);
    setInnings(1);
    setGamePhase("toss");
    setWinner(null);
    setIsBatting(true);
    setTarget(null);
    setPlayerChoice(null);
    setComputerChoice(null);
    setTossChoice(null);
    setTossPlayerChoice(null);
    setTossComputerChoice(null);
  };

  // Modified handle number choice with animations
  const handleNumberChoice = (number: number): void => {
    setAnimateHands(true);
    setPlayerChoice(number);
    const compChoice = generateComputerChoice();
    setComputerChoice(compChoice);

    // Reset hands animation after showing numbers
    setTimeout(() => {
      setAnimateHands(false);
      if (number === compChoice) {
        setShake(true);
        setShowOutEffect(true);
        setTimeout(() => {
          setShowOutEffect(false);
          setShake(false);
          handleOut();
        }, 2000);
      } else {
        if (isBatting) {
          setPlayerScore((prev) => prev + number);
        } else {
          setComputerScore((prev) => prev + compChoice);
        }
      }
    }, 500);
  };

  const handleTossChoiceInput = (choice: "odd" | "even") => {
    setTossChoice(choice);
  };
  // Modified handle toss choice with animations
  const handleTossChoice = (choice: number): void => {
    const playerNum = choice;
    const computerNum = generateComputerChoice();
    setTossPlayerChoice(playerNum);
    setTossComputerChoice(computerNum);

    // Animate toss result reveal
    setAnimateHands(true);
    setTimeout(() => {
      setShowTossResult(true);
      setAnimateHands(false);
      const sum = playerNum + computerNum;
      setPlayerWonToss(
        (sum % 2 === 0 && tossChoice === "even") ||
          (sum % 2 === 1 && tossChoice === "odd")
      );

      setTimeout(() => {
        if (playerWonToss) {
          console.log("Player won the toss!");
        } else {
          const computerChoiceStr = Math.random() < 0.5 ? "bat" : "bowl";
          setIsBatting(computerChoiceStr === "bowl");
          setGamePhase("playing");
        }
        setShowTossResult(false);
      }, 6000);
    }, 1000);
  };
  const handleBatBowlChoice = (choice: "bat" | "bowl") => {
    setIsBatting(choice === "bat");
    setGamePhase("playing");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }} // Initial state (before animation)
      animate={{ opacity: 1, y: 0 }} // Final state (after animation)
      transition={{ duration: 0.5 }} // Animation duration
      className='min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8 relative overflow-hidden'
      style={{ perspective: "1000px" }}
    >
      <AnimatePresence>{showOutEffect && <OutEffect />}</AnimatePresence>

      {/* Main Game Container */}
      <div
        className={`
        max-w-4xl mx-auto 
        backdrop-blur-lg bg-white/30 
        rounded-xl p-8 shadow-xl 
        transform transition-all duration-500
        hover:shadow-2xl hover:scale-[1.02]
        ${shake ? "animate-shake" : ""}
      `}
      >
        <h1
          className='text-4xl font-bold text-center text-white mb-8 
                       transition-all duration-300 transform hover:scale-110'
        >
          Hand Cricket
        </h1>

        {gamePhase === "toss" && (
          <div className='text-center space-y-4 transform transition-all duration-500'>
            {tossChoice !== null && showTossResult === false && (
              <div className='flex flex-col gap-8 justify-center items-center'>
                <div className='text-xl text-white animate-fade-in'>
                  Pick a number between 1 and 6 for the toss
                </div>
                <div className='flex gap-4'>
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleTossChoice(num)}
                      className='bg-blue-500 text-white px-4 py-2 rounded-lg
                           transform transition-all duration-300
                           hover:bg-blue-600 hover:scale-110 hover:rotate-3
                           active:scale-95'
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {tossChoice === null && (
              <>
                <h2 className='text-2xl text-white animate-fade-in pb-5'>
                  Choose Odd or Even
                </h2>
                <div className='space-x-4'>
                  <button
                    onClick={() => handleTossChoiceInput("odd")}
                    className='bg-blue-500 text-white px-6 py-2 rounded-lg
                         transform transition-all duration-300
                         hover:bg-blue-600 hover:scale-110 hover:rotate-2
                         active:scale-95'
                  >
                    Odd
                  </button>
                  <button
                    onClick={() => handleTossChoiceInput("even")}
                    className='bg-blue-500 text-white px-6 py-2 rounded-lg
                         transform transition-all duration-300
                         hover:bg-blue-600 hover:scale-110 hover:-rotate-2
                         active:scale-95'
                  >
                    Even
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {gamePhase === "toss" &&
          showTossResult &&
          tossPlayerChoice !== null &&
          tossComputerChoice !== null && (
            <motion.div
              initial={{ opacity: 0, x: -100 }} // Initial state (before animation)
              animate={{ opacity: 1, x: 0 }} // Final state (after animation)
              transition={{ duration: 0.5 }} // Animation duration
              className='text-xl text-white mb-4 animate-slide-up gap-4 flex flex-col items-center' // Additional styles
            >
              <p className='transform transition-all duration-300 hover:scale-105'>
                You chose: {tossPlayerChoice}
              </p>
              <p className='transform transition-all duration-300 hover:scale-105'>
                Computer chose: {tossComputerChoice}
              </p>
              <p className='font-bold transform transition-all duration-300 hover:scale-105'>
                Sum: {tossPlayerChoice + tossComputerChoice}(
                {(tossPlayerChoice + tossComputerChoice) % 2 === 0
                  ? "Even"
                  : "Odd"}
                )
              </p>
              <span className='p-5 font-bold transform transition-all duration-300 hover:scale-105 font-sans text-3xl text-cyan-300 bg-cyan-900 rounded-xl drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]'>
                {playerWonToss ? "You won the toss!" : "Computer won the toss!"}
              </span>
              {playerWonToss && (
                <div className='text-center space-y-4 transform transition-all duration-500'>
                  <h2 className='text-2xl text-white animate-fade-in'>
                    You won the toss! Choose to bat or bowl.
                  </h2>
                  <div className='space-x-4'>
                    <button
                      onClick={() => handleBatBowlChoice("bat")}
                      className='bg-blue-500 text-white px-6 py-2 rounded-lg
                         transform transition-all duration-300
                         hover:bg-blue-600 hover:scale-110 hover:-rotate-2
                         active:scale-95'
                    >
                      {" "}
                      Bat
                    </button>
                    <button
                      className='bg-blue-500 text-white px-6 py-2 rounded-lg
                    transform transition-all duration-300
                    hover:bg-blue-600 hover:scale-110 hover:-rotate-2
                    active:scale-95'
                      onClick={() => handleBatBowlChoice("bowl")}
                    >
                      Bowl
                    </button>
                  </div>
                </div>
              )}
              {!playerWonToss && (
                <div className='text-center space-y-4 transform transition-all duration-500'>
                  {isBatting
                    ? "Computer choose to Bat"
                    : "Computer choose to Bowl"}
                </div>
              )}
            </motion.div>
          )}

        {gamePhase === "playing" && (
          <div className='space-y-8 transform transition-all duration-500'>
            <div className='flex justify-between items-center'>
              {/* Score Display with animations */}
              <div className='text-center transform transition-all duration-300 hover:scale-105'>
                <h3 className='text-xl text-white'>Player</h3>
                <p className='text-lg text-white animate-pulse'>
                  Score: {playerScore}
                </p>
                {target !== null && (
                  <p className='text-lg text-white'>Target: {target}</p>
                )}
              </div>
              <div className='text-center transform transition-all duration-300 hover:scale-105'>
                <h3 className='text-xl text-white'>Innings {innings}</h3>
                <p className='text-lg text-blue-950'>
                  {isBatting ? "You're Batting" : "You're Bowling"}
                </p>
              </div>
              <div className='text-center transform transition-all duration-300 hover:scale-105'>
                <h3 className='text-xl text-white'>Computer</h3>
                <p className='text-lg text-white animate-pulse'>
                  Score: {computerScore}
                </p>
                {target !== null && (
                  <p className='text-lg text-white'>Target: {target}</p>
                )}
              </div>
            </div>

            {/* Hands display with animations */}
            <div className='flex justify-between items-center'>
              <div className='text-center'>
                <div className='text-2xl text-white mb-4 animate-fade-in'>
                  {playerChoice !== null && `You chose: ${playerChoice}`}
                </div>
                <div
                  className={`
                  w-32 h-32
                  mt-20 
                  transform transition-all duration-500
                  ${animateHands ? "animate-hand-ready" : "animate-bounce"}
                `}
                >
                  <img
                    src={
                      playerChoice
                        ? handImages[playerChoice]
                        : handImages.default
                    }
                    alt='Player hand'
                    className='w-full h-full object-contain transform hover:scale-110 transition-transform'
                  />
                </div>
              </div>

              <div className='text-center'>
                <div className='text-2xl text-white mb-4 animate-fade-in'>
                  {computerChoice !== null &&
                    `Computer chose: ${computerChoice}`}
                </div>
                <div
                  className={`
                  w-32 h-32 
                  mt-20
                  transform transition-all duration-500
                  float-right
                  ${animateHands ? "animate-hand-ready" : "animate-bounce"}
                `}
                >
                  <img
                    src={
                      computerChoice
                        ? handImages[computerChoice + 10]
                        : handImages.defaultCom
                    }
                    alt='Computer hand'
                    className='w-full h-full object-contain transform hover:scale-110 transition-transform'
                  />
                </div>
              </div>
            </div>

            {/* Number buttons with animations */}
            <div className='grid grid-cols-6 gap-4'>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <button
                  key={num}
                  onClick={() => handleNumberChoice(num)}
                  className='bg-blue-500 text-white px-4 py-2 rounded-lg
                           transform transition-all duration-300
                           hover:bg-blue-600 hover:scale-110 hover:rotate-3
                           active:scale-95'
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        )}

        {gamePhase === "ended" && (
          <div className='text-center space-y-4 animate-fade-in'>
            <h2 className='text-3xl text-white animate-bounce'>Game Over!</h2>
            <p className='text-2xl text-white transform transition-all duration-500 hover:scale-110'>
              {winner === "player" ? "You won!" : "Computer won!"}
            </p>
            <button
              onClick={resetGame}
              className='bg-blue-500 text-white px-6 py-2 rounded-lg
                       transform transition-all duration-300
                       hover:bg-blue-600 hover:scale-110
                       active:scale-95'
            >
              Play Again
            </button>
          </div>
        )}
      </div>
      <button
        className='text-xl text-emerald-900 bg-emerald-400 rounded-3xl font-mono mb-4 animate-slide-up p-3 mt-10'
        onClick={() => navigate("/")}
      >
        Home
      </button>
    </motion.div>
  );
};

export default Game;
