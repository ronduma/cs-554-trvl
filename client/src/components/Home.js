import '../App.css';
import { Container, Row, Col } from "react-bootstrap";
import vaction from '../img/Vacation.jpg'
function Home() {
  return (
    <div className="Home">
      <Container
        sx={{
          display:"flex",
          justifyContent:"center",
          alignItems:"center"
        }}
      >
        <Row>
          <Col md={8}>
            <h2>Our Purpose</h2>
            <p>Here you can see all the possible locations.</p>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <h3>Itinerary</h3>
            <p>Check out our Itinerary Section</p>
          </Col>
          <Col md={4}>
            <h3>Community</h3>
            <p>Here you can explain what the community section is about.</p>
          </Col>
          <Col md={4}>
            <h3>Another Section</h3>
            <p>You can add another section here if needed.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
