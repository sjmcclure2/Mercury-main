import React from 'react'
import Box from '@mui/material/Box'
import Container from './common/Container'
import {
  Features,
  Footer,
  Hero,
  Highlights,
  Headline,
  Content,
  FutureFeatures,
  Team,
} from './components'

const Home = () => {
  return (
    <Box sx={{ paddingTop: '5vh' }}>
      <Box>
        <Container>
          <Hero />
        </Container>
      </Box>
      <Container>
        <Highlights />
      </Container>
      <Container>
        <Team />
      </Container>
      <Container>
        <Features />
      </Container>
      <Container>
        <FutureFeatures />
      </Container>
      <Box>
        <Box>
          <Container>
            <Headline />
          </Container>
        </Box>
        <Container maxWidth={800}>
          <Content />
        </Container>
      </Box>
      <Container>
        <Footer />
      </Container>
    </Box>
  )
}

export default Home
