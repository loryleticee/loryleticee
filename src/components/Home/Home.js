import React from 'react'
import './Home.scss'
import logo from '../../logo.svg'

import { Helmet } from 'react-helmet'

const Home = () => {
  return (
    <>
      <Helmet>
        <script src="https://use.fontawesome.com/f8f0464e24.js"></script>        <link rel='shortcut icon' type='image/x-icon' href='./favicon.ico' />
        <meta charSet='utf-8' />
        <meta name='description' content='Lory LÉTICÉE official website' />
        <meta property='og:site_name' content='Lory LÉTICÉE' />
        <meta property='og:title' content='Lory LÉTICEE' />
        <meta property='og:url' content='http://www.Loryleticee.com' />
        <meta property='og:type' content='website' />
        <meta property='og:image' content={logo} />
        <meta property='og:description' content='The official website of Lory LÉTICÉE.' />
        <meta property='og:image' content={'logo'} />
        <meta itemProp='name' content='Lory LÉTICÉE' />
        <meta itemProp='url' content='http://www.loryleticee.com' />
        <meta itemProp='description' content='The official website of Lory LÉTICÉE' />
        <meta name='twitter:title' content='Lory LETICEE' />
        <meta name='twitter:url' content='https://twitter.com/Loryleticee' />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:description' content='The official website of Lory LÉTICÉE.' />
        <meta name='description' content='The official website of Lory LÉTICÉE.' />
        <link rel='canonical' href='http://www.loryleticee.com' />
      </Helmet>
      <div className='container'>
          <span className='skills'>
            <p>FRONTEND  <i class="fa fa-star-half" aria-hidden="false"></i> </p>
            <p>BACKEND  <i class="fa fa-star" aria-hidden="true"></i> </p>
          </span>
      </div>
      <div className='container-head'>
        <div>
          <p><i class="fa fa-user-circle" aria-hidden="true"></i> M. LORY LÉTICÉE</p>
          <p>Full-stack Developer Junior</p>
        </div>
      </div>
      <div class='extras'>
        <a href="https://www.ayrlomusic.com" target='_blank' rel='noopener noreferrer'><i class="fab fa-adn"></i></a>
      </div>
    </>
  )
}

export default Home