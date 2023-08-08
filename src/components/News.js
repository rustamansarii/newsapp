import React, { useEffect,useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export default function News(props) {
  const [articles,setArticles]= useState ([])
  const [loading,setLoading]= useState (false) //true
  const [page,setPage]= useState (1)
  const [totalResults,setTotalResults]= useState (0)

  const updateNews = async () =>{
    props.setprogress(0);
    let url=`https://newsapi.org/v2/top-headlines?country=${props.countery}&category=${props.categorey}&apiKey=ad15d7ea1e2f4f8c82d692794148e00e&pageSize=${props.PageSize}`;
   setLoading(true);
    let data= await fetch(url);
    props.setprogress(30);
    let parsedDate= await data.json();
    props.setprogress(50);
    console.log(parsedDate);
    setArticles(parsedDate.articles);
    setTotalResults(parsedDate.totalResults)
    setLoading(false)
   
    props.setprogress(100);
  }
  useEffect (()=>{
updateNews();
  },[])

//  const handleprevClick= async()=>{
//   console.log("previews")
//   let url=`https://newsapi.org/v2/top-headlines?country=${props.countery}&category=${props.categorey}&apiKey=ad15d7ea1e2f4f8c82d692794148e00e&page=${page - 1}&pageSize=${props.PageSize}`;
//   this.setState({loading:true});
// let data= await fetch(url);
// let parsedDate= await data.json();
// console.log(parsedDate);
// this.setState({articles: parsedDate.articles})

// this.setState({
//   page:page -1,
//   loading:false
// })
//   }
//  const handleNextClick= async ()=>{
// console.log("Next")
// if(!(page + 1>Math.ceil(totalResults/props.PageSize))){
// let url=`https://newsapi.org/v2/top-headlines?country=${props.countery}&category=${props.categorey}&apiKey=ad15d7ea1e2f4f8c82d692794148e00e&page=${page + 1}&pageSize=${props.PageSize}`;
// this.setState({loading:true});
// console.log(props.categorey);
// let data= await fetch(url);
// let parsedDate= await data.json();
// console.log(parsedDate);
// this.setState({articles: parsedDate.articles})

// this.setState({
//   page:page + 1
//   ,loading:false
// })
// }
//   }
const fetchMoreData = async () => {
    setPage(page+1)

  let url=`https://newsapi.org/v2/top-headlines?country=${props.countery}&category=${props.categorey}&apiKey=ad15d7ea1e2f4f8c82d692794148e00e&page=${page + 1}&pageSize=${props.PageSize}`;
  setLoading(true)
 
 console.log(props.categorey);
 let data= await fetch(url);
 let parsedDate= await data.json();
 console.log(parsedDate);
 setArticles(parsedDate.articles)


setArticles( articles.concat(parsedDate.articles))
setTotalResults(parsedDate.totalResults);
setPage(page + 1)

  
  };

 
    return (
      <>
     
      {/* <Spinner/> */}
      <div className="container ">
        <h2 className="text-center my-2">NewsMonkey - Top headline</h2>
        {/* <div className="container d-flex justify-content-between">
        <button disabled={page<=1} type="button" className="btn btn-dark mx-3 my-4" onClick={this.handleprevClick}>	&larr;Previous</button>
        
        <button disabled={page + 1>Math.ceil(totalResults/props.PageSize)} type="button" className="btn btn-dark mx-3 my-4" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
        {/* { !loading&&<Spinner/>} */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={loading&& <Spinner/> }
        >
        <div className="row my-3 mx-2">
          {articles.map((element) => {
           return <div className="col-md-4" key={element.url} >
              <NewsItem
                title={element.title?element.title.slice(0,40):""}
                description={element.description?element.description.slice(0,80):""}
                imgurl={element.urlToImage}
                newsUrl={element.url} author={element.author} date={element.publishedAt}

              />
            </div>;
          })}
           
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button disabled={page<=1} type="button" className="btn btn-dark mx-3 my-4" onClick={this.handleprevClick}>	&larr;Previous</button>
        <button disabled={page + 1>Math.ceil(totalResults/props.PageSize)} type="button" className="btn btn-dark mx-3 my-4" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </div>
      </>
    );
  }





News.defaultprops ={
  countery:"in",
  pageSize:12,
  categorey:"general"
}
News.PropTypes ={
countery:PropTypes.string,
pageSize:PropTypes.Number,
categorey:PropTypes.string
}
