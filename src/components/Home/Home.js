import React from 'react'
import './Home.scss'
import logo from '../../images/loryleticee.png'

import { Helmet } from 'react-helmet'

const Home = () => {
  return (
    <>
      <Helmet>
        <link rel='shortcut icon' type='image/x-icon' href='./favicon.ico' />
        <meta charSet='utf-8' />
        <meta name='description' content='Lory LETICEE official website' />
        <meta property='og:site_name' content='Lory LETICEE' />
        <meta property='og:title' content='Lory LETICEE' />
        <meta property='og:url' content='http://www.Loryleticee.com' />
        <meta property='og:type' content='website' />
        <meta property='og:image' content={logo} />
        <meta property='og:description' content='The official website of Lory LETICEE.' />
        <meta property='og:image' content={'logo'} />
        <meta itemProp='name' content='Lory LETICEE' />
        <meta itemProp='url' content='http://www.loryleticee.com' />
        <meta itemProp='description' content='The official website of Lory LETICEE' />
        <meta name='twitter:title' content='Lory LETICEE' />
        <meta name='twitter:url' content='https://twitter.com/Loryleticee' />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:description' content='The official website of Lory LETICEE.' />
        <meta name='description' content='The official website of Lory LETICEE.' />
        <title>Lory LETICEE</title>
        <link rel='canonical' href='http://www.loryleticee.com' />
      </Helmet>
      <div className='container'>
        <div>
          <p>M. LORY LETICEE</p>
          <p>Full-stack Developper Junior</p>
        </div>
      </div>
    </>
  )
}

export default Home