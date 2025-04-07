import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { onboardingSteps } from "../data/onboarding"
import Logo from "../assets/gyde-small.svg"
import GydeLogo from "../assets/Gyde-logo seperate-cropped.svg"
import "../styles/onboardingPage.css"


const OnboardingWizard = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})
  const [introComplete, setIntroComplete] = useState(false)
  const [loadedImages, setLoadedImages] = useState({})
  const [isTransitioning, setIsTransitioning] = useState(false)

  const transitionDuration = 300 
  const backgroundTransitionDuration = 500 

  const totalSteps = onboardingSteps.length
  const stepData = onboardingSteps[currentStep]

  const actualSteps = introComplete ? onboardingSteps.slice(1) : onboardingSteps
  const currentProgress = introComplete ? currentStep - 1 : currentStep

  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = onboardingSteps.map((step, index) => {
        return new Promise((resolve) => {
          if (!step.backgroundImage) {
            resolve({ index, loaded: true })
            return
          }
          
          const img = new Image()
          img.src = step.backgroundImage
          img.onload = () => resolve({ index, loaded: true })
          img.onerror = () => resolve({ index, loaded: false })
        })
      })
      const results = await Promise.all(imagePromises)
      const imagesMap = {}
      
      results.forEach(result => {
        imagesMap[result.index] = result.loaded
      })
      
      setLoadedImages(imagesMap)
    }

    preloadImages()
  }, [])

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
        setIsTransitioning(true)
        setTimeout(() => {
          setCurrentStep(prev => prev + 1)
          setTimeout(() => {
            setIsTransitioning(false)
          }, 50) 
        }, transitionDuration)
    }
  }

  const handleBack = () => {
    if(currentStep > 0) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentStep(prev => prev - 1)
        setTimeout(() => {
          setIsTransitioning(false)
        }, 50) 
      }, transitionDuration)
    }
  }

  const handleAnswerSelect = (answerId) => {
    setUserAnswers(prev => ({
      ...prev,
      [stepData.id]: answerId
    }))
    handleNext();
  }

  const handleOkayClick = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setIntroComplete(true)
      setCurrentStep(prev => prev + 1)
      setTimeout(() => {
        setIsTransitioning(false)
      }, 50)
    }, transitionDuration)
  }
  
  const handleFinish = () => {
    console.log("Collected Answers:", userAnswers)
  }

  const currentBackground = stepData.backgroundImage || ''
  const backgroundStyle = {
    backgroundImage: `url(${currentBackground})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "100vh",
    transition: `opacity ${backgroundTransitionDuration}ms ease-in-out`,
    opacity: isTransitioning ? 0 : 1
  }

  return (
    <div 
      className="onboarding-container min-h-screen flex flex-col w-full overflow-x-hidden pt-8 md:pt-10"
      style={backgroundStyle}>

        <div className="flex justify-center h-screen">
            <div className="w-4/5 ">
              <div 
                className={`w-full pl-4 md:pl-4 flex justify-center transition-all duration-300 ease-in-out ${
                introComplete ? "opacity-0 h-0 overflow-hidden m-0 p-0" : "opacity-100"
                }`}
                style={{ 
                height: introComplete ? '0px' : 'auto',
                marginBottom: introComplete ? '0px' : '2rem'
                }}
              >
                <img src={Logo} alt="" className="w-[10rem] md:w-[15rem]" />
                <img src={GydeLogo} alt="" className="w-[10rem] h-[10rem] relative left-[-5.9rem] md:w-[15rem] md:h-[15rem] md:left-[-9.2rem]" />
              </div>
                
              <h2 className={`text-3xl text-center font-bold text-white md:px-4 md:text-5xl md:font-extrabold md:leading-[1.2] ${
                introComplete ? "pt-10 pb-8 md:pb-10" : ""
              }`}>
                  {stepData.question}
                </h2>
                <div 
                  className="transition-all duration-300 ease-in-out" 
                  style={{
                    opacity: isTransitioning ? 0 : 1,
                    transform: isTransitioning ? 'translateY(10px)' : 'translateY(0)'
                  }}>
                     {stepData.answer.length > 0 ? (
                  <div className="space-y-4 md:space-y-7">
                    {stepData.answer.map((answer) => (
                      <button 
                        key={answer.id}
                        onClick={() => handleAnswerSelect(answer.id)}
                        className="block w-full text-left bg-gray-100 rounded-xl transition-all 300ms ease-in-out hover:rounded-tr-4xl py-3 hover:bg-sky-200 font-bold px-6 cursor-pointer md:text-3xl md:py-7 md:px-8 md:rounded-3xl md:rounded-tr-[3rem]">
                          {answer.text}
                        </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center mt-16 md:mt-32">
                    <button
                      onClick={handleOkayClick}
                      className="bg-white py-3 px-[6rem] mb-6 rounded-xl rounded-tr-4xl font-semibold text-2xl cursor-pointer hover:bg-gray-100 md:px-[10rem] md:py-5 md:text-4xl">
                        Okay
                      </button>
                  </div>
                )}
                  </div>
               

                {introComplete && (
                  <div className="progress-bar fixed bottom-25 w-5/6 flex justify-center md:bottom-30"> 
                    <div className="flex space-x-3 md:space-x-4">
                      {actualSteps.map((_, i) => (
                        <div
                          key={i}
                          className= {`h-2 w-8 rounded-xl md:h-3 md:w-10 md:rounded-xl ${
                            i <= currentProgress ? "bg-orange-600" : "bg-gray-300"
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                )}
  

                {introComplete && (
                  <div className="nav-buttons fixed bottom-0 right-0 flex justify-between w-full">
                    <button
                      onClick={handleBack}
                      disabled={currentStep === 1}
                      className="nav-button text-sky-950 font-bold bg-white px-8 py-3 rounded-tr-3xl cursor-pointer hover:bg-sky-200 md:px-14 md:py-7 md:text-3xl md:rounded-tr-4xl transition-all 300ms ease-in-out">
                        BACK
                    </button>

                    {currentStep === totalSteps - 1 ? (
                      <button
                        onClick={handleFinish}
                        className="nav-button text-sky-950 font-bold bg-white px-8 py-3 rounded-tl-3xl cursor-pointer hover:bg-sky-200 md:px-14 md:py-7 md:text-3xl md:rounded-tl-4xl transition-all 300ms ease-in-out">
                        FINISH
                    </button>
                    ) : (
                      <button
                        onClick={handleNext}
                        className="nav-button text-sky-950 font-bold bg-white px-8 py-3 rounded-tl-3xl cursor-pointer hover:bg-sky-200 md:px-14 md:py-7 md:text-3xl md:rounded-tl-4xl transition-all 300ms ease-in-out">
                          NEXT
                    </button>
                    )}
                    
                  </div>
                )}
                
            </div>
        </div>

    </div>
  )
}

export default OnboardingWizard