import Head from 'next/head'
import Footer from './footer'

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>ChatGPT clone by Andrés Florez</title>
        <meta name='description' content='Generate a ChatGPT clone with OpenIA' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>

      <main className='w-screen h-screen flex flex-col justify-start items-center bg-gptgray'>
        {children}
        <Footer />
      </main>
    </>
  )
}

export default Layout
