import React from 'react'
import Layout from '../../components/Layout'
import Introstart from './intro'
import Cl from './clientslist'
import Numbers from './numbers'

function Clients() {
  return (
    <Layout>
    <Introstart/>
    <Cl/>
    <Numbers/>
    </Layout>
  
  )
}

export default Clients
