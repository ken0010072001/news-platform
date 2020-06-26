import React, { useEffect, useState  } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import map from 'lodash/map'
import { media } from '../utils/style/'
import styled from 'styled-components'
import Card from '../componets/News_card'

const HomeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${media.desktop`
    width: 1024px;
    height: 100%;
    margin: auto;
    justify-content: space-between;
  `}
  ${media.tablet`
    justify-content: space-around;
  `}
  ${media.mobile`
    justify-content: space-around;
  `}
`

function Home() {
  const dispatch = useDispatch()
  const [articles, setArticles] = useState({})

  const apiKey = 'c484092dabfd47a68d6da8903622d49a'
  
  useEffect(() => {
    axios.get(`https://newsapi.org/v2/everything?domains=washingtonpost.com,nytimes.com&apiKey=${apiKey}&pageSize=10`)
    .then(res => {
      setArticles(res.data.articles)
      dispatch({
        type: 'SET_ARTICLES',
        articles: res.data.articles
      })
    })
  },[]);

  return (
    <HomeContainer className="home-container">
      {
        map(articles, (item, index) => (
          <Card key={index} article={item}/>
        ))
      }
    </HomeContainer>
  );
}

export default Home;
