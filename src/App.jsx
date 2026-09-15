import React from 'react'
export default function App(){
  const [v,setV]=React.useState(null)
  const [t,setT]=React.useState('')
  const [r,setR]=React.useState('')
  const i=React.useRef()
  return React.createElement('div',{style:{background:'#0a0a0a',minHeight:'100vh',color:'white',padding:16}},
    React.createElement('h1',{style:{color:'#a855f7',fontSize:28,margin:0}},'MCP STUDIO PREMIERE PRO'),
    React.createElement('p',{style:{color:'#aaa'}},'Editor nivel Premiere - 100% celular'),
    React.createElement('div',{style:{background:'#000',height:200,marginTop:12,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:12}}, v? React.createElement('video',{src:v,controls:true,style:{width:'100%',height:'100%'}}) : 'Sem video - clique em Importar'),
    React.createElement('button',{onClick:()=>i.current.click(),style:{width:'100%',background:'#a855f7',color:'white',border:'none',padding:12,borderRadius:10,marginTop:10}},'📁 Importar Video'),
    React.createElement('input',{ref:i,type:'file',accept:'video/*',onChange:e=>{const f=e.target.files[0]; if(f)setV(URL.createObjectURL(f))},style:{display:'none'}}),
    React.createElement('div',{style:{background:'#1a1a1a',padding:10,borderRadius:8,marginTop:12}},'TIMELINE: '+(v?'Video OK - pronto pra cortar ✂️':'Importe um video')),
    React.createElement('input',{value:t,onChange:e=>setT(e.target.value),placeholder:'Ex: Como fazer corte estilo MrBeast?',style:{width:'100%',padding:12,borderRadius:8,marginTop:14}}),
    React.createElement('button',{onClick:()=>{if(!t){setR('Digite uma pergunta!')}else if(t.toLowerCase().includes('cort')){setR('CORTAR: Importa > play > pausa > Cortar!')}else{setR('AGENTE: '+t)}},style:{width:'100%',background:'#a855f7',color:'white',border:'none',padding:12,borderRadius:10,marginTop:8}},'Perguntar ao Agente'),
    React.createElement('div',{style:{background:'#1a1a1a',padding:10,borderRadius:8,marginTop:8}},r||'Resposta do agente aqui...')
  )
}
