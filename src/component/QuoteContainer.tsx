import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'

type Props = {
    changeBackgroundColor: () => void,
    backgroundColor: string,
}

type QUOTE = {
  text: string;
  author: string;
}

const data = [{text:'asdasdas kndsjkdkjfdaskkjlasdflkjhfdsakhjsdfalhjkdfaslhkjdasflkhjdsfalkhjdasfhjkdsfahjkladsflhjk', author:'asdasdas'},{text:'1222', author:'asdasdas'}]
export default function QuoteContainer({changeBackgroundColor, backgroundColor}: Props) {
  const [quoteList, setQuoteList] =  useState(data)
  const [currentQuoteIndex, setCurrentQuoteIndex] =  useState(-1)
  const [currentQuote, setCurrentQuote] =  useState({text:'Nothing ksddsadasdasdsadasasdasdjbsdbkjasdkjasdkjjkdasjkdasjkhdsajkhsad',author:'test'})
  
  const getQuote = async ()=>{
   const data =  await fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data)
    setQuoteList(data);
    setCurrentQuoteIndex(0)
  });
  }

  useEffect(()=>{
    getQuote()
  },[])

  useEffect(()=>{
    if(quoteList.length > -1){
      setCurrentQuote(quoteList[0])
      setCurrentQuoteIndex(0)
    }
    //getQuote()
  },[quoteList])

  const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(currentQuote.text);
      console.log('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  const handleGetNewQuote = ()=>{

    if(currentQuoteIndex === (quoteList.length -1)){
        setCurrentQuoteIndex(0)
        setCurrentQuote(quoteList[0])
    }else{
     setCurrentQuote(quoteList[currentQuoteIndex + 1])
     setCurrentQuoteIndex(currentQuoteIndex=>currentQuoteIndex+1)
    }
    changeBackgroundColor()
  }

  return (
    <div className='quote-container' >
       {currentQuote ? <div className='quote-block'>
         <span className='quote-text' style={{color:backgroundColor}}><FontAwesomeIcon icon={faQuoteLeft} />{"     "+ currentQuote.text}</span>
         <div className='author-name' style={{color:backgroundColor}}> - {currentQuote.author} </div>

        </div> : <></>}
        <div className='actions'>
            <button className='btn btn-secondary' style={{borderColor:backgroundColor, color:backgroundColor}} onClick={copyContent}>Copy</button>
            <button style={{backgroundColor}} className='btn btn-primary' onClick={handleGetNewQuote}>New quote</button>
        </div>
    </div>
  )
}