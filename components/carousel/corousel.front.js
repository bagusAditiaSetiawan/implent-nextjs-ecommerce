import Carousel from 'react-bootstrap/Carousel';
import styles from "./../../styles/front-layout/style.module.css";

function CarouselFront() {
    const sliders = [
        {
            id: 1,
            title: '',
            description: 'dapatkan banyak cashback dari kami',
            image_url: 'https://accurate.id/wp-content/uploads/2021/01/accurate.id-Cashback-adalah-Pengertian-dan-Dampaknya-dalam-Strategi-Marketing.png',
        },
        {
            id: 2,
            title: '',
            description: '',
            image_url: 'https://pintarjualan.id/wp-content/uploads/2021/03/jasa-kurir-terbaik-murah-cepat.png',
        },
    ];
    return (
        <Carousel className={styles.carouselFront}>
            {sliders.map((slider) => (
                <Carousel.Item key={slider.id}>
                    <img
                        className="d-block w-100"
                        src={slider.image_url}
                        alt={slider.title}
                    />
                    <Carousel.Caption>
                        <h3>{slider.title}</h3>
                        <p>{slider.description}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default CarouselFront;