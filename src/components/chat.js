import { useMessageStore } from '@/store/store'
import Avatar from './avatar'
import { ChatGPTLogo } from './icons'
import TypingEffect from './typing-effect'

const UserAvatar = () => {
  return (
    <img className='w-full h-full rounded-sm' src='https://i.pinimg.com/736x/ff/5f/34/ff5f34df3999ac55e6e3151cabbb76a6.jpg' alt='Human' />
  )
}

const Message = ({ message, ia }) => {
  const background = ia ? 'bg-gptlightgray rounded-sm' : 'bg-gptgray'
  const avatarImg = ia ? <ChatGPTLogo /> : <UserAvatar />
  const textElement = ia ? <TypingEffect text={message} /> : message

  return (
    <div className={`${background}`}>
      <article className='flex gap-3 p-4 m-auto max-w-3xl'>
        <Avatar>
          {avatarImg}
        </Avatar>
        <div className='flex flex-1 flex-col items-start gap-4 whitespace-pre-wrap'>
          <div className='break-words w-full'>
            <p>{textElement}</p>
          </div>
        </div>
      </article>
    </div>
  )
}

function Chat() {
  const messages = useMessageStore(state => state.messages)

  return (
    <div className='w-4/5 md:w-1/2 max-h-[78vh] text-gray-100 mt-10'>
      <section className='flex flex-col gap-10 h-full overflow-auto'>
        {
          messages.length > 0
            ? (
                messages.map(({ id, message, ia }) => (
                  <Message key={id} message={message} ia={ia} />
                ))
              )
            : (
              <div>
                <p>"Resuelve el siguiente problema..."</p>
                <p>"Explain quantum computing in simple terms..."</p>
                <p>"¿Cómo hacer un sanchoco de gallina...?"</p>
                <p>"Dame una regex para quitar los saltos de línea al inicio de un string en Javascript..."</p>
                <p>"¿Qué tomar para el dolor de cabeza...?"</p>
              </div>
              )
        }
      </section>
    </div>
  )
}

export default Chat
