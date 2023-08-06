import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title,description,imgurl,newsUrl,author,date}=this.props;
    return (
      <div className='my-3' >
        <div className="card" style={{width: "18rem"}}>
        <img src={!imgurl?"	https://image.cnbcfm.com/api/v1/image/107195553-16…_14_mby00219wt003.jpeg?v=1690328565&w=1920&h=1080":imgurl} className="card-img-top" alt="..."/>
  {/* <img src={imgurl} className="card-img-top" alt="..."/> */}
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small className="text-body-secondary">by    {!author?"Unknow":this.props.author}    {new Date(date).toGMTString()}</small></p>
    <a href={newsUrl} target='_blank' className="btn btn-primary">Go somewhere</a>
  </div>
</div>
      </div>
    )
  }
}
