import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'


function Home() {
  const dispatch = useDispatch()
  // const articles = useSelector(state => state.articles)

  useEffect(() => {
    axios.get(`https://newsapi.org/v2/everything?domains=washingtonpost.com,nytimes.com&apiKey=c484092dabfd47a68d6da8903622d49a&pageSize=2`)
    .then(res => {
      dispatch({
        type: 'SET_ARTICLES',
        articles: res.data.articles
      })
    })
  });

  return (
    <div className="home-container">
      <p></p>
    </div>
  );
}

export default Home;
