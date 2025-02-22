import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import Countdown from './Countdown';

function App() {
    const randomColor = () => Math.floor(Math.random() * 254)

    const [color, setColor] = useState([randomColor(), randomColor(), randomColor()]);
    const colorRef = useRef(color)
    const speed = 10
    const interval = 1000
    const [delta, setDelta] = useState([speed, speed, speed]);
    const deltaRef = useRef(delta)



    useEffect(() => {
        const animation = setInterval(() => {
            let tempColor = [...colorRef.current]
            let tempDelta = [...deltaRef.current]
            for (let i = 0; i < color.length; i++) {
                if (colorRef.current[i] + deltaRef.current[i] >= 0 && colorRef.current[i] + deltaRef.current[i] <= 255) {
                    tempColor[i] = colorRef.current[i] + deltaRef.current[i]
                    tempDelta[i] = Math.random() - 0.5 > 0 ? speed : -speed
                } else tempDelta[i] = -tempDelta[i]

            }

            setColor(...tempColor)
            colorRef.current = tempColor
            setDelta(...tempDelta)
            deltaRef.current = tempDelta

        }, interval)


        return () => clearInterval(animation);
    }, []);

    return (
        <div className="App" style={{ backgroundColor: `rgb(${colorRef.current[0]},${colorRef.current[1]},${colorRef.current[2]})`, transition: `all ease-in ${interval / 1000}s` }}>
            <div className="overlay"></div>
            <header className="App-header">
                <Countdown targetDate="2025-02-23T00:00:00Z" />
            </header>
        </div>
    );
}

export default App;
