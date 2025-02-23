import React, { Fragment, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Card from '@mui/material/Card'
import { ThemeProvider } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import NotebookMode from '../../../assets/img/NotebookMode.webp'
import GanttMode from '../../../assets/img/GanttMode.webp'

export default function LabTabs(props) {
  const { theme } = props
  const [value, setValue] = React.useState('1')
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const { top } = cardRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight || document.documentElement.clientHeight
      if (top < windowHeight) {
        setIsVisible(true)
        window.removeEventListener('scroll', handleScroll)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const cardRef = React.useRef()

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Box
          ref={cardRef}
          sx={{
            width: '100%',
            typography: 'body1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0px',
          }}
          id="targetFeature"
        >
          <Typography
            sx={{
              fontSize: '40px',
              letterSpacing: '-1px',
              fontFamily: 'Montserrat',
              fontWeight: 900,
              margin: '0px 0px 40px',
              textAlign: 'center',
              background: 'linear-gradient(151deg, #F4F4F3 1.35%, rgba(244, 244, 243, 0.00) 220.28%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              '@media (max-width:767px)': {
                fontSize: '25px',
                margin: '0px 20px 20px',
                lineHeight: '25px',
              },
            }}
          >
            Two modes can be chosen.
          </Typography>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example" className="tabContainer">
                <Tab
                  className="tab1"
                  label="Gantt"
                  value="1"
                  sx={{
                    width: '50%',
                    bgcolor: `${theme.palette.primary.main}`,
                    textTransform: 'capitalize',
                  }}
                />
                <Tab
                  className="tab2"
                  label="Notebook"
                  value="2"
                  sx={{
                    width: '50%',
                    bgcolor: `${theme.palette.primary.main}`,
                    textTransform: 'capitalize',
                    fontWeight: 500,
                  }}
                />
              </TabList>
            </Box>
            <TabPanel
              value="1"
              sx={{
                width: '80%',
                '@media (max-width:767px)': {
                  width: '100%',
                },
              }}
            >
              <Typography
                color="primary"
                sx={{
                  width: '100%',
                  margin: '0px 0px 20px',
                  fontSize: '22.5px',
                  lineHeight: '35px',
                  fontWeight: 400,
                  textAlign: 'center',
                  letterSpacing: '0.5px',
                  color: 'rgba(200, 200, 200, 0.6)',
                  '@media (max-width:767px)': {
                    fontSize: '14px',
                    lineHeight: '20px',
                  },
                }}
              >
                Using Gantt's presentation, the past learning process can be clearly understood.
              </Typography>
              <Box
                sx={{
                  padding: '7.5px',
                  background: 'rgb(200, 200, 200, 0.05)',
                  borderRadius: '5px',
                }}
              >
                <Card
                  sx={{
                    aspectRatio: '72/45',
                    backgroundImage: isVisible ? `url(${GanttMode})` : 'none',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                  }}
                />
              </Box>
            </TabPanel>
            <TabPanel
              value="2"
              sx={{
                width: '80%',
                '@media (max-width:767px)': {
                  width: '100%',
                },
              }}
            >
              <Typography
                color="primary"
                textAlign={'center'}
                sx={{
                  width: '100%',
                  margin: '0px 0px 20px',
                  fontSize: '22.5px',
                  lineHeight: '35px',
                  fontWeight: 400,
                  textAlign: 'center',
                  letterSpacing: '0.5px',
                  color: 'rgba(200, 200, 200,.6)',
                  '@media (max-width:767px)': {
                    fontSize: '14px',
                    lineHeight: '20px',
                  },
                }}
              >
                Using markdown syntax can make your notes more visually appealing.
              </Typography>
              <Box
                sx={{
                  padding: '7.5px',
                  background: 'rgb(200, 200, 200, 0.05)',
                  borderRadius: '5px',
                }}
              >
                <Card
                  sx={{
                    aspectRatio: '72/45',
                    // backgroundImage: `url(${NotebookMode})`,
                    backgroundImage: isVisible ? `url(${NotebookMode})` : 'none',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                  }}
                />
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
      </ThemeProvider>
      <style>
        {`
            .MuiButtonBase-root.Mui-selected{
              color: ${theme.palette.colorOption.white.solid};
              font-weight: 700;
              background-color: rgb(155, 155, 155, 0.5);
              border: none;
              border-radius: 5px;
              @media (max-width:767px) {
                font-weight: 700;
              }
            }
            .tabContainer {
              border-radius: 5px;
              padding: 5px;
              background-color: rgb(155, 155, 155, 0.5);
              width: 300px;
              @media (max-width:767px) {
                width: 250px;
              }
              @media (max-width:500px) {
                width: 200px;
              }
            }
            .tab1, .tab2 {
              background: none;
              font-weight: 700;
              min-height: 0px;
              height: 38px;
              font-size: 1rem;
              @media (max-width:767px) {
                height: 33px;
                font-weight: 500;
                font-size: 0.9rem;
              }
              @media (max-width:500px) {
                height: 28px;
                font-size: 14px;
              }
            }
            .tab1:hover, .tab2:hover {
              background: rgb(155, 155, 155, 0.2);
              border-radius: 5px;
            }
            .tab1 {
              border-top-left-radius: 5px;
              border-bottom-left-radius: 5px;
            }
            .tab2 {
              border-top-right-radius: 5px;
              border-bottom-right-radius: 5px;
            }
            .MuiTabs-indicator {
              display: none;
            }
            .css-uzjdk6-MuiButtonBase-root-MuiTab-root {
              min-height: 0px;
            }
            .css-1gsv261 {
              border: none;
            }
            .css-orq8zk {
              min-height: 0px;
            }
            .css-1ujnqem-MuiTabs-root{
              min-height: 0px;
            }
        `}
      </style>
    </Fragment>
  )
}
