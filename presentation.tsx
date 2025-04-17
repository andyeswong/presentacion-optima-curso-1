"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Importamos los datos de las diapositivas
import slidesData from "./slides-data"

// Componente Modal para el iframe
function Modal({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-slate-900 rounded-xl border border-purple-500/30 w-full max-w-5xl h-[750px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 flex justify-between items-center border-b border-purple-500/20">
          <h2 className="text-xl font-semibold text-white">Laboratorio: System Prompt</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="p-4 h-[680px]">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Componente de reloj para mostrar la hora en PST
function Clock() {
  const [time, setTime] = useState<string>("")

  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      // Convertir a PST (UTC-8 o UTC-7 dependiendo del horario de verano)
      const pstOptions: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Los_Angeles',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }
      const pstTime = new Intl.DateTimeFormat('en-US', pstOptions).format(now)
      setTime(pstTime)
    }

    // Actualizar inmediatamente y luego cada segundo
    updateClock()
    const timerId = setInterval(updateClock, 1000)

    return () => clearInterval(timerId)
  }, [])

  return (
    <div className="absolute bottom-4 right-4 z-50 text-white/80 text-sm font-mono bg-black/30 backdrop-blur-sm rounded-md px-2 py-1 border border-white/10">
      {time} PST
    </div>
  )
}

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = slidesData.slides.length

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }

  // Añadir controlador de eventos de teclado
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        prevSlide();
      } else if (event.key === "ArrowRight") {
        nextSlide();
      }
    };

    // Añadir el event listener cuando el componente se monta
    window.addEventListener('keydown', handleKeyDown);

    // Eliminar el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);  // El array vacío de dependencias asegura que este efecto se ejecute solo una vez

  const getBackgroundClass = (slideIndex) => {
    const backgrounds = [
      "bg-gradient-to-br from-slate-900 to-blue-900", // Slide 1
      "bg-gradient-to-br from-blue-900 to-indigo-900", // Slide 2
      "bg-gradient-to-br from-indigo-900 to-slate-900", // Slide 3
      "bg-gradient-to-br from-purple-900 to-violet-900", // Slide 4 - System Prompt
      "bg-gradient-to-br from-slate-800 to-blue-800", // Slide 5
      "bg-gradient-to-br from-blue-800 to-indigo-800", // Slide 6
      "bg-gradient-to-br from-indigo-800 to-blue-900", // Slide 7
      "bg-gradient-to-br from-purple-900 to-indigo-900", // Slide 8 - SMA
      "bg-gradient-to-br from-indigo-900 to-purple-800", // Slide 9 - Dify
      "bg-gradient-to-br from-slate-900 to-green-900", // Slide 10
      "bg-gradient-to-br from-gray-900 to-slate-800", // Slide 11
      "bg-gradient-to-br from-blue-900 to-indigo-800", // Slide 12 - Example 1
      "bg-gradient-to-br from-indigo-900 to-slate-900", // Slide 13 - Example 2
      "bg-gradient-to-br from-slate-900 to-green-900", // Slide 14 - Example 3
      "bg-gradient-to-br from-purple-900 to-blue-900", // Slide 15 - Conclusion
    ]

    return backgrounds[slideIndex % backgrounds.length]
  }

  const getDecorationClass = (slideIndex, type) => {
    const decorations = {
      primary: [
        "bg-indigo-500/10", // Slide 1
        "bg-blue-500/10", // Slide 2
        "bg-blue-600/10", // Slide 3
        "bg-purple-500/10", // Slide 4 - System Prompt
        "bg-indigo-600/10", // Slide 5
        "bg-blue-500/10", // Slide 6
        "bg-blue-400/10", // Slide 7
        "bg-purple-500/10", // Slide 8 - SMA
        "bg-purple-600/10", // Slide 9 - Dify
        "bg-green-500/10", // Slide 10
        "bg-gray-500/10", // Slide 11
        "bg-blue-500/10", // Slide 12 - Example 1
        "bg-indigo-500/10", // Slide 13 - Example 2
        "bg-green-600/10", // Slide 14 - Example 3
        "bg-purple-500/10", // Slide 15 - Conclusion
      ],
      secondary: [
        "bg-blue-500/10", // Slide 1
        "bg-indigo-600/10", // Slide 2
        "bg-indigo-500/10", // Slide 3
        "bg-violet-500/10", // Slide 4 - System Prompt
        "bg-blue-500/10", // Slide 5
        "bg-indigo-500/10", // Slide 6
        "bg-indigo-400/10", // Slide 7
        "bg-indigo-500/10", // Slide 8 - SMA
        "bg-blue-500/10", // Slide 9 - Dify
        "bg-blue-500/10", // Slide 10
        "bg-slate-500/10", // Slide 11
        "bg-indigo-600/10", // Slide 12 - Example 1
        "bg-blue-600/10", // Slide 13 - Example 2
        "bg-blue-500/10", // Slide 14 - Example 3
        "bg-blue-500/10", // Slide 15 - Conclusion
      ],
    }

    return decorations[type][slideIndex % decorations[type].length]
  }

  const getDotColor = (slideIndex) => {
    const dotColors = [
      "rgba(99, 102, 241, 0.3)", // Slide 1 - indigo
      "rgba(59, 130, 246, 0.3)", // Slide 2 - blue
      "rgba(79, 70, 229, 0.3)", // Slide 3 - indigo
      "rgba(139, 92, 246, 0.3)", // Slide 4 - violet (System Prompt)
      "rgba(99, 102, 241, 0.3)", // Slide 5 - indigo
      "rgba(59, 130, 246, 0.3)", // Slide 6 - blue
      "rgba(96, 165, 250, 0.3)", // Slide 7 - blue
      "rgba(168, 85, 247, 0.3)", // Slide 8 - purple (SMA)
      "rgba(139, 92, 246, 0.3)", // Slide 9 - purple (Dify)
      "rgba(34, 197, 94, 0.3)", // Slide 10 - green
      "rgba(107, 114, 128, 0.3)", // Slide 11 - gray
      "rgba(59, 130, 246, 0.3)", // Slide 12 - blue (Example 1)
      "rgba(79, 70, 229, 0.3)", // Slide 13 - indigo (Example 2)
      "rgba(34, 197, 94, 0.3)", // Slide 14 - green (Example 3)
      "rgba(168, 85, 247, 0.3)", // Slide 15 - purple (Conclusion)
    ]

    return dotColors[slideIndex % dotColors.length]
  }

  return (
    <div
      className={`relative min-h-screen w-full text-white overflow-auto transition-colors duration-700 ease-in-out ${getBackgroundClass(
        currentSlide,
      )}`}
    >
      {/* Elementos decorativos de fondo */}
      <div
        className={`absolute top-[10%] right-[15%] w-[40%] h-[40%] rounded-full blur-3xl transition-colors duration-700 ease-in-out ${getDecorationClass(
          currentSlide,
          "primary",
        )}`}
      />
      <div
        className={`absolute bottom-[15%] left-[10%] w-[30%] h-[30%] rounded-full blur-3xl transition-colors duration-700 ease-in-out ${getDecorationClass(
          currentSlide,
          "secondary",
        )}`}
      />

      {/* Patrón de puntos */}
      <div
        className="absolute inset-0 opacity-20 transition-opacity duration-700 ease-in-out"
        style={{
          backgroundImage: `radial-gradient(${getDotColor(currentSlide)} 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* Controles de navegación */}
      <div className="absolute top-1/2 left-4 z-50 transform -translate-y-1/2">
        <button
          onClick={prevSlide}
          className="bg-black/20 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white rounded-full h-10 w-10 flex items-center justify-center transition-all duration-300"
          aria-label="Diapositiva anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>

      <div className="absolute top-1/2 right-4 z-50 transform -translate-y-1/2">
        <button
          onClick={nextSlide}
          className="bg-black/20 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white rounded-full h-10 w-10 flex items-center justify-center transition-all duration-300"
          aria-label="Diapositiva siguiente"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Indicador de diapositivas */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-50">
        {slidesData.slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-blue-400 w-4" : "bg-white/40"
            }`}
            aria-label={`Ir a diapositiva ${index + 1}`}
          />
        ))}
      </div>

      {/* Reloj en PST */}
      <Clock />

      {/* Contenedor de diapositivas */}
      <div className="relative min-h-screen w-screen flex items-center justify-center">
        <AnimatePresence mode="wait">
          {slidesData.slides.map((slide, index) => {
            if (index === currentSlide) {
              return <SlideRenderer key={slide.slide_number} slide={slide} />
            }
            return null
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}

function SlideRenderer({ slide }) {
  // Seleccionar el componente de diapositiva basado en el diseño
  switch (slide.design) {
    case "introductory-slide":
      return <IntroductorySlide slide={slide} />
    case "app-introduction":
      return <AppIntroductionSlide slide={slide} />
    case "basic-concepts":
      return <BasicConceptsSlide slide={slide} />
    case "structured-explanation":
      return <StructuredExplanationSlide slide={slide} />
    case "modern-bold":
      return <ModernBoldSlide slide={slide} />
    case "clean-informative":
      return <CleanInformativeSlide slide={slide} />
    case "multi-agent-system":
      return <MultiAgentSystemSlide slide={slide} />
    case "innovative-interface":
      return <InnovativeInterfaceSlide slide={slide} />
    case "collaborative-solutions":
      return <CollaborativeSolutionsSlide slide={slide} />
    case "technical-integration":
      return <TechnicalIntegrationSlide slide={slide} />
    case "example-case":
      return <ExampleCaseSlide slide={slide} />
    case "futuristic-vision":
      return <FuturisticVisionSlide slide={slide} />
    default:
      return <DefaultSlide slide={slide} />
  }
}

// Componentes de diapositivas con diferentes estilos
function IntroductorySlide({ slide }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl p-8 md:p-16"
    >
      <div className="relative">
        {/* Círculo decorativo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7, type: "spring" }}
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"
        />

        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-300 mb-4">
            {slide.title}
          </h1>
          <h2 className="text-xl md:text-2xl text-blue-300 mb-4">{slide.subtitle}</h2>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-white/70 mt-8"
          >
            Presentado por Andres Gonzalez Wong por parte de Enteracloud
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8 shadow-lg"
        >
          {slide.content.map((item, index) => (
            <motion.p
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.2, duration: 0.5 }}
              className="text-lg text-white/80 mb-4"
            >
              {item.value}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

function AppIntroductionSlide({ slide }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl p-8 md:p-16"
    >
      <div className="flex flex-col md:flex-row gap-8">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="md:w-1/2"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{slide.title}</h1>
          <h2 className="text-xl text-blue-300 mb-8">{slide.subtitle}</h2>

          {slide.content.map((item, index) => {
            if (item.type === "image") {
              return (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="flex justify-center mb-8"
                >
                  <img src={item.url || "/placeholder.svg"} alt={item.alt_text} className="h-24 object-contain" />
                </motion.div>
              )
            }
            if (item.type === "text") {
              return (
                <motion.p
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.2, duration: 0.5 }}
                  className="text-white/80 mb-4"
                  dangerouslySetInnerHTML={{
                    __html: item.value
                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                      .replace(/\*(.*?)\*/g, "<em>$1</em>"),
                  }}
                />
              )
            }
            if (item.type === "link") {
              return (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="mt-6"
                >
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600/80 hover:bg-blue-500/80 text-white rounded-full px-6 py-2 transition-all duration-300"
                  >
                    {item.text}
                  </a>
                </motion.div>
              )
            }
            return null
          })}
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="md:w-1/2 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-xl" />
          <div className="relative bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8 h-full">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col h-full justify-center"
            >
              <div className="text-center mb-6">
                <span className="text-5xl">🚀</span>
              </div>
              <h3 className="text-2xl font-medium text-white text-center mb-4">Gestión Inteligente de Tareas</h3>
              <p className="text-white/70 text-center">
                Kanny utiliza IA avanzada para optimizar tu flujo de trabajo en tableros Kanban, permitiéndote enfocarte
                en lo que realmente importa.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

function BasicConceptsSlide({ slide }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl p-8 md:p-16"
    >
      <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{slide.title}</h1>
        <h2 className="text-xl text-blue-300 mb-12">{slide.subtitle}</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {slide.content.map((item, index) => {
          if (item.type === "heading") {
            return (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.2, duration: 0.7 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6 transition-all duration-300 hover:bg-white/20"
              >
                <h3 className="text-xl font-medium text-white mb-4">{item.value}</h3>
                {index + 1 < slide.content.length && slide.content[index + 1].type === "text" && (
                  <p
                    className="text-white/70"
                    dangerouslySetInnerHTML={{
                      __html: slide.content[index + 1].value.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                    }}
                  />
                )}
              </motion.div>
            )
          }
          return null
        })}
      </div>
    </motion.div>
  )
}

function StructuredExplanationSlide({ slide }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isSystemPromptSlide = slide.slide_number === 4;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl p-8 md:p-16"
    >
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{slide.title}</h1>
        <h2 className="text-xl text-blue-300">{slide.subtitle}</h2>
        
        {isSystemPromptSlide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-6"
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-purple-600 hover:bg-purple-500 text-white font-medium px-6 py-2 rounded-full transition-colors shadow-lg flex items-center justify-center space-x-2"
            >
              <span>🧪</span>
              <span>Laboratorio: SystemPrompt</span>
            </button>
          </motion.div>
        )}
      </motion.div>

      <div className="space-y-6">
        {slide.content.map((item, index) => {
          if (item.type === "heading") {
            const contentIndex = index + 1
            return (
              <motion.div
                key={index}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.15, duration: 0.7 }}
                className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 backdrop-blur-sm rounded-xl border border-white/10 p-6 flex gap-4"
              >
                <div className="flex-shrink-0 bg-blue-500/20 rounded-full h-10 w-10 flex items-center justify-center text-blue-300 font-bold">
                  {Math.floor(index / 2) + 1}
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">{item.value}</h3>
                  {contentIndex < slide.content.length && slide.content[contentIndex].type === "text" && (
                    <p
                      className="text-white/70"
                      dangerouslySetInnerHTML={{
                        __html: slide.content[contentIndex].value.replace(
                          /\*\*(.*?)\*\*/g,
                          '<strong class="text-blue-300">$1</strong>',
                        ),
                      }}
                    />
                  )}
                </div>
              </motion.div>
            )
          }
          return null
        })}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className="w-full h-full">
              <iframe
                src="https://dify.andres-wong.com/chatbot/ZM9Cfgj2LLfuIi6Q"
                style={{ width: '100%', height: '100%'}}
                frameBorder="0"
                allow="microphone"
              ></iframe>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function ModernBoldSlide({ slide }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl p-8 md:p-16"
    >
      <div className="relative">
        {/* Línea decorativa */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-blue-500/0 via-blue-500/20 to-blue-500/0" />

        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 mb-4">
            {slide.title}
          </h1>
          <h2 className="text-xl text-blue-300">{slide.subtitle}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {slide.content.map((item, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.2, duration: 0.7 }}
              className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8 shadow-lg"
            >
              <p
                className="text-lg text-white/80"
                dangerouslySetInnerHTML={{
                  __html: item.value.replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-300">$1</strong>'),
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function CleanInformativeSlide({ slide }) {
  const [isRAGDocsModalOpen, setIsRAGDocsModalOpen] = useState(false);
  const [isRAGInternetModalOpen, setIsRAGInternetModalOpen] = useState(false);
  const isRAGSlide = slide.slide_number === 7;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl p-8 md:p-16"
    >
      <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{slide.title}</h1>
        <h2 className="text-xl text-blue-300 mb-6">{slide.subtitle}</h2>
        
        {isRAGSlide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-wrap gap-4 justify-center mb-8"
          >
            <button
              onClick={() => setIsRAGDocsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-2 rounded-full transition-colors shadow-lg flex items-center justify-center space-x-2"
            >
              <span>📄</span>
              <span>Laboratorio: RAG - Documentos</span>
            </button>
            <button
              onClick={() => setIsRAGInternetModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-2 rounded-full transition-colors shadow-lg flex items-center justify-center space-x-2"
            >
              <span>🌐</span>
              <span>Laboratorio: RAG - Internet</span>
            </button>
          </motion.div>
        )}
      </motion.div>

      <div className="flex flex-col px-auto gap-8">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-8"
        >
          {slide.content.map((item, index) => {
            if (item.type === "heading") {
              return (
                <h3 key={index} className="text-2xl font-medium text-white mb-4">
                  {item.value}
                </h3>
              )
            }
            if (item.type === "text") {
              return (
                <p
                  key={index}
                  className="text-white/70 mb-6"
                  dangerouslySetInnerHTML={{
                    __html: item.value.replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-300">$1</strong>'),
                  }}
                />
              )
            }
            if (item.type === "diagram" && item.value === "rag-diagram") {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                  className="mt-4 mb-6"
                >
                  <RAGDiagram />
                </motion.div>
              )
            }
            return null
          })}
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className=" bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8"
        >
          {slide.content.map((item, index) => {
            if (item.type === "list") {
              return (
                <ul key={index} className="space-y-4">
                  {item.items.map((listItem, listIndex) => (
                    <motion.li
                      key={listIndex}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7 + listIndex * 0.1, duration: 0.5 }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-blue-400 mt-1">•</span>
                      <span
                        className="text-white/80"
                        dangerouslySetInnerHTML={{
                          __html: listItem.replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-300">$1</strong>'),
                        }}
                      />
                    </motion.li>
                  ))}
                </ul>
              )
            }
            return null
          })}
        </motion.div>
      </div>
      
      {/* Modal para RAG - Documentos */}
      <AnimatePresence>
        {isRAGDocsModalOpen && (
          <Modal isOpen={isRAGDocsModalOpen} onClose={() => setIsRAGDocsModalOpen(false)}>
            <div className="w-full h-full">
              <iframe
                src="https://dify.andres-wong.com/chatbot/GznXdVlxJoazwioC"
                style={{ width: '100%', height: '100%' }}
                frameBorder="0"
                allow="microphone"
              ></iframe>
            </div>
          </Modal>
        )}
      </AnimatePresence>
      
      {/* Modal para RAG - Internet */}
      <AnimatePresence>
        {isRAGInternetModalOpen && (
          <Modal isOpen={isRAGInternetModalOpen} onClose={() => setIsRAGInternetModalOpen(false)}>
            <div className="w-full h-full">
              <iframe
                src="https://dify.andres-wong.com/chatbot/NYC8PDsL2o463U9j"
                style={{ width: '100%', height: '100%' }}
                frameBorder="0"
                allow="microphone"
              ></iframe>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function MultiAgentSystemSlide({ slide }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl p-8 md:p-16"
    >
      <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{slide.title}</h1>
        <h2 className="text-xl text-purple-300 mb-12">{slide.subtitle}</h2>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="md:w-1/2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-8"
        >
          {slide.content.map((item, index) => {
            if (item.type === "heading") {
              return (
                <h3 key={index} className="text-2xl font-medium text-white mb-4">
                  {item.value}
                </h3>
              )
            }
            if (item.type === "text") {
              return (
                <p
                  key={index}
                  className="text-white/70 mb-6"
                  dangerouslySetInnerHTML={{
                    __html: item.value.replace(/\*\*(.*?)\*\*/g, '<strong class="text-purple-300">$1</strong>'),
                  }}
                />
              )
            }
            if (item.type === "diagram" && item.value === "sma-diagram") {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                  className="mt-4 mb-6"
                >
                  <SMADiagram />
                </motion.div>
              )
            }
            return null
          })}
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="md:w-1/2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8"
        >
          {slide.content.map((item, index) => {
            if (item.type === "list") {
              return (
                <ul key={index} className="space-y-4">
                  {item.items.map((listItem, listIndex) => (
                    <motion.li
                      key={listIndex}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7 + listIndex * 0.1, duration: 0.5 }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-purple-400 mt-1">•</span>
                      <span
                        className="text-white/80"
                        dangerouslySetInnerHTML={{
                          __html: listItem.replace(/\*\*(.*?)\*\*/g, '<strong class="text-purple-300">$1</strong>'),
                        }}
                      />
                    </motion.li>
                  ))}
                </ul>
              )
            }
            return null
          })}
        </motion.div>
      </div>
    </motion.div>
  )
}

function InnovativeInterfaceSlide({ slide }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl p-8 md:p-16"
    >
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{slide.title}</h1>
        <h2 className="text-xl text-indigo-300">{slide.subtitle}</h2>
      </motion.div>

      <div className="relative">
        {/* Círculo decorativo */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl -z-10" />

        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8 shadow-lg">
          {slide.content.map((item, index) => {
            if (item.type === "heading") {
              return (
                <motion.h3
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-2xl font-medium text-indigo-300 mb-4"
                >
                  {item.value}
                </motion.h3>
              )
            }
            if (item.type === "text") {
              return (
                <motion.p
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-white/80 mb-6"
                  dangerouslySetInnerHTML={{
                    __html: item.value.replace(/\*\*(.*?)\*\*/g, '<strong class="text-indigo-300">$1</strong>'),
                  }}
                />
              )
            }
            if (item.type === "list") {
              return (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {item.items.map((listItem, listIndex) => (
                      <motion.div
                        key={listIndex}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.9 + listIndex * 0.1, duration: 0.5 }}
                        className="bg-indigo-900/30 backdrop-blur-sm rounded-xl p-4 border border-indigo-500/20"
                      >
                        <p
                          className="text-white/80"
                          dangerouslySetInnerHTML={{
                            __html: listItem.replace(/\*\*(.*?)\*\*/g, '<strong class="text-indigo-300">$1</strong>'),
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )
            }
            return null
          })}
        </div>
      </div>
    </motion.div>
  )
}

function CollaborativeSolutionsSlide({ slide }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl p-8 md:p-16"
    >
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{slide.title}</h1>
        <h2 className="text-xl text-green-300">{slide.subtitle}</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {slide.content.map((item, index) => {
          if (item.type === "heading") {
            const contentIndex = index + 1
            const icon = index === 0 ? "🤖" : "🤝"

            return (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.2, duration: 0.7 }}
                className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-xl border border-white/10 p-8 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{icon}</div>
                  <h3 className="text-xl font-medium text-white">{item.value}</h3>
                </div>

                {contentIndex < slide.content.length && slide.content[contentIndex].type === "text" && (
                  <p
                    className="text-white/70"
                    dangerouslySetInnerHTML={{
                      __html: slide.content[contentIndex].value.replace(
                        /\*\*(.*?)\*\*/g,
                        '<strong class="text-green-300">$1</strong>',
                      ),
                    }}
                  />
                )}
              </motion.div>
            )
          }
          return null
        })}
      </div>
    </motion.div>
  )
}

function TechnicalIntegrationSlide({ slide }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl p-8 md:p-16"
    >
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{slide.title}</h1>
        <h2 className="text-xl text-gray-300">{slide.subtitle}</h2>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8">
        {slide.content.map((item, index) => {
          if (item.type === "heading") {
            const contentIndex = index + 1

            return (
              <motion.div
                key={index}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.2, duration: 0.7 }}
                className="md:w-1/2 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gray-700/50 rounded-full p-2">
                    <span className="text-xl">⚙️</span>
                  </div>
                  <h3 className="text-xl font-medium text-white">{item.value}</h3>
                </div>

                {contentIndex < slide.content.length && slide.content[contentIndex].type === "text" && (
                  <p
                    className="text-white/70"
                    dangerouslySetInnerHTML={{
                      __html: slide.content[contentIndex].value.replace(
                        /\*\*(.*?)\*\*/g,
                        '<strong class="text-gray-300">$1</strong>',
                      ),
                    }}
                  />
                )}
              </motion.div>
            )
          }
          return null
        })}
      </div>
    </motion.div>
  )
}

function ExampleCaseSlide({ slide }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl p-8 md:p-16"
    >
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{slide.title}</h1>
        <h2 className="text-xl text-blue-300">{slide.subtitle}</h2>
      </motion.div>

      <div className="flex flex-col gap-8">
        {slide.content.map((item, index) => {
          if (item.type === "heading") {
            return (
              <motion.h3
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-2xl font-medium text-blue-300"
              >
                {item.value}
              </motion.h3>
            )
          }
          if (item.type === "text") {
            return (
              <motion.p
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-white/80 mb-2"
                dangerouslySetInnerHTML={{
                  __html: item.value.replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-300">$1</strong>'),
                }}
              />
            )
          }
          if (item.type === "diagram") {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="my-6"
              >
                {item.value === "example1-diagram" && <Example1Diagram />}
                {item.value === "example2-diagram" && <Example2Diagram />}
                {item.value === "example3-diagram" && <Example3Diagram />}
              </motion.div>
            )
          }
          if (item.type === "list") {
            return (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 shadow-lg"
              >
                <ul className="space-y-4">
                  {item.items.map((listItem, listIndex) => (
                    <motion.li
                      key={listIndex}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.9 + listIndex * 0.1, duration: 0.5 }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-blue-400 mt-1">•</span>
                      <span
                        className="text-white/80"
                        dangerouslySetInnerHTML={{
                          __html: listItem.replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-300">$1</strong>'),
                        }}
                      />
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )
          }
          return null
        })}
      </div>
    </motion.div>
  )
}

function FuturisticVisionSlide({ slide }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl p-8 md:p-16"
    >
      {/* Elementos decorativos */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl -z-10" />

      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
          {slide.title}
        </h1>
        <h2 className="text-xl text-purple-300">{slide.subtitle}</h2>
      </motion.div>

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-xl -z-10" />
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8 shadow-lg"
        >
          {slide.content.map((item, index) => (
            <motion.p
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
              className="text-lg text-white/80 mb-6"
              dangerouslySetInnerHTML={{
                __html: item.value.replace(/\*\*(.*?)\*\*/g, '<strong class="text-purple-300">$1</strong>'),
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

function DefaultSlide({ slide }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl p-8 md:p-16"
    >
      <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{slide.title}</h1>
      <h2 className="text-xl text-blue-300 mb-8">{slide.subtitle}</h2>

      <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-8">
        {slide.content.map((item, index) => {
          if (item.type === "text") {
            return (
              <p
                key={index}
                className="text-white/80 mb-4"
                dangerouslySetInnerHTML={{
                  __html: item.value.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                }}
              />
            )
          }
          return null
        })}
      </div>
    </motion.div>
  )
}

// Componentes de diagramas
function RAGDiagram() {
  return (
    <div className="relative p-4 ">
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-3 gap-4 w-full mb-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-blue-900/60 rounded-full flex items-center justify-center mb-2 border border-blue-500/30">
              <span className="text-2xl">📄</span>
            </div>
            <p className="text-center text-sm text-white/70">Documentos</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-blue-900/60 rounded-full flex items-center justify-center mb-2 border border-blue-500/30">
              <span className="text-2xl">🌐</span>
            </div>
            <p className="text-center text-sm text-white/70">Web</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-blue-900/60 rounded-full flex items-center justify-center mb-2 border border-blue-500/30">
              <span className="text-2xl">💾</span>
            </div>
            <p className="text-center text-sm text-white/70">Base de Datos</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 5L12 19"
              stroke="rgba(147, 197, 253, 0.5)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 12L12 19L5 12"
              stroke="rgba(147, 197, 253, 0.5)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-blue-900/40 p-4 rounded-xl border border-blue-500/30 w-full max-w-md my-4"
        >
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-blue-800/60 rounded-full flex items-center justify-center mr-3 border border-blue-500/30">
              <span className="text-lg">🔍</span>
            </div>
            <h4 className="text-blue-300 font-medium">Retrieval (Recuperación)</h4>
          </div>
          <p className="text-sm text-white/70 ml-12">Búsqueda de información relevante basada en la consulta</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 5L12 19"
              stroke="rgba(147, 197, 253, 0.5)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 12L12 19L5 12"
              stroke="rgba(147, 197, 253, 0.5)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-blue-900/40 p-4 rounded-xl border border-blue-500/30 w-full max-w-md my-4"
        >
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-blue-800/60 rounded-full flex items-center justify-center mr-3 border border-blue-500/30">
              <span className="text-lg">🧠</span>
            </div>
            <h4 className="text-blue-300 font-medium">LLM</h4>
          </div>
          <p className="text-sm text-white/70 ml-12">
            Genera respuesta combinando la consulta con el contexto recuperado
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 5L12 19"
              stroke="rgba(147, 197, 253, 0.5)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 12L12 19L5 12"
              stroke="rgba(147, 197, 253, 0.5)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="bg-blue-900/40 p-4 rounded-xl border border-blue-500/30 w-full max-w-md mt-4"
        >
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-800/60 rounded-full flex items-center justify-center mr-3 border border-blue-500/30">
              <span className="text-lg">💬</span>
            </div>
            <h4 className="text-blue-300 font-medium">Respuesta Contextualizada</h4>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function SMADiagram() {
  return (
    <div className="relative p-4 bg-slate-800/50 rounded-xl border border-purple-500/20">
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-purple-900/40 p-4 rounded-xl border border-purple-500/30 w-full max-w-md mb-4"
        >
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-purple-800/60 rounded-full flex items-center justify-center mr-3 border border-purple-500/30">
              <span className="text-lg">👤</span>
            </div>
            <h4 className="text-purple-300 font-medium">Usuario</h4>
          </div>
          <p className="text-sm text-white/70 ml-12">Solicita información del CRM</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 5L12 19"
              stroke="rgba(167, 139, 250, 0.5)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 12L12 19L5 12"
              stroke="rgba(167, 139, 250, 0.5)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-purple-900/40 p-4 rounded-xl border border-purple-500/30 w-full max-w-md my-4"
        >
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-purple-800/60 rounded-full flex items-center justify-center mr-3 border border-purple-500/30">
              <span className="text-lg">🧠</span>
            </div>
            <h4 className="text-purple-300 font-medium">Agente Coordinador</h4>
          </div>
          <p className="text-sm text-white/70 ml-12">Analiza la solicitud y coordina a los agentes especializados</p>
        </motion.div>

        <div className="grid grid-cols-3 gap-4 w-full my-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-purple-900/30 p-3 rounded-xl border border-purple-500/20"
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-800/60 rounded-full flex items-center justify-center mb-2 border border-purple-500/30">
                <span className="text-lg">🔌</span>
              </div>
              <h5 className="text-purple-300 text-sm font-medium text-center">Agente de Conexión CRM</h5>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-purple-900/30 p-3 rounded-xl border border-purple-500/20"
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-800/60 rounded-full flex items-center justify-center mb-2 border border-purple-500/30">
                <span className="text-lg">📊</span>
              </div>
              <h5 className="text-purple-300 text-sm font-medium text-center">Agente de Procesamiento</h5>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="bg-purple-900/30 p-3 rounded-xl border border-purple-500/20"
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-800/60 rounded-full flex items-center justify-center mb-2 border border-purple-500/30">
                <span className="text-lg">📝</span>
              </div>
              <h5 className="text-purple-300 text-sm font-medium text-center">Agente de Formateo</h5>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 5L12 19"
              stroke="rgba(167, 139, 250, 0.5)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 12L12 19L5 12"
              stroke="rgba(167, 139, 250, 0.5)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="bg-purple-900/40 p-4 rounded-xl border border-purple-500/30 w-full max-w-md mt-4"
        >
          <div className="flex items-center">
            <div className="w-10 h-10 bg-purple-800/60 rounded-full flex items-center justify-center mr-3 border border-purple-500/30">
              <span className="text-lg">📱</span>
            </div>
            <h4 className="text-purple-300 font-medium">Respuesta Formateada al Usuario</h4>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function Example1Diagram() {
  return (
    <div className="relative p-4 bg-slate-800/50 rounded-xl border border-blue-500/20">
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-blue-900/40 p-4 rounded-xl border border-blue-500/30 w-full max-w-md mb-4"
        >
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-blue-800/60 rounded-full flex items-center justify-center mr-3 border border-blue-500/30">
              <span className="text-lg">👤</span>
            </div>
            <h4 className="text-blue-300 font-medium">Representante de Ventas</h4>
          </div>
          <p className="text-sm text-white/70 ml-12">Consulta información durante llamada con cliente</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 5L12 19"
              stroke="rgba(147, 197, 253, 0.5)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 12L12 19L5 12"
              stroke="rgba(147, 197, 253, 0.5)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 w-full my-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-blue-900/30 p-3 rounded-xl border border-blue-500/20"
          >
            <div className="flex flex-col">
              <h5 className="text-blue-300 text-sm font-medium mb-2">System Prompt</h5>
              <p className="text-xs text-white/70">Define rol como asistente de ventas experto</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-blue-900/30 p-3 rounded-xl border border-blue-500/20"
          >
            <div className="flex flex-col">
              <h5 className="text-blue-300 text-sm font-medium mb-2">RAG</h5>
              <p className="text-xs text-white/70">Recupera datos de productos y clientes</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-blue-900/40 p-4 rounded-xl border border-blue-500/30 w-full max-w-md my-4"
        >
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-blue-800/60 rounded-full flex items-center justify-center mr-3 border border-blue-500/30">
              <span className="text-lg">🤖</span>
            </div>
            <h4 className="text-blue-300 font-medium">Sistema Multi-Agente (SMA)</h4>
          </div>
          <div className="grid grid-cols-3 gap-2 ml-12">
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-800/40 rounded-full flex items-center justify-center mx-auto mb-1">
                <span className="text-xs">😊</span>
              </div>
              <p className="text-xs text-white/70">Análisis de Sentimiento</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-800/40 rounded-full flex items-center justify-center mx-auto mb-1">
                <span className="text-xs">🔍</span>
              </div>
              <p className="text-xs text-white/70">Búsqueda</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-800/40 rounded-full flex items-center justify-center mx-auto mb-1">
                <span className="text-xs">💡</span>
              </div>
              <p className="text-xs text-white/70">Recomendaciones</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="bg-blue-900/40 p-4 rounded-xl border border-blue-500/30 w-full max-w-md my-4"
        >
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-blue-800/60 rounded-full flex items-center justify-center mr-3 border border-blue-500/30">
              <span className="text-lg">⚙️</span>
            </div>
            <h4 className="text-blue-300 font-medium">Function Calling</h4>
          </div>
          <div className="grid grid-cols-3 gap-2 ml-12">
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-800/40 rounded-full flex items-center justify-center mx-auto mb-1">
                <span className="text-xs">📝</span>
              </div>
              <p className="text-xs text-white/70">Actualizar CRM</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-800/40 rounded-full flex items-center justify-center mx-auto mb-1">
                <span className="text-xs">📅</span>
              </div>
              <p className="text-xs text-white/70">Programar</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-800/40 rounded-full flex items-center justify-center mx-auto mb-1">
                <span className="text-xs">📊</span>
              </div>
              <p className="text-xs text-white/70">Cotizaciones</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 5L12 19"
              stroke="rgba(147, 197, 253, 0.5)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 12L12 19L5 12"
              stroke="rgba(147, 197, 253, 0.5)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="bg-blue-900/40 p-4 rounded-xl border border-blue-500/30 w-full max-w-md mt-4"
        >
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-800/60 rounded-full flex items-center justify-center mr-3 border border-blue-500/30">
              <span className="text-lg">💬</span>
            </div>
            <h4 className="text-blue-300 font-medium">Respuesta Personalizada al Representante</h4>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function Example2Diagram() {
  return (
    <div className="relative p-4 bg-slate-800/50 rounded-xl border border-indigo-500/20">
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-indigo-900/40 p-4 rounded-xl border border-indigo-500/30 w-full max-w-md mb-4"
        >
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-indigo-800/60 rounded-full flex items-center justify-center mr-3 border border-indigo-500/30">
              <span className="text-lg">📄</span>
            </div>
            <h4 className="text-indigo-300 font-medium">Documento Legal</h4>
          </div>
          <p className="text-sm text-white/70 ml-12">Contrato o documento legal para análisis</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 5L12 19"
              stroke="rgba(165, 180, 252, 0.5)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 12L12 19L5 12"
              stroke="rgba(165, 180, 252, 0.5)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 w-full my-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-indigo-900/30 p-3 rounded-xl border border-indigo-500/20"
          >
            <div className="flex flex-col">
              <h5 className="text-indigo-300 text-sm font-medium mb-2">System Prompt</h5>
              <p className="text-xs text-white/70">Instrucciones para actuar como asistente legal experto</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-indigo-900/30 p-3 rounded-xl border border-indigo-500/20"
          >
            <div className="flex flex-col">
              <h5 className="text-indigo-300 text-sm font-medium mb-2">RAG</h5>
              <p className="text-xs text-white/70">Consulta bases de datos legales y precedentes</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-indigo-900/40 p-4 rounded-xl border border-indigo-500/30 w-full max-w-md my-4"
        >
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-indigo-800/60 rounded-full flex items-center justify-center mr-3 border border-indigo-500/30">
              <span className="text-lg">🤖</span>
            </div>
            <h4 className="text-indigo-300 font-medium">Sistema Multi-Agente (SMA)</h4>
          </div>
          <div className="grid grid-cols-3 gap-2 ml-12">
            <div className="text-center">
              <div className="w-8 h-8 bg-indigo-800/40 rounded-full flex items-center justify-center mx-auto mb-1">
                <span className="text-xs">⚖️</span>
              </div>
              <p className="text-xs text-white/70">Obligaciones</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-indigo-800/40 rounded-full flex items-center justify-center mx-auto mb-1">
                <span className="text-xs">⏱️</span>
              </div>
              <p className="text-xs text-white/70">Plazos</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-indigo-800/40 rounded-full flex items-center justify-center mx-auto mb-1">
                <span className="text-xs">⚠️</span>
              </div>
              <p className="text-xs text-white/70">Penalizaciones</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="bg-indigo-900/40 p-4 rounded-xl border border-indigo-500/30 w-full max-w-md my-4"
        >
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-indigo-800/60 rounded-full flex items-center justify-center mr-3 border border-indigo-500/30">
              <span className="text-lg">⚙️</span>
            </div>
            <h4 className="text-indigo-300 font-medium">Function Calling</h4>
          </div>
          <div className="grid grid-cols-3 gap-2 ml-12">
            <div className="text-center">
              <div className="w-8 h-8 bg-indigo-800/40 rounded-full flex items-center justify-center mx-auto mb-1">
                <span className="text-xs">📊</span>
              </div>
              <p className="text-xs text-white/70">Generar Reportes</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-indigo-800/40 rounded-full flex items-center justify-center mx-auto mb-1">
                <span className="text-xs">🔍</span>
              </div>
              <p className="text-xs text-white/70">Marcar Secciones</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-indigo-800/40 rounded-full flex items-center justify-center mx-auto mb-1">
                <span className="text-xs">✏️</span>
              </div>
              <p className="text-xs text-white/70">Sugerir Cambios</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 5L12 19"
              stroke="rgba(165, 180, 252, 0.5)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 12L12 19L5 12"
              stroke="rgba(165, 180, 252, 0.5)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="bg-indigo-900/40 p-4 rounded-xl border border-indigo-500/30 w-full max-w-md mt-4"
        >
          <div className="flex items-center">
            <div className="w-10 h-10 bg-indigo-800/60 rounded-full flex items-center justify-center mr-3 border border-indigo-500/30">
              <span className="text-lg">📑</span>
            </div>
            <h4 className="text-indigo-300 font-medium">Análisis Legal Detallado</h4>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function Example3Diagram() {
  return (
    <div className="relative p-4 bg-slate-800/50 rounded-xl border border-green-500/20">
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-green-900/40 p-4 rounded-xl border border-green-500/30 w-full max-w-md mb-4"
        >
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-green-800/60 rounded-full flex items-center justify-center mr-3 border border-green-500/30">
              <span className="text-lg">👩‍🔬</span>
            </div>
            <h4 className="text-green-300 font-medium">Investigador Científico</h4>
          </div>
          <p className="text-sm text-white/70 ml-12">Consulta sobre avances recientes y análisis de datos</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 5L12 19"
              stroke="rgba(134, 239, 172, 0.5)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 12L12 19L5 12"
              stroke="rgba(134, 239, 172, 0.5)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 w-full my-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-green-900/30 p-3 rounded-xl border border-green-500/20"
          >
            <div className="flex flex-col">
              <h5 className="text-green-300 text-sm font-medium mb-2">System Prompt</h5>
              <p className="text-xs text-white/70">Configuración para mantener rigor científico y citar fuentes</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-green-900/30 p-3 rounded-xl border border-green-500/20"
          >
            <div className="flex flex-col">
              <h5 className="text-green-300 text-sm font-medium mb-2">RAG</h5>
              <p className="text-xs text-white/70">Recupera información de papers científicos y bases de datos</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-green-900/40 p-4 rounded-xl border border-green-500/30 w-full max-w-md my-4"
        >
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-green-800/60 rounded-full flex items-center justify-center mr-3 border border-green-500/30">
              <span className="text-lg">🤖</span>
            </div>
            <h4 className="text-green-300 font-medium">Sistema Multi-Agente (SMA)</h4>
          </div>
          <div className="grid grid-cols-3 gap-2 ml-12">
            <div className="text-center">
              <div className="w-8 h-8 bg-green-800/40 rounded-full flex items-center justify-center mx-auto mb-1">
                <span className="text-xs">📊</span>
              </div>
              <p className="text-xs text-white/70">Análisis Estadístico</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-green-800/40 rounded-full flex items-center justify-center mx-auto mb-1">
                <span className="text-xs">📚</span>
              </div>
              <p className="text-xs text-white/70">Revisión Literatura</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-green-800/40 rounded-full flex items-center justify-center mx-auto mb-1">
                <span className="text-xs">📈</span>
              </div>
              <p className="text-xs text-white/70">Visualización</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="bg-green-900/40 p-4 rounded-xl border border-green-500/30 w-full max-w-md my-4"
        >
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-green-800/60 rounded-full flex items-center justify-center mr-3 border border-green-500/30">
              <span className="text-lg">⚙️</span>
            </div>
            <h4 className="text-green-300 font-medium">Function Calling</h4>
          </div>
          <div className="grid grid-cols-3 gap-2 ml-12">
            <div className="text-center">
              <div className="w-8 h-8 bg-green-800/40 rounded-full flex items-center justify-center mx-auto mb-1">
                <span className="text-xs">📊</span>
              </div>
              <p className="text-xs text-white/70">Generar Gráficos</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-green-800/40 rounded-full flex items-center justify-center mx-auto mb-1">
                <span className="text-xs">🧮</span>
              </div>
              <p className="text-xs text-white/70">Análisis Estadístico</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-green-800/40 rounded-full flex items-center justify-center mx-auto mb-1">
                <span className="text-xs">📝</span>
              </div>
              <p className="text-xs text-white/70">Formatear Referencias</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 5L12 19"
              stroke="rgba(134, 239, 172, 0.5)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 12L12 19L5 12"
              stroke="rgba(134, 239, 172, 0.5)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="bg-green-900/40 p-4 rounded-xl border border-green-500/30 w-full max-w-md mt-4"
        >
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-800/60 rounded-full flex items-center justify-center mr-3 border border-green-500/30">
              <span className="text-lg">🔬</span>
            </div>
            <h4 className="text-green-300 font-medium">Informe Científico con Visualizaciones</h4>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
