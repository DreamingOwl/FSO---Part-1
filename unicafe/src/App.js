import { useState } from 'react'

const Button = ({onClick,text}) => {
  return (
    <button onClick={onClick} > 
      {text} 
    </button>
  )
}

const HeaderLine = (props) => {
  return (
    <h1> {props.text} </h1>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td> 
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {

  //dont show statistic if there is no feedback
  if(props.all === 0) {
    return (
        <div>
          <h1>
            statistics
          </h1>
          <p>no feedback given</p>
        </div>   
    )
  }
  //show statistic
  else{
    return (
      <div>
        <HeaderLine text='statistics' />
        <table>
          <tbody>
            <StatisticLine text='good' value={props.good}/>
            <StatisticLine text='neutral' value={props.neutral}/>
            <StatisticLine text='bad' value={props.bad}/>
            <StatisticLine text='all' value={props.all}/>
            <StatisticLine text='average' value={props.avg}/>
            <StatisticLine text='positive' value={props.positive}/>
          </tbody>
        </table>
      </div>
    )
  }
}

const App = () => {

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [overview, setOverview] = useState({all: 0, avg:0, positive:'0%' })

  const onSetOverview = (updatedGood, updatedNeutral, updatedBad) => {
    
    const updatedAll = updatedGood + updatedNeutral + updatedBad
    const positiveString = (updatedGood / updatedAll * 100).toString() + '%'

    const newOverview = { all: updatedAll,
                          avg: ( updatedGood - updatedBad ) / updatedAll,
                          positive: positiveString
                        }
    setOverview(newOverview)
  }


  const onClickSetGood = () => {
    setGood(good+1)
    onSetOverview(good+1, neutral, bad)
  }

  const onClickSetNeutral = () => {
    setNeutral(neutral+1)
    onSetOverview(good, neutral+1, bad)
  }

  const onClickSetBad = () => {
    setBad(bad+1)
    onSetOverview(good, neutral, bad+1)
  }

  return (
    <div>
      <HeaderLine text='give feedback' />
      <Button onClick={onClickSetGood} text='good' />
      <Button onClick={onClickSetNeutral} text='neutral' />
      <Button onClick={onClickSetBad} text='bad' />
      <Statistics good={good} bad={bad} neutral={neutral} all={overview.all} avg={overview.avg} positive={overview.positive}/>
    </div>
  )
}

export default App