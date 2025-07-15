import React from 'react'
import Layout from '../../components/Layout'
import Intro from './intro'
import MarketingStrategies from './marketingStrategies'
import Why from './why'
function Home() {
  return (
    <Layout>
      <div className='px-32'>
        <Intro />
        <MarketingStrategies />
        <Why/>
      </div>  
    </Layout>
  )
}

export default Home