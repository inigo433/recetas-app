// src/components/Home.js
import { Carousel } from 'react-bootstrap';

function Home() {
  return (
    <div>
      <h2 className="text-center mb-4">Bienvenido a Recetas App</h2>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./img/img1.png"
            alt="Primera receta"
          />
          <Carousel.Caption>
            <h3>Platos Caseros</h3>
            <p>Recetas fáciles para todos los días</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./img/img2.png"
            alt="Segunda receta"
          />
          <Carousel.Caption>
            <h3>Recetas paso a paso</h3>
            <p>Sigue instrucciones simples y logra resultados deliciosos</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./img/img3.png"
            alt="Tercera receta"
            />
        <Carousel.Caption>
            <h3>Comida Saludable</h3>
            <p>Opciones nutritivas para toda la familia</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Home;