import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import { ArrowRightCircle } from 'react-bootstrap-icons';
import morochoHeader from "../assets/img/morochoHeader.png";


export const Banner = () => {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const toRotate = ["Desarrollador Web", "Diseñador Web", "Realizador multimedial"];
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    const period = 2000;

    // Definir `tick` usando `useCallback` para que su referencia sea estable
    const tick = useCallback(() => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        let prevDelta = delta;

        if (isDeleting) {
            prevDelta = prevDelta / 2;
            setDelta(prevDelta);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(period);
        } else if (isDeleting && updatedText === "") {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(150);
        }
    }, [delta, isDeleting, loopNum, period, text, toRotate]);

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => clearInterval(ticker);
    }, [delta, tick]); // Incluir `delta` y `tick` en las dependencias

    return (
        <section>
            <Container className='banner' id='home'>
                <Row className='align-items-center'>
                    <Col xs={12} md={6} xl={7}>
                        <span className='tagline'>Bienvenido a mi Portfolio</span>
                        <h1>{`Hola, Soy Camilo `}<br />
                            <span className='wrap'>{text}</span></h1>
                        <p>Hola, soy Camilo, soy Realizador Multimedial y Desarrollador Web Full Stack.<br></br>Grafico: Paquete de Adobe, 3DMax, Corel.<br></br>Desarrollo Web: HTML, CSS, JavaScript, Bootstrap, Git, Github, Scrum, React, Tailwind, Next.js, NestJs, Node.js.</p>
                        <button onClick={() => console.log('connect')}>
                            Contactémonos <ArrowRightCircle size={25} />
                        </button>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <img src={morochoHeader} alt='Header image.' />
                    </Col>
                </Row>
            </Container>
        </section>
    );
}