(()=>{'use strict';const KEY='moonlit-pebbles-hole-v1',$=id=>document.getElementById(id);let state={entries:[]};try{const s=JSON.parse(localStorage.getItem(KEY));if(s&&Array.isArray(s.entries)&&s.entries.every(x=>typeof x==='string'))state=s}catch{$('status').textContent='保存した言葉を読み込めませんでした。';$('throw').disabled=true}
function write(next){localStorage.setItem(KEY,JSON.stringify(next));state=next}
function hide(){$('entries').replaceChildren();$('entries').hidden=true;$('hide').hidden=true;$('reveal').hidden=false}
function render(){hide();$('marker').textContent=state.entries.length?'言葉は土の下にあります。':'まだ何も置いていません。'}
$('throw').onclick=()=>{const text=$('words').value;if(!text.trim())return;try{write({...state,entries:[...state.entries,text],draft:''});$('words').value='';render();$('status').textContent='置きました。'}catch{$('status').textContent='保存できませんでした。言葉は入力欄に残っています。'}};
$('reveal').onclick=()=>{$('entries').replaceChildren();for(const text of state.entries){const p=document.createElement('p');p.textContent=text;$('entries').append(p)}$('entries').hidden=false;$('hide').hidden=false;$('reveal').hidden=true};$('hide').onclick=()=>{hide();$('reveal').focus()};
$('words').value=state.draft||'';
$('words').oninput=()=>{try{write({...state,draft:$('words').value});$('status').textContent=''}catch{$('status').textContent='書きかけを保存できませんでした。'}};
$('fill').onclick=()=>{$('resetStatus').textContent='';$('confirm').showModal()};
function closeConfirm(){$('confirm').close();$('fill').focus()}
$('cancel').onclick=closeConfirm;$('confirm').addEventListener('cancel',e=>{e.preventDefault();closeConfirm()});
$('confirmFill').onclick=()=>{try{write({entries:[],draft:''});$('words').value='';render();closeConfirm();$('status').textContent='穴を埋めました。'}catch{$('resetStatus').textContent='保存できませんでした。言葉は消していません。'}};
render();})();
