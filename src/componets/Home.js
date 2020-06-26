import React, { useEffect, useState  } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import map from 'lodash/map'
import { media } from '../utils/style/'
import styled from 'styled-components'
import Card from '../componets/News_card'
import Header from '../componets/Header'

const CardContainer = styled.div`
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
    <>
      <Header />
      <CardContainer className="home-container">
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
