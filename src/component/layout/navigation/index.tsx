import React, { Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Link as MuiLink } from '@mui/material'
import { Box } from '@mui/system'
import { ThemeProvider, Theme } from '@mui/material/styles'
import Logo from '../../../assets/img/logo'
import IconButton from '@mui/material/IconButton'
import { LinkButton } from '../../common/Button'
import { handleNewUserData } from '../../../firebase'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MenuIcon from '@mui/icons-material/Menu'
import { useLocation } from 'react-router-dom'
import { debounce } from 'lodash'

interface NavigationProps {
  theme: Theme;
  isSmallScreenW500: boolean;
  isSmallScreenW767: boolean;
}

export default function Navigation(props: NavigationProps) {
  const { theme, isSmallScreenW500 } = props

  const location = useLocation()
  const currentPath = location.pathname
  const isLoginPath = currentPath.includes('login')

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

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

  const generateRandomString = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let randomString = ''

    for (let i = 0; i < 20; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      randomString += characters.charAt(randomIndex)
    }

    return randomString
  }

  const handleSectionScroll = async (target, offset) => {
    if (isLoginPath) {
      await navigate('/')
      const targetElement = document.getElementById(target)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop + offset,
          behavior: 'smooth',
        })
      }
    }
    const targetElement = document.getElementById(target)
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop + offset,
        behavior: 'smooth',
      })
    }
  }

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Box
          className="bgTexture"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'white',
            padding: '15px 40px',
            backdropFilter: 'blur(100px)',
            '@media (max-width:767px)': {
              padding: '7.5px 15px',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '30px',
              '@media (max-width:500px)': {
                gap: '10px',
              },
            }}
          >
            <Link
              to="/"
              color="secondary"
              style={{
                color: 'white',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <IconButton
                sx={{
                  '&:hover': {
                    opacity: 0.9,
                  },
                }}
              >
                <Logo theme={theme} isSmallScreenW500={isSmallScreenW500} color={'primary'} height={183} width={237} />
              </IconButton>
            </Link>
            {isSmallScreenW500 ? null : (
              <Box
                sx={{
                  marginTop: '2.5px',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '30px',
                  '@media (max-width:767px)': {
                    gap: '20px',
                    marginTop: '7px',
                  },
                }}
              >
                <MuiLink
                  sx={{
                    fontSize: '14px',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    letterSpacing: '0.5px',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                    '@media (max-width:500px)': {
                      fontSize: '12px',
                    },
                  }}
                  onClick={() => handleSectionScroll('targetWhy', -30)}
                >
                  Why Re-Re ?
                </MuiLink>
                <MuiLink
                  sx={{
                    fontSize: '14px',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    letterSpacing: '0.5px',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                    '@media (max-width:500px)': {
                      fontSize: '12px',
                    },
                  }}
                  onClick={() => handleSectionScroll('targetFeature', -30)}
                >
                  Features
                </MuiLink>
              </Box>
            )}
          </Box>
          {isSmallScreenW500 ? null : (
            <Box
              sx={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                paddingTop: '5px',
                background: 'none',
              }}
            >
              <LinkButton to="/login" isSmall500={isSmallScreenW500} theme={theme}>
                Log In
              </LinkButton>
              <Button
                size="small"
                variant="contained"
                sx={{
                  letterSpacing: '0.5px',
                  color: `${theme.palette.secondary.main}`,
                  fontWeight: 700,
                  boxShadow: 'none',
                  border: 'none',
                  transition: 'all 0.1s ease',
                  whiteSpace: 'nowrap',
                  fontSize: '10px',
                  '@media (max-width:500px)': {
                    fontSize: '8px',
                  },
                }}
                color="primary"
                onClick={handleTryOnWebsite}
              >
                Try on Website
              </Button>
            </Box>
          )}
          {isSmallScreenW500 ? (
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                startIcon={<MenuIcon />}
                sx={{ minWidth: '0px', padding: '0px 8px 2px' }}
              ></Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleSectionScroll('targetWhy', -30)
                    handleClose()
                  }}
                >
                  Why Re-Re ?
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleSectionScroll('targetFeature', -30)
                    handleClose()
                  }}
                >
                  Features
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate('/login')
                    handleClose()
                  }}
                >
                  Log In
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleTryOnWebsite()
                    handleClose()
                  }}
                >
                  Try on Website
                </MenuItem>
              </Menu>
              <style>
                {`
                    .css-1d6wzja-MuiButton-startIcon>*:nth-of-type(1) {
                        font-size: 30px;
                    }
                    .css-1d6wzja-MuiButton-startIcon {
                        margin: 0px;
                        margin: 5px 0px 0px;
                    }
                `}
              </style>
            </div>
          ) : null}
        </Box>
      </ThemeProvider>
    </Fragment>
  )
}
