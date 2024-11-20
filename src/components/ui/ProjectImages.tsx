import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Mousewheel, Pagination } from "swiper/modules";

type Props = {
  images: string[];
};

export default function ProjectImagesSlider({ images }: Props) {
  return (
    <Swiper
      direction={"vertical"}
      slidesPerView={1}
      spaceBetween={30}
      mousewheel={true}
      autoplay={true}
      pagination={{
        clickable: true,
      }}
      modules={[Mousewheel, Pagination]}
      className="max-h-full"
    >
      {images.map((el, index) => (
        <div key={index}>
          <SwiperSlide className="">
            <img
              src={el}
              className="w-full h-full object-cover"
              alt="project image"
            />
          </SwiperSlide>
        </div>
      ))}
    </Swiper>
  );
}
