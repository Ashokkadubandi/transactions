import {useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css';

const getUserOneData = () => {
  let data = localStorage.getItem('userOne')
  let parsed = JSON.parse(data)
  if(parsed !== null){
    return parsed
  }
  return []
}
const getUserTwoData = () => {
  let data = localStorage.getItem('userTwo')
  let parsed = JSON.parse(data)
  if(parsed !== null){
    return parsed
  }
  return []
}

const user_one = getUserOneData()
const user_two = getUserTwoData()

function App(){

  const [userAmt,setamt] = useState({user1:user_one,user2:user_two,userStat:''})

  const [amt,changeAmt] = useState('')

  const transactionsUserOne = () => {
    const user1 = userAmt.user1
    const curDate = new Date().toLocaleString()
      const newTransaction = {
        id:uuidv4(),
        amount:amt,
        date : curDate
      }
      if(amt !== ""){
        user1.push(newTransaction)
        localStorage.setItem('userOne',JSON.stringify(user1))
      }
      setamt({...userAmt,user1,userStat:'USER1'})
      changeAmt('')
    
  }

  const transactionsUserTwo = () => {
    const user2 = userAmt.user2
    const curDate = new Date().toLocaleString()
      const newTransaction = {
        id:uuidv4(),
        amount:amt,
        date : curDate
      }
      if(amt !== ""){
        user2.push(newTransaction)
        localStorage.setItem("userTwo",JSON.stringify(user2))
      }
      setamt({...userAmt,user2,userStat:'USER2'})
      changeAmt('')
    
  }

  const userOneData = () => {
    const {user1} = userAmt
    return (
    <div className='con'>
      <h1 className='user'>User1</h1>
        <ul>
          {user1.map(each => {
            const {id,amount,date} = each
            console.log()

            return (
              <li key={id}>
                <h1>{amount}/-</h1>
                <p>{date}</p>
              </li>
            )
          })}
    </ul>
    </div>
    )
  }

  const userTwoData = () => {
    const {user2} = userAmt
    return (
    <div className='con'>
      <h1 className='user'>User2</h1>
        <ul>
          {user2.map(each => {
            const {id,amount,date} = each

            return (
              <li key={id}>
                <h1>{amount}/-</h1>
                <p>{date}</p>
              </li>
            )
          })}
    </ul>
    </div>
    )
  }

  const renderUsersData = () => {
    switch(userAmt.userStat){
      case 'USER1':
        return userOneData()
      case 'USER2':
        return userTwoData()
      default:
        return null
    }
  }


console.log(userAmt)
  return <div className='log'>
    <div className='amt-sec'>
      <input type='text' value={amt} onChange={(e) => changeAmt(e.target.value)}/>
      <div className='userBtn-sec'>
        <button type='button' onClick={transactionsUserOne}>User1</button>
        <button type='button' onClick={transactionsUserTwo}>User2</button>
      </div>
    </div>
    <div className='transactions'>
      {renderUsersData()}
    </div>
  </div>
}

export default App;
