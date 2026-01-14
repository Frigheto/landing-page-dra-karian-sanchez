// JS inicial: captura do envio do formulário e abre WhatsApp com dados
document.addEventListener('DOMContentLoaded',()=>{
  const form=document.getElementById('formContato');
  if(!form) return;
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const dados=new FormData(form);
    const nome=dados.get('nome')||'';
    const tel=dados.get('telefone')||'';
    const msg=encodeURIComponent(`Olá, meu nome é ${nome}. Meu telefone: ${tel}. Gostaria de agendar uma consulta.`);
    const waNumber='5555999999999'; // substitua pelo WhatsApp real
    window.open(`https://wa.me/${waNumber}?text=${msg}`, '_blank');
  });
});
