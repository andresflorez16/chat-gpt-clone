import useTypingEffect from '@/hooks/useTypingEffect'

const TypingEffect = ({ text }) => {
  const { displayText, showCursor } = useTypingEffect({ text })

  return (
    <span className={`${showCursor ? 'after:content-["▋"] after:ml-1 after:animate-typing' : ''}`}>
      {displayText}
    </span>
  )
}

export default TypingEffect
