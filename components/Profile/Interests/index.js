import Link from 'next/link';
import Slider from 'react-slick';

import PropTypes from 'prop-types';

// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

import styles from './styles';

export default function Carousel({ data }) {
	const classes = styles();
	let validData = true;

	if (data.length < 6) {
		validData = false;
	}

	const settings = {
		dots: true,
		infinite: validData,
		slidesToShow: 5,
		slidesToScroll: 1,
		arrows: false,
		speed: 500,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 737,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 668,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					initialSlide: 2,
					centerPadding: '30px'
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					centerPadding: '30px'
				}
			}
		]
	};

	if (data.length === 0) {
		return (
			<section>
				<p className="text">No interest registered</p>
			</section>
		);
	}

	return (
		<div className={classes.slide}>
			<Slider {...settings}>
				{data.map(item => (
					<div className={classes.item} key={item.id}>
						<Link href={`/category/${item.id}`}>
							<>
								<div className={classes.imageContainer}>
									<img
										src={process.env.REACT_APP_IMAGES_BASE + item.images[0].thumb_image_path}
										alt={item.name}
									/>
								</div>
								{item.name}
							</>
						</Link>
					</div>
				))}
			</Slider>
		</div>
	);
}

Carousel.propTypes = {
	data: PropTypes.arrayOf.isRequired
};
