import React, {useState, useEffect} from 'react'

const ScoreKeeper = () => {
let [score, setScore] = useState(0)
let [wicket, setwicket] = useState(0)
let [over, setOver] = useState(0)
let [ball, setBall] = useState(0)
const [maxOvers, setMaxOvers] = useState(20);
// useEffect(() => { console.log(over); }, [over]);
let [ballwise, setBallwise] = useState([[]])
const isNoBallOrWide = false
const handleMaxOversChange = (event) => 
  { setMaxOvers(parseInt(event.target.value) || 0); };
// -------------------------------------------------------
// For Adding Runs
// -------------------------------------------------------
const addRun = (num)=>{
    if(over < maxOvers){
setScore((preScore) => preScore + num)
setBallwise((prevOvers) => {
        const lastOver = [...prevOvers[prevOvers.length - 1]];
        if (lastOver.length < 6) {
        lastOver.push(num);
        return [...prevOvers.slice(0, -1), lastOver];
        } else {
        return [...prevOvers, [num]];
        }
    });
    trackBalls()
}
}
// -------------------------------------------------------
// For Adding wickets
// -------------------------------------------------------
const addWicket = ()=>{
    if(over<maxOvers){
    if(wicket + 1 === 10){
        setwicket('All Out')      
    }else{
        if(wicket !== 'All Out'){
        setwicket((prewicket)=> prewicket + 1)
        setBallwise((prevOvers) => {
        const lastOver = [...prevOvers[prevOvers.length - 1]];
        if (lastOver.length < 6) {
        lastOver.push('W');
        return [...prevOvers.slice(0, -1), lastOver];
        } else {
        return [...prevOvers, ['W']];
        } 
        })
        if(wicket!== 'All Out'){
        trackBalls()
        } 
      }
    }
  }
}
const addWide = () => { 
  if (over < maxOvers) 
    { setScore((preScore) => preScore + 1); 
      setBallwise((prevOvers) => 
        { const lastOver = [...prevOvers[prevOvers.length - 1]];
          if (lastOver.length < 6) { 
            lastOver.push('Wd'); 
            return [...prevOvers.slice(0, -1), lastOver]; } 
            else { 
              return [...prevOvers, ['Wd']]; } 
            }); 
      } 
  };
const addNoBall = () => 
  { if (over < maxOvers) 
    { setScore((preScore) => preScore + 1);
      setBallwise((prevOvers) => 
        { const lastOver = [...prevOvers[prevOvers.length - 1]]; 
          if (lastOver.length < 6) 
            { lastOver.push('Nb'); 
              return [...prevOvers.slice(0, -1), lastOver]; 
            } 
          else 
            { return [...prevOvers, ['Nb']]; } 
          }); 
    }
  };
// -------------------------------------------------------
// For Tracking the balls
// -------------------------------------------------------
const trackBalls = (isNoBallOrWide) => 
  { 
    if (!isNoBallOrWide && over < 20) 
      { setBall((prevBall) => 
        { 
          const newBall = prevBall + 1; 
          if (newBall === 6) 
            { 
              setBall(0); 
              setOver((prevOver) => prevOver + 1); 
            } return newBall; 
          }
        ); 
      }
  }
const getClassForRun = (run) => { 
  if (run === 4) return 'bg-green-500 text-white rounded-lg text-lg p-1'; 
  if (run === 6) return 'bg-purple-500 text-white rounded-lg text-lg p-1'; 
  if (run === 'W') return 'bg-red-500 text-white rounded-lg text-lg p-1'; 
  if (run === 'Wd') return 'bg-yellow-200 rounded-lg text-lg p-1'; 
  if (run === 'Nb') return 'bg-red-300 text-white rounded-lg text-lg p-1'; 
  return 'bg-blue-500 text-white rounded-lg text-lg p-1';
}
  return (
    <section className='py-8 md:px-96 w-full '>
    <div>
      <h1 className='text-center text-4xl font-medium m-6'>Score Board</h1>
      <div className='flex justify-center items-center mb-4'> 
        <label className='mr-2'>Overs:</label> 
        <input type='number' value={maxOvers} onChange={handleMaxOversChange} className='border p-1 rounded' min='1' /> 
      </div>
      <h2 className='text-center text-2xl font-medium m-2'>SCORE: {score}/{wicket}</h2>
      <h2 className='text-center text-2xl font-medium m-2'>Overs: {over}.{ball}</h2>
{/* Score Buttons */}
    <div className='md:flex md:justify-center grid grid-cols-4 m-4  lg:gap-5 lg:text-2xl gap-3'>
      <button className='shadow-sm bg-slate-200 rounded-md p-2' onClick={()=> addRun(0)}>0</button>
      <button className='shadow-sm bg-slate-200 rounded-md p-2' onClick={()=> addRun(1)}>1</button>
      <button className='shadow-sm bg-slate-200 rounded-md p-2' onClick={()=> addRun(2)}>2</button>
      <button className='shadow-sm bg-slate-200 rounded-md p-2' onClick={()=> addRun(3)}>3</button>
      <button className='shadow-sm bg-slate-200 rounded-md p-2' onClick={()=> addRun(4)}>4</button>
      <button className='shadow-sm bg-slate-200 rounded-md p-2' onClick={()=> addRun(5)}>5</button>
      <button className='shadow-sm bg-slate-200 rounded-md p-2' onClick={()=> addRun(6)}>6</button>
      <button className='shadow-sm bg-slate-200 rounded-md p-2' onClick={addWicket}>W</button>
      <button className="shadow-sm bg-slate-200 rounded-md p-2" onClick={addWide}>WD</button> 
      <button className="shadow-sm bg-slate-200 rounded-md p-2" onClick={addNoBall}>NB</button>
    </div>
    <div className='text-center grid grid-flow-col'>
      <div>
        <h1 className='text-2xl font-medium mt-4'>Over Summary</h1>
        <div className='text-xl m-4'>
        {ballwise.map((over, overIndex) => (
        <div key={overIndex} className='mt-4'>
        Over {overIndex + 1}: {over.map((ball, ballIndex) => (
        <span key={ballIndex} className={getClassForRun(ball)} >{ball} </span>
        ))}
        </div>
      ))}
      </div>
      </div>
      {/* <div className='text-end grid-cols-1'>
      <h1 className=' text-2xl font-medium mt-4'>Commnetary</h1>
      </div> */}
    </div>
    </div>
    </section>
  )
}

export default ScoreKeeper
