import Slider from 'react-slick';

import PropTypes from 'prop-types';

// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

import { Slide, Content } from './styles';

export default function Carousel({ data }) {
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		initialSlide: 0
	};

	return (
		<Slide>
			<Slider {...settings}>
				{data.map(image => (
					<Content key={image.id}>
						<img src={process.env.REACT_APP_IMAGES_BASE + image.main_image_path} alt="" />
					</Content>
				))}
			</Slider>
		</Slide>
	);
}

Carousel.propTypes = {
	data: PropTypes.arrayOf().isRequired
};
