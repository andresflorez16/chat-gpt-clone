
const Avatar = ({ children }) => {
  return (
    <figure className='w-[40px] h-[40px] flex justify-center items-center rounded-sm'>
      {children}
    </figure>
  )
}

export default Avatar
