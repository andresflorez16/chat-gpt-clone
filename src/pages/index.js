import { useRef } from 'react'
import { useMessageStore } from '@/store/store'
import Chat from '@/components/chat'
import Layout from '@/components/layout'
import { SendIcon } from '@/components/icons'

function ChatForm() {
  const sendPrompt = useMessageStore(state => state.sendPrompt)
  const textAreaRef = useRef()

  const handleSubmit = (e) => {
    e?.preventDefault()
    const { value } = textAreaRef.current
    if (value.length < 1) return
    sendPrompt({ prompt: value })
    textAreaRef.current.value = ''
  }

  const handleChange = () => {
    const el = textAreaRef.current

    const scrollHeight = el.scrollHeight
    el.style.height = scrollHeight + 'px'
  }

  const handleKeyDown = (e) => {
    const text = textAreaRef.current.value
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      text.length > 0 && handleSubmit()
    }
  }

  return (
    <section className='absolute bottom-0 w-full mb-10'>
      <form
        onKeyDown={handleKeyDown}
        onSubmit={handleSubmit}
        className='flex max-w-3xl w-4/5 md:w-1/2 m-auto pt-6'
      >
        <div className='relative flex flex-col flex-grow w-full px-4 py-3 text-gray-100 border rounded-sm shadow-lg bg-gptlightgray border-gray-900/50'>
          <textarea
            onChange={handleChange}
            rows={1}
            tabIndex={0}
            defaultValue=''
            autoFocus
            ref={textAreaRef}
            className='w-full h-[24px] bg-transparent resize-none m-0 border-0 outline-none'
          />
          <button className='absolute p-1 rounded-md bottom-2.5 right-2.5 hover:bg-gptgray'><SendIcon /></button>
        </div>
      </form>
    </section>
  )
}

export default function Home() {
  return (
    <Layout>
      <Chat />
      <ChatForm />
    </Layout>
  )
}
