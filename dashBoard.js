/*<defs>
<path transform="scale(0.97)" id="myArcTop" d="M-500,0 a500,500 0 1,1 1000,0"/>
<path  transform="scale(1.13)" id="myArcBottom" d="M-500,0 a500,500 0 1,0 1000,0"/>
</defs>

<g id="autoKnop" transform="translate(2500, 1750)" style="filter:url(#3d)">
<g id="wrapper">
<circle cx='0' cy='0' r='400' fill="rgb(150 150 150)" stroke-width='5' cursor="pointer" stroke="maroon"/>
<path id="arcTop" d="M-600,0 l 150 0 a450,450 0 1,1 900,0 l 150 0 a600,600  0 1,0 -1200 0" fill="white" stroke="white" stroke-width="10"  />
<path id="arcBottom" d="M-600,0 l 150 0 a450,450 0 1,0 900,0 l 150 0 a600,600  0 1,1 -1200 0" fill="white" stroke="white" stroke-width="10"  />
<text font-size="150" fill="black"><textPath side="right" startOffset="350" href="#myArcTop">Automatisch</textPath></text>
<text transform="rotate(180)" font-size="150" fill="black"><textPath startOffset="150" href="#myArcTop">Drukknop bediening</textPath></text>
</g>
</g>
*/
function createCanvas(svgParent,name,x,y,scale) {
  let svgCanvas = document.createElementNS('http://www.w3.org/2000/svg','svg');
  let id = 'svgCanvas_' + name;
  let xx = x.toString();
  let yy = y.toString();
  let width = (800*scale).toString();
  let height = (400*scale).toString();
  svgCanvas.setAttributeNS(null,'id',id);
  svgCanvas.setAttributeNS(null,'x',xx);
  svgCanvas.setAttributeNS(null,'y',yy);
  svgCanvas.setAttributeNS(null,'width',width);
  svgCanvas.setAttributeNS(null,'height',height);
  svgCanvas.setAttributeNS(null,"viewBox","0 0 8000 4000");
  let rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
  rect.setAttributeNS(null,'x','10');
  rect.setAttributeNS(null,'y','10');
  rect.setAttributeNS(null,'width','3980');
  rect.setAttributeNS(null,'height','3980');
  rect.setAttributeNS(null,'opacity','0%');
  rect.setAttributeNS(null,'stroke','rgb(255 0 0)');
  rect.setAttributeNS(null,'stroke-width','10');
  svgCanvas.appendChild(rect);
  let defs = document.createElementNS('http://www.w3.org/2000/svg','defs');
  let myArcTop = document.createElementNS('http://www.w3.org/2000/svg','path');
  let myArcBottom = document.createElementNS('http://www.w3.org/2000/svg','path');
  myArcTop.setAttributeNS(null,'id','myArcTop_' + name);
  myArcTop.setAttributeNS(null,'transform','scale(0.97)');
  myArcTop.setAttributeNS(null,'d','M-1000,0 a1000,1000 0 1,1 2000,0');
  myArcBottom.setAttributeNS(null,'id','myArcBottom_' + name);
  myArcBottom.setAttributeNS(null,'transform','scale(1.13)');
  myArcBottom.setAttributeNS(null,'d','M-1000,0 a1000,1000 0 1,0 2000,0');
  defs.appendChild(myArcTop);
  defs.appendChild(myArcBottom);
  svgCanvas.appendChild(defs);
  svgParent.appendChild(svgCanvas);
}
function createAanUitGroep(name) {
  let aanUitGroep = document.createElementNS('http://www.w3.org/2000/svg','g');
  let id = 'aanUitGroep_' + name;
  aanUitGroep.setAttributeNS(null,'id',id);
  aanUitGroep.setAttributeNS(null,'transform','translate(2500 2000)');
  let aanUitKnop = document.createElementNS('http://www.w3.org/2000/svg','circle');
  let aanUitSocket = document.createElementNS('http://www.w3.org/2000/svg','circle');
  aanUitSocket.setAttributeNS(null,'x','1500');
  aanUitSocket.setAttributeNS(null,'y','-900');
  aanUitSocket.setAttributeNS(null,'r','200');
  aanUitSocket.setAttributeNS(null,'fill','white');
  aanUitKnop.setAttributeNS(null,'id','aanUitKnop_' + name);
  aanUitKnop.setAttributeNS(null,'x','1500');
  aanUitKnop.setAttributeNS(null,'y','-900');
  aanUitKnop.setAttributeNS(null,'r','160');
  aanUitKnop.setAttributeNS(null,'fill','rgb(255 0 0)');
  //aanUitKnop.setAttributeNS(null,'cursor','url(moerZijde.svg)');
  aanUitGroep.appendChild(aanUitSocket);
  aanUitGroep.appendChild(aanUitKnop);
  document.getElementById('svgCanvas_' + name).appendChild(aanUitGroep);
}
function createFrame(name) {
  let id = 'frame_' + name;
  let frame = document.createElementNS('http://www.w3.org/2000/svg','path');
  frame.setAttributeNS(null,'id',id);
  frame.setAttributeNS(null,'d',"M 0,1400 a1400,1400 0 1,1 0,-2800 h 3000 a1400,1400 0 1 1 0 2800z");
  frame.setAttributeNS(null,'fill','none');
  frame.setAttributeNS(null,'stroke','rgb(255 0 0)');
  frame.setAttributeNS(null,'stroke-width',"50");
  frame.setAttributeNS(null,'transform','translate(2500 2000)');
  document.getElementById('svgCanvas_' + name).appendChild(frame);
}
function createVolumeKnop(name) {
  let id = 'wijzerPlaat_' + name;
  let wijzerPlaat = document.createElementNS('http://www.w3.org/2000/svg','g');
  wijzerPlaat.setAttributeNS(null,'id',id);
  wijzerPlaat.setAttributeNS(null,'transform','translate(2500, 2000)');
  let knop = document.createElementNS('http://www.w3.org/2000/svg','g');
  knop.setAttributeNS(null,'id','volumeKnop_' + name);
  knop.setAttributeNS(null,'drag','false'); //
  knop.setAttributeNS(null,'transform','rotate(-180)');
  let circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
  circle.setAttributeNS(null,'id','draaiKnop_' + name);
  circle.setAttributeNS(null,'cx','0');
  circle.setAttributeNS(null,'cy','0');
  circle.setAttributeNS(null,'r','800');
  circle.setAttributeNS(null,'fill','rgb(150 150 150)');
  circle.setAttributeNS(null,'cursor','pointer');
  circle.setAttributeNS(null,'stroke-width','5');
  circle.setAttributeNS(null,'stroke','maroon');
  let rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
  rect.setAttributeNS(null,'id','piefje_' + name);
  rect.setAttributeNS(null,'drag','false'); //
  rect.setAttributeNS(null,'x','-30');
  rect.setAttributeNS(null,'y','-700');
  rect.setAttributeNS(null,'width','60');
  rect.setAttributeNS(null,'height','360');
  rect.setAttributeNS(null,'fill','white');
  rect.setAttributeNS(null,'cursor','pointer');
  let arc = document.createElementNS('http://www.w3.org/2000/svg','path');
  arc.setAttributeNS(null,'id','neonLight_' + name);
  arc.setAttributeNS(null,'d','M-649.5,375 a750,750 0 1,1 1299,0');
  arc.setAttributeNS(null,'fill','none');
  arc.setAttributeNS(null,'stroke','rgb(255 0 0)');
  arc.setAttributeNS(null,'stroke-width','50');
  let arcTop = document.createElementNS('http://www.w3.org/2000/svg','path');
  arcTop.setAttributeNS(null,'id','arcTop_' + name)
  arcTop.setAttributeNS(null,'d',"M-1200,0 l 300 0 a900,900 0 1,1 1800,0 l 300 0 a1200,1200  0 1,0 -2400 0");
  arcTop.setAttributeNS(null,'fill',"white");
  arcTop.setAttributeNS(null,'stroke','white');
  arcTop.setAttributeNS(null,'stroke-width','20');
  wijzerPlaat.appendChild(arcTop);
  let arcBottom = document.createElementNS('http://www.w3.org/2000/svg','path');
  arcBottom.setAttributeNS(null,'id','arcBottom_' + name)
  arcBottom.setAttributeNS(null,'d',"M-1200,0 l 300 0 a900,900 0 1,0 1800,0 l 300 0 a1200,1200  0 1,1 -2400 0");
  arcBottom.setAttributeNS(null,'fill',"white");
  arcBottom.setAttributeNS(null,'stroke','white');
  arcBottom.setAttributeNS(null,'stroke-width','20');
  wijzerPlaat.appendChild(arcBottom);
  knop.appendChild(circle);
  knop.appendChild(rect);
  knop.appendChild(arc);
  wijzerPlaat.appendChild(knop);
  let circleTop = document.createElementNS('http://www.w3.org/2000/svg','g');
  circleTop.setAttributeNS(null,'d',"M-1200,0 l 300 0 a900,900 0 1,1 1800,0 l 300 0 a1200,1200  0 1,0 -2400 0");
  circleTop.setAttributeNS(null,'fill','white');
  circleTop.setAttributeNS(null,'stroke','white');
  circleTop.setAttributeNS(null,'stroke-width','10');
  let circleBottom = document.createElementNS('http://www.w3.org/2000/svg','g');
  circleTop.setAttributeNS(null,'d',"M-1200,0 l 300 0 a900,900 0 1,0 1800,0 l 300 0 a1200,1200  0 1,1 -2400 0");
  circleTop.setAttributeNS(null,'fill','white');
  circleTop.setAttributeNS(null,'stroke','white');
  circleTop.setAttributeNS(null,'stroke-width','10');
  wijzerPlaat.appendChild(circleTop);
  wijzerPlaat.appendChild(circleBottom);
  for (let i=0; i<17; i++) {
    let angle = -210 + 15*i;
    let rotateString = 'rotate(' + angle.toString() + ')';
    let lijntje = document.createElementNS('http://www.w3.org/2000/svg','path');
    lijntje.setAttributeNS(null,'d',"M 840 0 L 1000 0z");
    lijntje.setAttributeNS(null,'stroke','black');
    lijntje.setAttributeNS(null,'stroke-width',20);
    lijntje.setAttributeNS(null,'transform',rotateString);
    wijzerPlaat.appendChild(lijntje);
  }
  for (let i=0; i<9; i++) {
    let angle = -120 + 30*i;
    let rotateString = 'rotate(' + angle.toString() + ')';
    let cijfer = document.createElementNS('http://www.w3.org/2000/svg','text');
    cijfer.setAttributeNS(null,'x','-70');
    cijfer.setAttributeNS(null,'y','-1040');
    cijfer.setAttributeNS(null,'stroke-width',10);
    cijfer.setAttributeNS(null,'transform',rotateString);
    cijfer.setAttributeNS(null,'fill','black');
    cijfer.setAttributeNS(null,'font-size',"240");
    cijfer.setAttributeNS(null,'font-family',"sans-serif");
    cijfer.textContent = (i+1).toString();
    wijzerPlaat.appendChild(cijfer);
  }
  document.getElementById('svgCanvas_' + name).appendChild(wijzerPlaat);
}
function createAutoKnop(name) {
  let id = 'autoKnop_' + name;
  let autoKnop = document.createElementNS('http://www.w3.org/2000/svg','g');
  autoKnop.setAttributeNS(null,'id',id);
  autoKnop.setAttributeNS(null,'transform','translate(5500 2000)');
  let wrapper = document.createElementNS('http://www.w3.org/2000/svg','g');
  wrapper.setAttributeNS(null,'id','wrapper_' + name);
  wrapper.setAttributeNS(null,'transform','rotate(180)');
  autoKnop.appendChild(wrapper);
  let circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
  circle.setAttributeNS(null,'id','drukKnop_' + name);
  circle.setAttributeNS(null,'cx','0');
  circle.setAttributeNS(null,'cy','0');
  circle.setAttributeNS(null,'r','800');
  circle.setAttributeNS(null,'fill','rgb(150 150 150)');
  circle.setAttributeNS(null,'stroke-width','10');
  circle.setAttributeNS(null,'cursor','pointer');
  circle.setAttributeNS(null,'stroke','maroon');
  wrapper.appendChild(circle);
  let arcTop = document.createElementNS('http://www.w3.org/2000/svg','path');
  arcTop.setAttributeNS(null,'id','arcTop_' + name)
  arcTop.setAttributeNS(null,'d',"M-1200,0 l 300 0 a900,900 0 1,1 1800,0 l 300 0 a1200,1200  0 1,0 -2400 0");
  arcTop.setAttributeNS(null,'fill',"white");
  arcTop.setAttributeNS(null,'stroke','white');
  arcTop.setAttributeNS(null,'stroke-width','20');
  wrapper.appendChild(arcTop);
  let arcBottom = document.createElementNS('http://www.w3.org/2000/svg','path');
  arcBottom.setAttributeNS(null,'id','arcBottom_' + name)
  arcBottom.setAttributeNS(null,'d',"M-1200,0 l 300 0 a900,900 0 1,0 1800,0 l 300 0 a1200,1200  0 1,1 -2400 0");
  arcBottom.setAttributeNS(null,'fill',"white");
  arcBottom.setAttributeNS(null,'stroke','white');
  arcBottom.setAttributeNS(null,'stroke-width','20');
  wrapper.appendChild(arcBottom);
  let textTop = document.createElementNS('http://www.w3.org/2000/svg','text');
  textTop.setAttributeNS(null,'fill','black');
  textTop.setAttributeNS(null,'font-size','300');
  wrapper.appendChild(textTop);
  let textBottom = document.createElementNS('http://www.w3.org/2000/svg','text');
  textBottom.setAttributeNS(null,'fill','black');
  textBottom.setAttributeNS(null,'font-size','300');
  textBottom.setAttributeNS(null,'transform','rotate(180)');
  wrapper.appendChild(textBottom);
  let textPathTop = document.createElementNS('http://www.w3.org/2000/svg','textPath');
  textPathTop.setAttributeNS(null,'side','right');
  textPathTop.setAttributeNS(null,'startOffset','720');
  textPathTop.setAttributeNS(null,'href','#myArcTop_' + name);
  textPathTop.textContent = "Automatisch";
  textTop.appendChild(textPathTop);
  let textPathBottom = document.createElementNS('http://www.w3.org/2000/svg','textPath');
  textPathBottom.setAttributeNS(null,'startOffset','300');
  textPathBottom.setAttributeNS(null,'href','#myArcTop_' + name);
  //textPathBottom.setAttributeNS(null,'transform','rotate(180)');
  textPathBottom.textContent = "Drukknop bediening";
  textBottom.appendChild(textPathBottom);
  document.getElementById('svgCanvas_' + name).appendChild(autoKnop);
}
function volumeButtonPolarCoordinates(e) {
  let targetId = e.target.getAttributeNS(null,'id');
  let name = targetId.split('_')[1];
  let translateString = document.getElementById("wijzerPlaat_" + name).getAttributeNS(null,"transform");
  let shift = translateString.split(',');
  let shiftX = parseInt(shift[0].slice(10));
  let shiftY = parseInt(shift[1].slice(0,shift[1].length-1));
  let canvas = document.getElementById('svgCanvas_' + name);
  let m1 = 8000/parseInt(canvas.getAttributeNS(null,'width'));
  let xx = parseInt(canvas.getAttributeNS(null,'x'));
  let yy = parseInt(canvas.getAttributeNS(null,'y'));
  let parent = canvas.parentElement;
  let m2 = 8000/parseInt(parent.getAttributeNS(null,'width'));
  let x = m1*m2*e.offsetX - shiftX - m1*xx;
  let y = m1*m2*e.offsetY - shiftY - m1*yy;
  let r = Math.sqrt(x*x + y*y);
  let phi = 180*Math.acos(x/r)/Math.PI;
  if (y>0) phi = 360 - phi;
  //console.log({x: x, y: y, r: r, phi: phi});
  return {x: x, y: y, r: r, phi: phi};
}
function autoButtonPolarCoordinates(e) {
  let targetId = e.target.getAttributeNS(null,'id');
  let name = targetId.split('_')[1];
  let translateString = document.getElementById("autoKnop_" + name).getAttributeNS(null,"transform");
  let shift = translateString.split(',');
  let shiftX = parseInt(shift[0].slice(10));
  let shiftY = parseInt(shift[1].slice(0,shift[1].length-1));
  let x = 10*e.offsetX - shiftX;
  let y = 10*e.offsetY - shiftY;
  let r = Math.sqrt(x*x + y*y);
  let phi = 180*Math.acos(x/r)/Math.PI;
  if (y>0) phi = 360 - phi;
  return {x: x, y: y, r: r, phi: phi};
}
function startVolumeAdapt(e) {
  let targetId = e.target.getAttributeNS(null,'id');
  let name = targetId.split('_')[1];
  document.getElementById("volumeKnop_" + name).setAttributeNS(null,'drag','true');
  document.getElementById("piefje_" + name).setAttributeNS(null,'drag','true');
}
function stopVolumeAdapt(e) {
  let targetId = e.target.getAttributeNS(null,'id');
  let name = targetId.split('_')[1];
  document.getElementById("volumeKnop_" + name).setAttributeNS(null,'drag','false');
  document.getElementById("piefje_" + name).setAttributeNS(null,'drag','false');
}
function volumeAdapt(e) {
  let targetId = e.target.getAttributeNS(null,'id');
  let name = targetId.split('_')[1];
  let dragging = document.getElementById("volumeKnop_" + name).getAttributeNS(null,'drag');
  if (dragging == 'false') return;
  let knop = document.getElementById("volumeKnop_" + name);
  let neon = document.getElementById("neonLight_" + name);
  let phi = 90 - volumeButtonPolarCoordinates(e).phi;
  if (phi <= -120 && phi > -150) phi = -120;
  if (phi <= -210 && phi > -240) phi = -240;
  if (phi > -210 && phi <= -150) phi = -180;
  phi = (phi).toString();
  knop.setAttributeNS(null,'transform','rotate(' + phi + ')');
  document.getElementById('aanUitKnop_' + name).setAttributeNS(null,'fill','rgb(0 255 0)');
  //document.getElementById("frame_" + name).setAttributeNS(null,'stroke','rgb(0 255 0)');
  neon.setAttributeNS(null,'stroke','rgb(0 255 0)');
  if (phi == '-180') {
    neon.setAttributeNS(null,'stroke','rgb(255 0 0)');
    document.getElementById('aanUitKnop_' + name).setAttributeNS(null,'fill','rgb(255 0 0)');
    //document.getElementById("frame_" + name).setAttributeNS(null,'stroke','rgb(255 0 0)');
    neon.setAttributeNS(null,'stroke','rgb(255 0 0)');
  }
}
function modeAdapt(e) {
  let targetId = e.target.getAttributeNS(null,'id');
  let name = targetId.split('_')[1];
  let knop = document.getElementById("autoKnop_" + name);
  let wrap = document.getElementById('wrapper_' + name);
  let r180 = wrap.getAttributeNS(null,'transform');
  if (r180 == 'rotate(180)') wrap.setAttributeNS(null,'transform','rotate(0)');
  else wrap.setAttributeNS(null,'transform','rotate(180)');
}
function onOff(e) {
  let targetId = e.target.getAttributeNS(null,'id');
  let name = targetId.split('_')[1];
  let knop = document.getElementById('autoKnop_' + name);
  let wrap = document.getElementById('wrapper_' + name);
  let aanUit =  document.getElementById('aanUitKnop_' + name);
  let red = aanUit.getAttributeNS(null,"fill");
  if (red == 'rgb(255 0 0)')  {
    aanUit.setAttributeNS(null,"fill",'rgb(0 255 0)');
    document.getElementById("volumeKnop_" + name).setAttributeNS(null,'transform','rotate(-120)');
    document.getElementById("neonLight_" + name).setAttributeNS(null,'stroke','rgb(0 255 0)');
    //document.getElementById("frame_" + name).setAttributeNS(null,'stroke','rgb(0 255 0)');
  }
  else {
    aanUit.setAttributeNS(null,"fill",'rgb(255 0 0)');
    document.getElementById("volumeKnop_" + name).setAttributeNS(null,'transform','rotate(-180)');
    document.getElementById("neonLight_" + name).setAttributeNS(null,'stroke','rgb(255 0 0)');
    //document.getElementById("frame_" + name).setAttributeNS(null,'stroke','rgb(255 0 0)');
  }
}
function createDashboard(svgParent,name,x,y,scale) {
  createCanvas(svgParent,name,x,y,scale);
  //createFrame(name);
  createVolumeKnop(name);
  createAanUitGroep(name);
  //createAutoKnop(name);
  let volume = document.getElementById('volumeKnop_' + name);
  //let mode = document.getElementById('autoKnop_' + name);
  let aanUit = document.getElementById('aanUitKnop_' + name);
  volume.addEventListener('mousedown',startVolumeAdapt);
  volume.addEventListener('mousemove',volumeAdapt);
  volume.addEventListener('mouseup',stopVolumeAdapt);
  volume.addEventListener('mouseleave',stopVolumeAdapt);
  //mode.addEventListener('click',modeAdapt);
  aanUit.addEventListener('mouseup',onOff);
}
function getDashBoardStatus(name) {
  let on = document.getElementById('aanUitKnop_' + name).getAttributeNS(null,'fill');
  if (on == 'rgb(255 0 0)') on = false; else on = true;
  let volume = document.getElementById('volumeKnop_' + name).getAttributeNS(null,'transform');
  volume = parseInt(volume.slice(7,volume.length-1));
  if (volume == -180) volume = 0;
  else if (volume > -180) volume = 5 + volume/30;
  else volume =  17 + volume/30;
  //let computerOn = (volume > 0);
  //let auto =  document.getElementById('wrapper_' + name).getAttributeNS(null,'transform');
  //auto = parseInt(auto.slice(7,auto.length-1));
  //if (auto == 180) auto = false; else auto = true;
  return {on: on, volume: volume};
}
//let parent = document.getElementById('theBody');
//createDashboard(parent,'Nummer1',0,0,0.8);
