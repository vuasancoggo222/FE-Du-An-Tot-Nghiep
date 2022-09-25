import React from 'react'
import Footer from '../clients/Footer'

const WebsiteLayout = () => {
  return (
    <>
    <Headers />
    <Content>
      <Outlet />
    </Content>
    <Footer />
  </>
  )
}

export default WebsiteLayout