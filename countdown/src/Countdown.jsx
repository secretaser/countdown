import { useState, useEffect } from "react";

function Countdown({ targetDate }) {
    const opacity = 0.3
    const calculateTimeLeft = () => {
        const now = Date.now();
        const target = new Date(targetDate).getTime();
        const difference = target - now;

        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
            milliseconds: difference % 1000,
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            const temp = calculateTimeLeft()
            setTimeLeft(temp);
            const isFinished = () => {
                for (const i in temp) {
                    if (Object.prototype.hasOwnProperty.call(temp, i)) {
                        if (temp[i] != 0) return false
                    }
                }
                return true;
            }
            setFinished(isFinished())

        }, 10);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className={finished ? "container_finished" : "container"}>
            {/* <p className="head">PLACEHOLDER</p> */}
            {finished ? <p className="head_finished">ПРИВЕЕЕЕЕЕТ</p> : <p className="head">До прибытия осталось:</p>}
            {!finished &&
                <div className="time">
                    <span style={timeLeft.days == 0 ? { opacity: opacity } : {}}>{timeLeft.days}:</span>
                    <span style={timeLeft.days == 0 && timeLeft.hours == 0 ? { opacity: opacity } : {}}>{String(timeLeft.hours).padStart(2, "0")}:</span>
                    <span style={timeLeft.days == 0 && timeLeft.hours == 0 && timeLeft.minutes == 0 ? { opacity: opacity } : {}}>{String(timeLeft.minutes).padStart(2, "0")}:</span>
                    <span style={timeLeft.days == 0 && timeLeft.hours == 0 && timeLeft.minutes == 0 && timeLeft.seconds == 0 ? { opacity: opacity } : {}}>{String(timeLeft.seconds).padStart(2, "0")}:</span>
                    <span style={timeLeft.days == 0 && timeLeft.hours == 0 && timeLeft.minutes == 0 && timeLeft.seconds == 0 && timeLeft.milliseconds == 0 ? { opacity: opacity } : {}}>{String(timeLeft.milliseconds).padStart(3, "0")}</span>
                </div>}

        </div>
    );
}

export default Countdown;