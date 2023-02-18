
const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className='absolute text-gray-600 bottom-0 text-center pb-1'>
      Developed by Andrés Florez {year}
    </footer>
  )
}

export default Footer
