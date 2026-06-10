(function(){
'use strict';
const C=window.CONTENT,B=window.BETHER; if(!C||!B) return;
const ct=C.contacto;

/* Canales */
const cd=document.getElementById('contactoDirectos');
if(cd) cd.innerHTML=[
  {ic:'💬',label:'WhatsApp',sub:'Respuesta en minutos →',href:B.waLink()},
  {ic:'📸',label:'Instagram',sub:'@'+C.negocio.instagram+' →',href:'https://instagram.com/'+C.negocio.instagram},
  {ic:'✉️',label:'Email',sub:C.negocio.email+' →',href:'mailto:'+C.negocio.email}
].map(d=>`<a class="card contacto-directo" href="${d.href}" target="_blank" rel="noopener">
  <span class="contacto-directo__ic">${d.ic}</span>
  <div><b>${d.label}</b><span>${d.sub}</span></div>
  <span class="contacto-directo__arrow">→</span>
</a>`).join('');

/* Formulario extendido */
const cf=document.getElementById('contactForm');
if(cf){
  const sel=(id,opts,req='')=>`<select id="${id}"${req}><option value="">Elegir...</option>${opts.map(o=>`<option>${o}</option>`).join('')}</select>`;
  cf.innerHTML=`
    <div class="form__row">
      <div><label for="fNombre">Tu nombre *</label><input id="fNombre" type="text" placeholder="Ej: Romina" autocomplete="name" required></div>
      <div><label for="fContacto">WhatsApp / Email *</label><input id="fContacto" type="text" placeholder="Tu WA o mail" required></div>
    </div>
    <div class="form__row">
      <div><label for="fTipo">Tipo de evento *</label>${sel('fTipo',ct.tiposEvento,' required')}</div>
      <div><label for="fTematica">Temática</label><input id="fTematica" type="text" placeholder="Ej: Mario Bros, Frozen…"></div>
    </div>
    <div class="form__row">
      <div><label for="fFecha">Fecha del evento</label><input id="fFecha" type="text" placeholder="Ej: 15 de agosto"></div>
      <div><label for="fPlan">Plan de interés</label>${sel('fPlan',ct.planes)}</div>
    </div>
    <div><label for="fMsg">Contáme más</label><textarea id="fMsg" placeholder="Cantidad de invitados, ideas, lo que imaginás…"></textarea></div>
    <div><label for="fFuente">¿Cómo nos conociste?</label>${sel('fFuente',ct.fuentes)}</div>
    <button class="btn btn--wa" id="formSend" type="button">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.7-.9-2.9-1.6-4-3.5-.3-.5.3-.5.8-1.6.1-.2 0-.3 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2 3 4.8 4.3 1.8.8 2.5.8 3.4.7.5-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3M12 22a10 10 0 0 1-5.2-1.5L3 22l1.5-3.7A10 10 0 1 1 12 22Z"/></svg>
      Enviar consulta
    </button>
    <p class="form__note">Respuesta en menos de 24 horas · Sin compromiso · Datos protegidos</p>`;

  document.getElementById('formSend').addEventListener('click',function(){
    const v=id=>(document.getElementById(id)||{}).value||'';
    const nombre=v('fNombre').trim(), contacto=v('fContacto').trim();
    if(!nombre||!contacto){ alert('Completá tu nombre y contacto para continuar.'); return; }
    let txt='Hola Bether 👋 Quiero pedir presupuesto.\n';
    txt+='• Nombre: '+nombre+'\n';
    txt+='• Contacto: '+contacto+'\n';
    if(v('fTipo'))    txt+='• Evento: '+v('fTipo')+'\n';
    if(v('fTematica'))txt+='• Temática: '+v('fTematica')+'\n';
    if(v('fFecha'))   txt+='• Fecha: '+v('fFecha')+'\n';
    if(v('fPlan')&&v('fPlan')!=='Elegir...') txt+='• Plan: '+v('fPlan')+'\n';
    if(v('fMsg'))     txt+='• Info extra: '+v('fMsg')+'\n';
    if(v('fFuente')&&v('fFuente')!=='Elegir...') txt+='• Cómo nos conoció: '+v('fFuente');
    open(B.waLink(txt),'_blank','noopener');
  });
}
if(window.BETHER.initReveals) window.BETHER.initReveals();
})();
