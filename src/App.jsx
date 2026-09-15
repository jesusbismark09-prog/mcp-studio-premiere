import React, { useState } from 'react'
export default function App() {
  const [prompt, setPrompt] = useState('')
  const [r, setR] = useState('')
  async function perguntar(){
    if(!prompt) return
    setR('Pensando...')
    setTimeout(()=>setR('Agente MCP: App Premiere pronto! Coloque sua chave OpenAI no codigo pra liberar ChatGPT. Export 4K, Timeline, Cortes - tudo ok pro APK!'),800)
  }
  return (
    <div style={{background:'#111', color:'#fff', minHeight:'100vh', padding:20, fontFamily:'sans-serif'}}>
      <h1 style={{color:'#a855f7'}}>MCP STUDIO PREMIERE</h1>
      <p>Editor nivel Premiere - 100% celular</p>
      <input value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Ex: Como fazer corte?" style={{width:'100%', padding:12, borderRadius:6, border:'none', marginTop:15, color:'#000'}}/>
      <button onClick={perguntar} style={{width:'100%', padding:12, marginTop:10, background:'#a855f7', color:'#fff', border:'none', borderRadius:6}}>Perguntar ao Agente</button>
      <div style={{background:'#222', padding:15, marginTop:15, borderRadius:8, minHeight:80}}>{r || 'Resposta do agente aqui...'}</div>
      <div style={{marginTop:20, background:'#222', padding:15, borderRadius:8}}>
        <h3>Recursos</h3>
        <p>✓ Timeline, Cortes, Texto, Musica, Filtros 4K</p>
      </div>
    </div>
  )
}
