"use client";

import React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//install slick-carousel    npm install slick-carousel --save   npm install react-slick --save

export default function FeaturedPosts() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "center",
    centerMode: true,
    arrows: false,
    autoplaySpeed: 4000,
    autoplay: true,
  };

  return (
    <div className="bg-primary-200">
      <h1 className="font-onest text-white text-3xl global-mx py-7">Featured Posts</h1>
      <Slider {...settings} className="slider h-[28rem]">
        <div className="slider__item">
            <div className="slider__image relative overflow-hidden rounded-lg">
              <img src="https://picsum.photos/1300" alt="" />
              <div className="slider-image-caption absolute z-40 bottom-5"><span className="bg-slate-900 absolute -left-10 -top-8 w-[40rem] h-[25rem] blur-2xl opacity-80 -z-30"></span>
              <p className="global-mx text-white">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum cum, nesciunt voluptates recusandae perferendis quod, asperiores minus temporibus est quidem aut assumenda natus.</p>
              </div>
            </div>   
        </div>
        <div className="slider__item">
            <div className="slider__image relative overflow-hidden rounded-lg">
              <img src="https://picsum.photos/1200" alt="" />
              <div className="slider-image-caption absolute z-40 bottom-5"><span className="bg-slate-900 absolute -left-10 -top-8 w-[40rem] h-[25rem] blur-2xl opacity-80 -z-30"></span>
              <p className="global-mx text-white">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum cum, nesciunt voluptates recusandae perferendis quod, asperiores minus temporibus est quidem aut assumenda natus.</p>
              </div>
            </div>   
        </div>
        <div className="slider__item">
            <div className="slider__image relative overflow-hidden rounded-lg">
              <img src="https://picsum.photos/1800" alt="" />
              <div className="slider-image-caption absolute z-40 bottom-5"><span className="bg-slate-900 absolute -left-10 -top-8 w-[40rem] h-[25rem] blur-2xl opacity-80 -z-30"></span>
              <p className="global-mx text-white">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum cum, nesciunt voluptates recusandae perferendis quod, asperiores minus temporibus est quidem aut assumenda natus.</p>
              </div>
            </div>   
        </div>
      </Slider>
    </div>
  );
}
