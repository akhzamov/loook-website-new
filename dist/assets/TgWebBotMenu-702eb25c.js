import{ac as _,o as g,c as f,a3 as y,a as o}from"./index-e25d5155.js";const B=o("h1",null,"Определение филиала",-1),E=o("p",null,"Кликните на карту, чтобы определить ваше местоположение.",-1),k=o("div",{id:"map",style:{height:"400px"}},null,-1),q={__name:"TgWebBotMenu",setup(x){const h=[{name:"Филиал 1",lat:55.751244,lng:37.618423},{name:"Филиал 2",lat:55.755814,lng:37.617635}];function u(t){let a=null,c=Number.MAX_VALUE;h.forEach(n=>{const e=m(t,{lat:n.lat,lng:n.lng});e<c&&(c=e,a=n)}),console.log("Ближайший филиал:",a)}function m(t,a){const n=s(t.lat),e=s(t.lng),l=s(a.lat),p=s(a.lng),i=l-n,r=p-e,d=Math.sin(i/2)*Math.sin(i/2)+Math.cos(n)*Math.cos(l)*Math.sin(r/2)*Math.sin(r/2);return 6371*(2*Math.atan2(Math.sqrt(d),Math.sqrt(1-d)))}function s(t){return t*(Math.PI/180)}async function M(){await ymaps3.ready;const{YMap:t,YMapDefaultSchemeLayer:a}=ymaps3;new t(document.getElementById("map"),{location:{center:[37.588144,55.733842],zoom:10}}).events.add("click",n=>{const e=n.get("coords");u({lat:e[0],lng:e[1]})})}return _(()=>{M()}),(t,a)=>(g(),f(y,null,[B,E,k],64))}};export{q as default};
