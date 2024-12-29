"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Spotlight } from "./components/spotlight"
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from "@/app/lib/utils"
import packageLock from '../package-lock.json'
import { motion, AnimatePresence } from "framer-motion"

export default function Home() {
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [showSpotlights, setShowSpotlights] = useState(false)
  const [showFullContent, setShowFullContent] = useState(false)
  const aboutRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const spotlightTimer = setTimeout(() => {
      setShowSpotlights(true)
    }, 1000)

    const contentTimer = setTimeout(() => {
      setShowFullContent(true)
    }, 2000)

    return () => {
      clearTimeout(spotlightTimer)
      clearTimeout(contentTimer)
    }
  }, [])

  const toggleAbout = () => {
    setIsAboutOpen(!isAboutOpen)
    if (aboutRef.current) {
      aboutRef.current.style.transform = isAboutOpen ? 'translateY(100%)' : 'translateY(0)'
    }
  }

  return (
    <div className="relative min-h-screen bg-[#121216] text-white flex flex-col overflow-hidden">
      <AnimatePresence>
        {showSpotlights && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Spotlight
                className="fixed -top-40 left-0 md:left-60 md:-top-20 opacity-100"
                fill="white"
              />
              
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              <Spotlight
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                fill="white"
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      <main className={cn(
        "flex-1 flex flex-col items-center justify-center px-4 z-10 transition-opacity duration-300",
        isAboutOpen ? "opacity-0 pointer-events-none" : "opacity-100"
      )}>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center"
        >
         <div className="w-64 h-64 mb-5">
            <img 
              src="/images/logo.png" 
              alt="Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light tracking-wider mb-2 text-center">
  slow roads
</h1>

<p className="text-gray-400 text-sm tracking-widest mb-12 text-center">
  endless driving zen
</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showFullContent ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <button className="w-[280px] h-[60px] bg-[rgba(45,45,45,0.9)] text-white text-lg font-light tracking-[0.2em] rounded-sm">
            begin
          </button>
        </motion.div>
      </main>
      
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: showFullContent ? 1 : 0 }}
        transition={{ duration: 1 }}
        className={cn(
          "py-6 px-4 flex justify-between items-end z-10 transition-opacity duration-300",
          isAboutOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      >
        <div className="text-xs text-gray-500">
          <a 
            href="https://shauryabahl.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors"
          >
            From Shaurya and Ahaan © 2024
          </a>
        </div>
        
        <div className="flex gap-8 absolute left-1/2 bottom-6 transform -translate-x-1/2">
          <a href="#" className="text-xl hover:text-gray-300 transition-colors">donate</a>
          <button onClick={toggleAbout} className="text-xl hover:text-gray-300 transition-colors flex flex-col items-center">
            about
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </button>
        </div>
        
        <div className="text-xs text-gray-500">
          <span>v{packageLock.version}</span>
        </div>
      </motion.footer>

      <div 
        ref={aboutRef}
        className={cn(
          "fixed inset-x-0 bottom-0 bg-black/90 text-white p-8 transition-transform duration-300 ease-in-out transform translate-y-full",
          isAboutOpen && "translate-y-0"
        )}
      >
        <button 
          onClick={toggleAbout}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
        >
          <ChevronUp className="w-6 h-6" />
          <span className="sr-only">Back</span>
        </button>
        <h2 className="text-2xl font-bold mb-4">About Slow Roads</h2>
        <p className="mb-4">
          Slow Roads is an endless driving zen experience created by Shaurya and Ahaan.
          Immerse yourself in a relaxing journey through procedurally generated landscapes.
        </p>
        <h3 className="text-xl font-semibold mb-2">How to Install</h3>
        <ol className="list-decimal list-inside space-y-2">
          <li>Clone the repository: <code className="bg-gray-800 px-2 py-1 rounded">git clone https://github.com/shaurya-ahaan/slow-roads.git</code></li>
          <li>Navigate to the project directory: <code className="bg-gray-800 px-2 py-1 rounded">cd slow-roads</code></li>
          <li>Install dependencies: <code className="bg-gray-800 px-2 py-1 rounded">npm install</code></li>
          <li>Start the development server: <code className="bg-gray-800 px-2 py-1 rounded">npm run dev</code></li>
          <li>Open your browser and visit: <code className="bg-gray-800 px-2 py-1 rounded">http://localhost:3000</code></li>
        </ol>
      </div>
    </div>
  )
}

