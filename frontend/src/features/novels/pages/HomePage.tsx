import { Container, Button, Card, Row, Col, Form } from 'react-bootstrap'

export const HomePage = () => {
  return (
    <>
      <Container>
        <Row className="gy-4">
          <Col md={8}>
            <Card>
              <Card.Body>
                <Card.Title>Welcome</Card.Title>
                <Card.Text>
                  This is a simple React Bootstrap interface using components from react-bootstrap.
                </Card.Text>
                <Button variant="primary">Get Started</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Newsletter</Card.Title>
                <Form>
                  <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>
                  <Button type="submit" variant="success">
                    Subscribe
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default HomePage
