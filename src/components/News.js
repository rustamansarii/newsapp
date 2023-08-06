import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
  static defaultprops ={
    countery:"in",
    pageSize:12,
    categorey:"general"
  }
  static PropTypes ={
  countery:PropTypes.string,
  pageSize:this.prototype.Number,
  categorey:PropTypes.string
  }
  constructor() {
    super();
    console.log("Hello I am a constructor from News component");
    this.state = {
      articles:[],
      loading:false,
      page:1,
      totalResults:0
    };

  }
  async updateNews(){
    this.props.setprogress(0);
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.countery}&category=${this.props.categorey}&apiKey=f6d022c9825c42e2b74ecebb0e8db363&pageSize=${this.props.PageSize}`;
    this.setState({loading:true});
    let data= await fetch(url);
    this.props.setprogress(30);
    let parsedDate= await data.json();
    this.props.setprogress(50);
    console.log(parsedDate);
    this.setState({articles: parsedDate.articles,
      totalResults:parsedDate.totalResults,loading:false,
    })
    this.props.setprogress(100);
  }
  async componentDidMount(){
    console.log("cdn");
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.countery}&category=${this.props.categorey}&apiKey=f6d022c9825c42e2b74ecebb0e8db363&pageSize=${this.props.PageSize}`;
    // this.setState({loading:true});
    // let data= await fetch(url);
    // let parsedDate= await data.json();
    // console.log(parsedDate);
    // this.setState({articles: parsedDate.articles,
    //   totalResults:parsedDate.totalResults,loading:false,
    // })
    this.updateNews();
  }
//   handleprevClick= async()=>{
//   console.log("previews")
//   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.countery}&category=${this.props.categorey}&apiKey=f6d022c9825c42e2b74ecebb0e8db363&page=${this.state.page - 1}&pageSize=${this.props.PageSize}`;
//   this.setState({loading:true});
// let data= await fetch(url);
// let parsedDate= await data.json();
// console.log(parsedDate);
// this.setState({articles: parsedDate.articles})

// this.setState({
//   page:this.state.page -1,
//   loading:false
// })
//   }
//   handleNextClick= async ()=>{
// console.log("Next")
// if(!(this.state.page + 1>Math.ceil(this.state.totalResults/this.props.PageSize))){
// let url=`https://newsapi.org/v2/top-headlines?country=${this.props.countery}&category=${this.props.categorey}&apiKey=f6d022c9825c42e2b74ecebb0e8db363&page=${this.state.page + 1}&pageSize=${this.props.PageSize}`;
// this.setState({loading:true});
// console.log(this.props.categorey);
// let data= await fetch(url);
// let parsedDate= await data.json();
// console.log(parsedDate);
// this.setState({articles: parsedDate.articles})

// this.setState({
//   page:this.state.page + 1
//   ,loading:false
// })
// }
//   }
   fetchMoreData = async () => {
  this.setState({page:this.state.page+1})
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.countery}&category=${this.props.categorey}&apiKey=f6d022c9825c42e2b74ecebb0e8db363&page=${this.state.page + 1}&pageSize=${this.props.PageSize}`;
 this.setState({loading:true});
 console.log(this.props.categorey);
 let data= await fetch(url);
 let parsedDate= await data.json();
 console.log(parsedDate);
 this.setState({articles: parsedDate.articles})



    this.setState({articles: this.state.articles.concat(parsedDate.articles),
      totalResults:parsedDate.totalResults,loading:false, page:this.state.page + 1
    })
  };

  render() {
    return (
      <>
     
      {/* <Spinner/> */}
      <div className="container ">
        <h2 className="text-center my-2">NewsMonkey - Top headline</h2>
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark mx-3 my-4" onClick={this.handleprevClick}>	&larr;Previous</button>
        
        <button disabled={this.state.page + 1>Math.ceil(this.state.totalResults/this.props.PageSize)} type="button" className="btn btn-dark mx-3 my-4" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
        {this.state.loading&&<Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!== this.state.totalResults}
          loader={this.state.loading&& <Spinner/> }
        >
        <div className="row my-3 mx-2">
          {this.state.articles.map((element) => {
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
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark mx-3 my-4" onClick={this.handleprevClick}>	&larr;Previous</button>
        <button disabled={this.state.page + 1>Math.ceil(this.state.totalResults/this.props.PageSize)} type="button" className="btn btn-dark mx-3 my-4" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </div>
      </>
    );
  }
}
