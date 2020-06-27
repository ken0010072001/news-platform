import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import map from 'lodash/map'
import { media } from '../utils/style/'
import styled from 'styled-components'
import Card from '../componets/News_card'
import Header from '../componets/Header'
import InfiniteScroll from "react-infinite-scroll-component";
import isEmpty from 'lodash/isEmpty'
import { NEWS_API_KEY } from '../config/app'

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
const CardContainerNoInf = styled.div`
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

const Loading = styled.div`
  position: fixed;
  width: 100%;
  bottom: 25px;
  text-align: center;

`

function Home() {
  const dispatch = useDispatch()
  let [hasMore, setHasMore] = useState(true)
  let pager = useSelector(state => state.pager)
  let articles = useSelector(state => state.articles)
  let searchState = useSelector(state => state.searching)
  let searchArticles = useSelector(state => state.searchArticles)

  // init the page and get the new when load the page.
  useEffect(() => {
    axios.get(`https://newsapi.org/v2/everything?domains=washingtonpost.com,nytimes.com&apiKey=${NEWS_API_KEY}&pageSize=10&page=1`)
    .then(res => {
      dispatch({
        type: 'SET_ARTICLES',
        articles: res.data.articles
      })
    })
    if (isEmpty(articles)) {
      dispatch({
        type: 'SET_PAGER',
        pager: pager + 1
      })
    }
  },[]);

  const fetchMoreData = () => {
    // set for limit for fetch news
    if (articles.length >= 100) {
      setHasMore(false)
      return;
    }
    setTimeout(() => {
      axios.get(`https://newsapi.org/v2/everything?domains=washingtonpost.com,nytimes.com&apiKey=${NEWS_API_KEY}&pageSize=10&page=${pager}`)
      .then(res => {
        dispatch({
          type: 'SET_ARTICLES',
          articles: [...articles,...res.data.articles ]
        })
      })
      // after fetch once data, add pager once.
      dispatch({
        type: 'SET_PAGER',
        pager: pager + 1
      })
    }, 1500);
  };

  return (
    <>
      <Header />
        {searchState ? ( // is user searching, show search result
          <CardContainerNoInf className="home-container">
            {
              map(searchArticles, (item, index) => (
                <Card key={index} article={item}/>
              ))
            }
          </CardContainerNoInf>
        ) : ( // normal result
          <CardContainer className="home-container"
              dataLength={articles.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<Loading>Loading...</Loading>}
            >
            {
              map(articles, (item, index) => (
                <Card key={index} article={item}/>
              ))
            }
          </CardContainer>
        )}
    </>
  )
}

export default Home;
