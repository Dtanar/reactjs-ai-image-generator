import './ImageGenerator.css'
import defualt from '../assets/default.jpg'
import { useState } from 'react'
import { useRef } from 'react'

export default function ImageGenerator() {

    const [imageUrl, setImageUrl] = useState("/")
    const [loading, setLoading] = useState(false)
    let inputRef = useRef(null)

    async function imageGenerator() {
        if (inputRef.current.value === "") {
            return 0;
        }
        setLoading(true)

        const response = await fetch(
            "https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
                "User-Agent": "Chrome",
            },
            body: JSON.stringify({
                prompt: `${inputRef.current.value}`,
                n: 1,
                size: "512x512",
            }),
        }
        );

        let data = await response.json();
        console.log(data)
        let dataArray = data.data;
        setImageUrl(dataArray[0].url)
        setLoading(false)
    }

    return (
        <div className='ai-image-generator'>
            <div className="header">My Ai Image <span>Generator</span></div>

            <div className="img-loading">
                <div className="image">
                    <img src={imageUrl === "/" ? defualt : imageUrl} alt="the default image gen" />
                </div>
                <div className="loading">
                    <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
                    <div className={loading ? "loading-text" : "no-display"}>Loading...</div>
                </div>
            </div>

            <div className="search-bar">
                <input type="text" ref={inputRef} className='search-input' placeholder='Enter your prompt' />
                <div className="generate-btn" onClick={() => {
                    imageGenerator()
                }}>Generate</div>
            </div>
        </div>
    )
}
