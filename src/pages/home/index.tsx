import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { Box } from '@mui/system'
import Typography from '@mui/material/Typography'
import { ThemeProvider } from '@mui/material/styles'
import Button from '@mui/material/Button'
import { debounce } from 'lodash'

import WhyReReSection from '../home/component/WhyReReSection'
import Logo from '../../assets/img/logo.jsx'
import FlipCard from '../home/component/FlipCard'
import LabTabs from './component/LabTabs'
import FunctionCard from './component/FunctionCard'
import { handleNewUserData } from '../../firebase'

const MainSection = styled(Box)`
  padding: 100px 0px 50px;
  @media (max-width: 767px) {
    padding: 50px 0px 50px;
  }
`

const KeyVisualSection = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
`

const IntroductionSection = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const Footer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function Home(props) {
  const { theme, isSmallScreenW500 } = props
  const navigate = useNavigate()

  const handleTryOnWebsite = debounce(async () => {
    try {
      const uid = generateRandomString()
      window.localStorage.setItem('uid', uid)
      await handleNewUserData(uid)
      navigate('/application')
    } catch (error) {
      console.error('Login failed', error.message)
      alert('The account or password is wrong, please fill it in again.')
    }
  }, 500)

  function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let randomString = ''
    for (let i = 0; i < 20; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      randomString += characters.charAt(randomIndex)
    }
    return randomString
  }

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <MainSection className="bgTexture">
          <KeyVisualSection>
            <IntroductionSection>
              <Typography
                color="primary"
                sx={{
                  width: '90%',
                  fontSize: '80px',
                  lineHeight: '90px',
                  letterSpacing: '-1px',
                  fontFamily: 'Montserrat',
                  fontWeight: 900,
                  textAlign: 'center',
                  background: 'linear-gradient(151deg, #F4F4F3 1.35%, rgba(244, 244, 243, 0.00) 220.28%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  '@media (max-width:767px)': {
                    fontSize: '40px',
                    lineHeight: '40px',
                  },
                }}
              >
                Record and Review <br />
                your learning
              </Typography>
              <Typography
                color="primary"
                variant="h6"
                sx={{
                  width: '60%',
                  fontSize: '22.5px',
                  lineHeight: '35px',
                  margin: '60px 0px',
                  fontWeight: 400,
                  textAlign: 'center',
                  letterSpacing: '0.5px',
                  color: 'rgba(200, 200, 200,.6)',
                  '@media (max-width:767px)': {
                    width: '80%',
                    fontSize: '14px',
                    lineHeight: '20px',
                    margin: '30px 0px',
                  },
                }}
              >
                "Introducing Re-Re, an application meticulously crafted to aid you in recording and reviewing your study
                notes."
              </Typography>
              <Button
                size="small"
                variant="contained"
                sx={{
                  color: `${theme.palette.secondary.main}`,
                  fontWeight: 700,
                  boxShadow: 'none',
                  border: 'none',
                  transition: 'all 0.1s ease',
                  whiteSpace: 'nowrap',
                  fontSize: isSmallScreenW500 ? '10px' : 'small',
                  margin: '0px 0px 30px',
                }}
                color="primary"
                onClick={handleTryOnWebsite}
              >
                Try on Website
              </Button>
            </IntroductionSection>
            <FlipCard />
          </KeyVisualSection>
          <WhyReReSection />
          <LabTabs theme={theme} />
          <FunctionCard theme={theme} handleTryOnWebsite={handleTryOnWebsite} />
          <Footer
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Logo theme={theme} isSmallScreenW500={isSmallScreenW500} color={'secondary'} height={150} width={276} />
            <Typography
              textAlign={'left'}
              color="primary"
              sx={{
                margin: 'auto',
                fontWeight: 400,
                letterSpacing: '0.5px',
                lineHeight: isSmallScreenW500 ? '20px' : '20px',
                fontSize: '1rem',
                color: 'rgba(200, 200, 200,.6)',
                '@media (max-width:767px)': {
                  marginTop: '10px',
                  fontSize: '14px',
                },
              }}
            >
              © All Rights Reserved.
            </Typography>
          </Footer>
        </MainSection>
      </ThemeProvider>
    </Fragment>
  )
}
