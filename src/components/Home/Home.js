import React from 'react'
import './Home.scss'
//import logo from '../../../images/logo.svg'

import { Helmet } from 'react-helmet'

//import Index from '../../services/index'

const Home = () => {
  return (
    <>
      <Helmet>
        <link rel='shortcut icon' type='image/x-icon' href='dee/favicon.ico' />
        <meta charSet='utf-8' />
        <meta name='description' content='Lory LETICEE official website' />
        <meta property='og:site_name' content='Lory LETICEE' />
        <meta property='og:title' content='Lory LETICEE' />
        <meta property='og:url' content='https://www.Loryleticee.com' />
        <meta property='og:type' content='website' />
        <meta property='og:description' content='The official website of Lory LETICEE.' />
        <meta property='og:image' content={'logo'} />
        <meta itemProp='name' content='Lory LETICEE' />
        <meta itemProp='url' content='https://www.loryleticee.com' />
        <meta itemProp='description' content='The official website of Lory LETICEE' />
        <meta name='twitter:title' content='Lory LETICEE' />
        <meta name='twitter:url' content='https://twitter.com/Lory LETICEE_' />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:description' content='The official website of Lory LETICEE.' />
        <meta name='description' content='The official website of Lory LETICEE.' />
        <title>Lory LETICEE </title>
        <link rel='canonical' href='https://www.loryleticee.com' />
      </Helmet>
      
    </>
  )
}

export default Home