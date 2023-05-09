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
          <Col md={8} maxWidth="10px">
            <h2>Our Purpose</h2>
            <p>Every Holiday Season, planning a vacation getaway seems more and more stressful. Therefore, TRVL is a web application that enables users to plan their domestic trips with ease. With its itinerary feature, users can create personalized trip schedules and explore different locations such as cities, beaches, and monuments. With TRVL, planning a domestic trip has never been easier. Users can enjoy the benefits of an organized and personalized trip itinerary that covers all their interests while also being part of a vibrant travel community. This community includes being able to interact with other travelers and see all the different vacation plans.
</p>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <h3>Itinerary</h3>
            <p>Check out our itinerary section, here you can see bunch of things you can do in a certain location. Simply search for a domestic city, pick a catergorie, a price range of your choosing, and explore! You'll find an array of things to do and click to add to itinerary if you want to save it to your profile so you't ever forget. If you don't know what you want to do or have a hard time to decide, let us help you. Click the randomize lucky button and be given a suggest itinerary for you!</p>
          </Col>
          <Col md={4}>
            <h3>Community</h3>
            <p>Sometimes you can find small gems and wonders in the city that you just have to hear about. The community aspect of TRVL let's you hear from others on their findings, they can be people like you trying to find a new place to eat or a local that's been going there for years. Either way, this is a chance to discover what is out there in the city for you to try. If you create an account, you'll also be allowed to like and comment on the posts in the community.</p>
          </Col>
          <Col md={4}>
            <h3>Profile</h3>
            <p>Make an account to save your itineraries and liked posts so you will never have forgotten them. Don't even think about forgetting to skip on uploading a profile picture, png type only. Show off what you want to do! </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
