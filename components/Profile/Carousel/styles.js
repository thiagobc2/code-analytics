import styled from 'styled-components';

export const Slide = styled.div`
  width: 100%;
  float: left;
  .slick-next,
  .slick-prev {
    right: 9px;
    top: 50%;
    z-index: 999;
    background: #FFF;
    height: 40px;
    width: 40px;
    border-radius: 50px;
  }
  .slick-prev {
    left: 9px;
  }
  .slick-next:before,
  .slick-prev:before {
    content: '>';
    font-size: 3.2rem;
    font-family: 'Trebuchet MS', sans-serif;
    opacity: 1 !important;
    color: #000;
  }
  .slick-prev:before {
    content: '<';
  }
  .slick-track {
    margin-left: 0;
    margin-right: 0;
  }
  @media (max-width: 1023px) {
    .slick-next,
    .slick-prev {
      top: -30px;
      height: 32px;
      width: 32px;
    }
    .slick-prev {
      left: 90%;
    }
    .slick-next {
      right: 0;
    }
    .slick-next: before, .slick-prev: before {
      font-size: 2.6rem;
    }
  }
  @media (max-width: 737px) {
    .slick-prev {
      left: 85%;
    }
  }
  @media (max-width: 568px) {
    .slick-prev {
      left: 82.5%;
    }
  }
  @media (max-width: 414px) {
    .slick-prev {
      left: 75%;
    }
  }
`;

export const Content = styled.div`
	text-align: center;
	outline: 0;

	img {
		display: initial;
		max-height: 500px;
		height: 100%;
	}
`;
