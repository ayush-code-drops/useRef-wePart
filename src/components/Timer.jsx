import { useEffect, useRef, useState } from "react";

function Timer() {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [imgsrc, setImagesrc] = useState(null);
  const timerRef = useRef();
  const imageRef = useRef();
  const divRef = useRef();
  useEffect(() => {
    const file = imageRef.current.files[0];
    let src = null;
    if (file) {
      src = URL.createObjectURL(file);
      setImagesrc(src);
    }

    return () => {
      URL.revokeObjectURL(src);
    };
  }, []);
  const startTimer = () => {
    if (isRunning) {
      return;
    }
    timerRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    setIsRunning(true);
  };
  useEffect(() => {
    startTimer();
    return pauseTimer;
  }, []);

  const pauseTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTimer(0);
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  const handleImageChange = () => {
    console.log(imageRef.current.files);
  };

  const moveToTop = () => {
    divRef.current.scrollTop = "0";
  };
  return (
    <div>
      <h1>Timer: {timer}</h1>
      <button onClick={startTimer}>Start</button>
      <button onClick={pauseTimer}>Pause</button>
      <button onClick={resetTimer}>Reset</button>
      <br />
      <br />
      <hr />
      <input ref={imageRef} type="file" onChange={handleImageChange} multiple />
      <img src={imgsrc} alt="img" height="100px" />

      <hr />
      <button onClick={moveToTop}>Move to top</button>
      <div
        ref={divRef}
        style={{
          height: "200px",
          border: "1px solid black",
          overflow: "auto",
          width: "200px"
        }}
      >
        <div
          style={{
            height: "1024px",
            border: "1px solid red",
            padding: "5px"
          }}
        >
          <h1>Top </h1>
        </div>
      </div>
    </div>
  );
}

export default Timer;
