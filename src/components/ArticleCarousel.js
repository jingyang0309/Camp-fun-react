import React, { Component } from 'react'
import { withRouter, Link, useParams } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { BsMoon } from 'react-icons/bs'
import '../styles/ArticleList.scss'

export default class MultipleItems extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
    }
    return (
      <div>
        <Slider {...settings}>
          <div>
            <div class="card articleTagProductCard">
              <img
                class="card-img-top articleTagProduct01"
                src="../../img/冰桶.jpeg"
                alt="tag_product_1"
              />
              <div class="card-body">
                <h5 class="card-title mb-4">Amenity Dome 寢室帳</h5>
                <p class="card-text">以抗風性與舒適性為設計重點的經典寢室帳</p>
                <h5 className="card-price mb-4">NT$14,900</h5>
                <span className="card-rating mr-3">Rating</span>
                <span>
                  <BsMoon size="25px" color="#FFD800" />
                  <BsMoon size="25px" color="#FFD800" />
                  <BsMoon size="25px" color="#FFD800" />
                  <BsMoon size="25px" color="#bdbdbd" />
                  <BsMoon size="25px" color="#bdbdbd" />
                </span>
              </div>
            </div>
          </div>
          <div>
            <div class="card articleTagProductCard">
              <img
                class="card-img-top articleTagProduct01"
                src="../../images/article/article_27.jpg"
                alt="tag_product_1"
              />
              <div class="card-body">
                <h5 class="card-title mb-4">Amenity Dome 寢室帳</h5>
                <p class="card-text">以抗風性與舒適性為設計重點的經典寢室帳</p>
                <h5 className="card-price mb-4">NT$14,900</h5>
                <span className="card-rating mr-3">Rating</span>
                <span>
                  <BsMoon size="25px" color="#FFD800" />
                  <BsMoon size="25px" color="#FFD800" />
                  <BsMoon size="25px" color="#FFD800" />
                  <BsMoon size="25px" color="#bdbdbd" />
                  <BsMoon size="25px" color="#bdbdbd" />
                </span>
              </div>
            </div>
          </div>
          <div>
            <div class="card articleTagProductCard">
              <img
                class="card-img-top articleTagProduct01"
                src="../../images/article/article_27.jpg"
                alt="tag_product_1"
              />
              <div class="card-body">
                <h5 class="card-title mb-4">Amenity Dome 寢室帳</h5>
                <p class="card-text">以抗風性與舒適性為設計重點的經典寢室帳</p>
                <h5 className="card-price mb-4">NT$14,900</h5>
                <span className="card-rating mr-3">Rating</span>
                <span>
                  <BsMoon size="25px" color="#FFD800" />
                  <BsMoon size="25px" color="#FFD800" />
                  <BsMoon size="25px" color="#FFD800" />
                  <BsMoon size="25px" color="#bdbdbd" />
                  <BsMoon size="25px" color="#bdbdbd" />
                </span>
              </div>
            </div>
          </div>
          <div>
            <div class="card articleTagProductCard">
              <img
                class="card-img-top articleTagProduct01"
                src="../../images/article/article_27.jpg"
                alt="tag_product_1"
              />
              <div class="card-body">
                <h5 class="card-title mb-4">Amenity Dome 寢室帳</h5>
                <p class="card-text">以抗風性與舒適性為設計重點的經典寢室帳</p>
                <h5 className="card-price mb-4">NT$14,900</h5>
                <span className="card-rating mr-3">Rating</span>
                <span>
                  <BsMoon size="25px" color="#FFD800" />
                  <BsMoon size="25px" color="#FFD800" />
                  <BsMoon size="25px" color="#FFD800" />
                  <BsMoon size="25px" color="#bdbdbd" />
                  <BsMoon size="25px" color="#bdbdbd" />
                </span>
              </div>
            </div>
          </div>
          <div>
            <div class="card articleTagProductCard">
              <img
                class="card-img-top articleTagProduct01"
                src="../../images/article/article_27.jpg"
                alt="tag_product_1"
              />
              <div class="card-body">
                <h5 class="card-title mb-4">Amenity Dome 寢室帳</h5>
                <p class="card-text">以抗風性與舒適性為設計重點的經典寢室帳</p>
                <h5 className="card-price mb-4">NT$14,900</h5>
                <span className="card-rating mr-3">Rating</span>
                <span>
                  <BsMoon size="25px" color="#FFD800" />
                  <BsMoon size="25px" color="#FFD800" />
                  <BsMoon size="25px" color="#FFD800" />
                  <BsMoon size="25px" color="#bdbdbd" />
                  <BsMoon size="25px" color="#bdbdbd" />
                </span>
              </div>
            </div>
          </div>
          <div>
            <div class="card articleTagProductCard">
              <img
                class="card-img-top articleTagProduct01"
                src="../../images/article/article_27.jpg"
                alt="tag_product_1"
              />
              <div class="card-body">
                <h5 class="card-title mb-4">Amenity Dome 寢室帳</h5>
                <p class="card-text">以抗風性與舒適性為設計重點的經典寢室帳</p>
                <h5 className="card-price mb-4">NT$14,900</h5>
                <span className="card-rating mr-3">Rating</span>
                <span>
                  <BsMoon size="25px" color="#FFD800" />
                  <BsMoon size="25px" color="#FFD800" />
                  <BsMoon size="25px" color="#FFD800" />
                  <BsMoon size="25px" color="#bdbdbd" />
                  <BsMoon size="25px" color="#bdbdbd" />
                </span>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    )
  }
}
