'use client'

import { useEffect, useRef, useState } from 'react'
import { FiPlay } from 'react-icons/fi'

const HeroVideo = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const [play, setPlay] = useState(false)

    useEffect(() => {
        if (videoRef.current) {
            if (play) {
                videoRef.current.play()
            } else {
                videoRef.current.pause()
            }
        }
    }, [play])

    return (
        <div className="relative aspect-video bg-primary-100 rounded-xl overflow-hidden shadow-lg">
            {/* Video */}
            <video
                ref={videoRef}
                className="w-full h-full object-cover"
                poster="/videos/poster.jpg"
                controls={false}

            >
                <source src="/videos/hero-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
                <button
                    onClick={() => setPlay(!play)}
                    className="p-4 bg-primary text-white rounded-full hover:bg-primary-700 transition-all transform hover:scale-105"
                >
                    <FiPlay size={24} />
                </button>
            </div>
        </div>
    )
}

export default HeroVideo
