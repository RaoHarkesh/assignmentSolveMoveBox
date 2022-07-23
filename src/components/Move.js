import React, { useEffect, useState } from "react";
export default function Movebox() {
    const [toggle, setToggle] = useState(true);
    const [initial, setInitial] = useState(0);
    const [currentbox, setCurrentbox] = useState(null)
    const [arr, setArray] = useState([]);
    const [lastselectedbox, setlastselectedbox] = useState(null)

    useEffect(() => {

        let i = currentbox
        console.log(i);
        let boundary = document.querySelector(".boundary")
        let bottomboundary = boundary.offsetTop + boundary.offsetHeight;
        let operation = document.querySelector(".operations");
        let operationheight = operation.offsetHeight;
        let E = document.getElementById(i)
        function handleMovement(e) {
            if (currentbox == null) {
                alert("Movement Disable")
            }
            else {
                if (e.key === 'd') {
                    let right = E.offsetLeft + E.offsetWidth;
                    let left = E.offsetLeft;
                    if (right <= window.innerWidth - 3) {
                        left = left + 1;
                        console.log(left)
                        E.style.left = left + 'px';
                    }
                }
                else if (e.key === 'a') {
                    let left = E.offsetLeft;
                    if (left > 0) {
                        console.log("work")
                        left = left - 1;
                        console.log(left)
                        E.style.left = left + 'px';
                    }
                }
                else if (e.key === 's') {
                    let top = E.offsetTop;
                    let bottom = top + E.offsetHeight;
                    console.log(bottom)
                    if (bottom <= bottomboundary - operationheight - 3) {
                        top = top + 1;
                        E.style.top = top + 'px';
                    }
                }
                else if (e.key === 'w') {
                    let top = E.offsetTop;
                    if (top > 0) {
                        top = top - 1;
                        E.style.top = top + 'px';
                    }
                }

            }

        }
        window.addEventListener("keydown", handleMovement)
        return () => window.removeEventListener("keydown", handleMovement)
    }, [currentbox])
    const addBox = function () {
        setInitial(initial + 1)
        setArray([...arr, initial])
        console.log(arr.length)
        console.log(initial)
    }
    const boxClick = function (i) {
        if (toggle)
            setCurrentbox(i);
    }
    const handleDelete = function () {

        let newarray = arr.filter((i) => {
            return i != currentbox
        })

        setArray([...newarray])
    }
    const handleReset = function () {
        setArray([]);
        setInitial(0);
        setCurrentbox(null);
    }
    const handleToggle = function () {
        if (toggle) {
            setToggle(false);
            setlastselectedbox(currentbox);
            setCurrentbox(null);
        }
        else {
            setToggle(true)
            setCurrentbox(lastselectedbox)
        }

    }

    return (

        <>
            {console.log(arr)}
            <div className="operations">
                <button onClick={() => { toggle && addBox() }}>AddBox</button>
                <button onClick={() => { toggle && handleDelete() }}>Delete</button>
                <button onClick={() => { toggle && handleReset() }}>Reset</button>
                <div className="toggle"><button onClick={handleToggle}>Toggle</button> <span>Movement:</span>{toggle ? <span>Enable</span> : <span>Disable</span>}</div>
            </div>

            <div className="boundary">
                {arr.map((i) => {
                    return i == currentbox ? <div style={{ zIndex: i }} onClick={() => boxClick(i)} className="box active" id={i} key={i}>ID={i}</div> : <div style={{ zIndex: i }} onClick={() => boxClick(i)} className="box" id={i} key={i}>ID={i}</div>
                })

                }
                <span className="owner">Made By Harkesh Yadav</span>
            </div>
        </>
    )
}