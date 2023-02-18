import { create } from 'zustand'

export const useMessageStore = create((set, get) => ({
  messages: [
    // {
    //   id: 1,
    //   ia: false,
    //   message: 'Explain quantum computing in simple terms'
    // },
    // {
    //   id: 2,
    //   ia: true,
    //   message: 'Quantum computing is a type of computing that uses the principles of quantum mechanics to perform operations. In classical computing, the basic unit of information is a bit, which can be either a 0 or a 1. In quantum computing, the basic unit of information is a quantum bit, or qubit, which can be both a 0 and a 1 at the same time, a phenomenon called superposition.'
    // }
  ],
  error: null,
  sendPrompt: async ({ prompt }) => {
    const iaMessageId = get().messages.length + 1
    set(state => ({
      messages: [
        ...state.messages,
        {
          id: state.messages.length,
          ia: false,
          message: prompt
        },
        {
          id: state.messages.length + 1,
          ia: true,
          message: ''
        }
      ]
    }))

    try {
      if (prompt.length < 1) return
      const response = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ prompt })
      })

      const data = await response.json()

      set(state => ({
        messages: state.messages.map(entry => {
          if (entry.id === iaMessageId) {
            return {
              ...entry,
              message: data.response
            }
          }

          return entry
        })
      }))
    } catch (e) {
      console.error(e)
    }
  }
}))
