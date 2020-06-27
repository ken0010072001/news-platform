import React, { useEffect, useState  } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import map from 'lodash/map'
import { media } from '../utils/style/'
import styled from 'styled-components'
import Card from '../componets/News_card'
import Header from '../componets/Header'
import InfiniteScroll from "react-infinite-scroll-component";


const CardContainer = styled(InfiniteScroll)`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  justify-content: space-around;
  ${media.desktop`
    width: 1024px;
    height: 100%;
    margin: auto;
    justify-content: space-between;
  `}
`

function Home() {
  const dispatch = useDispatch()
  let [articles, setArticles] = useState([])

  const apiKey = 'c484092dabfd47a68d6da8903622d49a'
  
  useEffect(() => {
    axios.get(`https://newsapi.org/v2/everything?domains=washingtonpost.com,nytimes.com&apiKey=${apiKey}&pageSize=10&page=1`)
    .then(res => {
      setArticles(res.data.articles)
      dispatch({
        type: 'SET_ARTICLES',
        articles: res.data.articles
      })
    })
  },[]);

  const fetchMoreData = () => {

    setTimeout(() => {
      axios.get(`https://newsapi.org/v2/everything?domains=washingtonpost.com,nytimes.com&apiKey=${apiKey}&pageSize=10&page=2`)
      .then(res => {
        articles = [...articles,...res.data.articles ]
        setArticles(articles)
        dispatch({
          type: 'SET_ARTICLES',
          articles: res.data.articles
        })
      })
    }, 1500);
  };

  return (
    <>
      <Header />
        <CardContainer className="home-container"
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
          >
          {
            map(articles, (item, index) => (
              <Card key={index} article={item}/>
            ))
          }
        </CardContainer>
    </>
  )
}

export default Home;
