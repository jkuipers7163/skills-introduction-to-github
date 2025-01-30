function boardToCanvasCoords(x,y) {
  let cnvPt = cnv.createSVGPoint();
  cnvPt.x = 320*x;
  cnvPt.y = 320*y;
  return(cnvPt);
}

// function to crete the main panels
function createNotationPanel() {
  let newGroup = document.createElementNS('http://www.w3.org/2000/svg','g');
  newGroup.setAttributeNS(null,'id','notation');
  newGroup.setAttributeNS(null,'transform','translate(0 400)');
  infoPanel.appendChild(newGroup);
  let newText =  document.createElementNS('http://www.w3.org/2000/svg','text');
  newText.setAttributeNS(null,'id','witzwart');
  newText.setAttributeNS(null,'x', '0');
  newText.setAttributeNS(null,'font-size', '125');
  newText.setAttributeNS(null,'white-space','pre-wrap');
  newText.setAttributeNS(null,'font-family','monospace');
  newText.setAttributeNS(null,'y', '0');
  newGroup.appendChild(newText);
  newText.textContent = '--:---wit,-zwart';
  for (let i=0; i<15; i++) {
    let newText =  document.createElementNS('http://www.w3.org/2000/svg','text');
    newText.setAttributeNS(null,'id','line' + i.toString());
    newText.setAttributeNS(null,'x', '0');
    newText.setAttributeNS(null,'font-size', '125');
    newText.setAttributeNS(null,'white-space','pre');
    newText.setAttributeNS(null,'font-family','monospace');
    newText.setAttributeNS(null,'y', (150*(i+1)).toString());
    newGroup.appendChild(newText);
  }
  let background =  document.createElementNS('http://www.w3.org/2000/svg','rect');
  background.setAttributeNS(null,'id','background');
  background.setAttributeNS(null,'fill', 'green');
  background.setAttributeNS(null,'opacity','30%');
  background.setAttributeNS(null,'width', '450');
  background.setAttributeNS(null,'height', '110');
  newGroup.appendChild(background);
}

function showValue(v) {
  let newText =  document.getElementById('value');
  if (newText == null) newText =  document.createElementNS('http://www.w3.org/2000/svg','text');
  let x = '6000';
  let y = '2000';
  newText.setAttributeNS(null,'id','value');
  newText.setAttributeNS(null,'x',x);
  newText.setAttributeNS(null,'y',y);
  newText.setAttributeNS(null,'font-size', '150');
  v = Math.floor(v);
  newText.textContent = v.toString();
  infoPanel.appendChild(newText);
}

function showNotation(list) {
  let n = 15;
  let newGroup =  document.getElementById('notation');
  let newText =  document.getElementById('witzwart');
  if (list.length < 1) return;
  let notation = listToNotation(list);
  let k = notation.length;
  let lineNr = Math.floor((sIndex-1)/2) + 1;
  let right = 1-sIndex%2;
  for (let i=0; i<n; i++) {
    let newText =  document.getElementById('line' + i.toString());
    if (k<=n) {
      if (i<k) newText.textContent = notation[i];
      else i<10 ? newText.textContent = '0' + i.toString() + ':' : newText.textContent = i.toString() + ':';
    }
    if (k>n) {
      if (lineNr > k-n) newText.textContent = notation[i+k-n]; else newText.textContent = notation[i+lineNr];
    }
  }
  let background =  document.getElementById('background');
  background.setAttributeNS(null,'x', (250 + right*450).toString());
  background.setAttributeNS(null,'y', (-90+150*lineNr).toString());
  if (k>n && lineNr > k-n) background.setAttributeNS(null,'y', (-90+150*(lineNr-k+n)).toString());
}

function putLabel(position) {
  let row = parseInt(position/5);
  let isEven = 1 - row%2;
  let column = 2*(position%5) + isEven;
  let pt =  boardToCanvasCoords(column,row);
  let newText =  document.createElementNS('http://www.w3.org/2000/svg','text');
  let x = (pt.x+50).toString();
  let y = (pt.y+100).toString();
  newText.setAttributeNS(null,'x',x);
  newText.setAttributeNS(null,'y',y);
  newText.setAttributeNS(null,'font-size', '100');
  newText.textContent = (position+1).toString();
  cnv.appendChild(newText);
}

function remDot(position,size,color) {
  let name = 'dot' + position.toString();
  let circle = document.getElementById(name);
  cnv.removeChild(circle);
}

function putDot(position,size,color) {
  let row = parseInt(position/5);
  let isEven = 1 - row%2;
  let column = 2*(position%5) + isEven;
  let pt =  boardToCanvasCoords(column,row);
  let circle =  document.createElementNS('http://www.w3.org/2000/svg','circle');
  let x = (pt.x+150).toString();
  let y = (pt.y+150).toString();
  circle.setAttributeNS(null,'id','dot' + position.toString());
  circle.setAttributeNS(null,'cx',x);
  circle.setAttributeNS(null,'cy',y);
  circle.setAttributeNS(null,'r', parseInt(20*size));
  circle.setAttributeNS(null,'opacity','100%');
  circle.setAttributeNS(null,'fill',color);
  cnv.appendChild(circle);
}

function drawBoard() {
  let color;
  let t=0;
  for (let j=0; j<10; j++) {
    for (let i=0; i<10; i++) {
      if ((i+j)%2 == 0) {color = 'silver';}
      else {color = 'rgb(128,128,128)';}
      createSquare(i,j,color);
      if ((i+j)%2 == 1) { putLabel(t); t++; }
    }
  }
}

function createSquare(i,j,color) {
  let group = document.createElementNS("http://www.w3.org/2000/svg","g");
  let node = document.createElementNS("http://www.w3.org/2000/svg","rect");
  let pt = boardToCanvasCoords(i,j);
  let name = 'square' + i.toString() + j.toString();
  let groupName = 'squareGroup' + i.toString() + j.toString();
  group.setAttributeNS(null,'id',groupName);
  node.setAttributeNS(null,'id',name);
  node.setAttributeNS(null, "x", (pt.x).toString());
  node.setAttributeNS(null, "y", (pt.y).toString());
  node.setAttributeNS(null, "width", 320);
  node.setAttributeNS(null, "height", 320);
  node.setAttributeNS(null, "id", name);
  node.setAttributeNS(null, "fill", color);
  group.appendChild(node);
  cnv.appendChild(group);
}

function createKing(color,position) {
  let colorString = COLORLIGHTPIECE;
  let strokeString = COLORDARKPIECE
  if (color == 'black') { colorString = COLORDARKPIECE; strokeString = COLORLIGHTPIECE; }
  let path1String = "M 10,105 c 0,60 190,60 190,0 l 0,-35 l -190,0 z";
  let path2String = "M 10,70 c 0,60 190,60 190,0 c 0,-60 -190,-60 -190,0 z" ;
  let path3String = "M 10,140 c 0,60 190,60 190,0 l 0,-35 l -190,0 z";
  let styleString = 'fill: url(#lg) ' + colorString + '; stroke:' + strokeString + '; stroke-width: 10;';
  let row = parseInt(position/5);
  let isEven = 1 - row%2;
  let column = 2*(position%5) + isEven;
  let pt = boardToCanvasCoords(column,row);
  let x = (pt.x).toString();
  let y = (pt.y + 30).toString();
  if (position == -1 && color == 'white') { x = '7200'; y = '150'; }
  if (position == -1 && color == 'black') { x = '7500'; y = '150'; }
  let path1 = document.createElementNS("http://www.w3.org/2000/svg","path");
  let path2 = document.createElementNS("http://www.w3.org/2000/svg","path");
  let path3 = document.createElementNS("http://www.w3.org/2000/svg","path");
  let group = document.createElementNS("http://www.w3.org/2000/svg","g");
  group.setAttributeNS(null,"id",'King' + color + position.toString());
  path1.setAttributeNS(null,"id",'A' + color + position.toString());
  path2.setAttributeNS(null,"id",'B' + color + position.toString());
  path3.setAttributeNS(null,"id",'C' + color + position.toString());
  path1.setAttributeNS(null,"d",path1String);
  path2.setAttributeNS(null,"d",path2String);
  path3.setAttributeNS(null,"d",path3String);
  path1.setAttributeNS(null, "style", styleString);
  path2.setAttributeNS(null, "style", styleString);
  path3.setAttributeNS(null, "style", styleString);
  let t = 'translate(' + x + ',' + y + ') scale(1.5 1.5)';
  group.setAttributeNS(null,"transform", t);
  if (position < 0) group.addEventListener('click',changeMouse);
  group.appendChild(path3);
  group.appendChild(path1);
  group.appendChild(path2);
  if (position >= 0) {
    let squareGroup = document.getElementById('squareGroup' + column.toString() + row.toString());
    squareGroup.appendChild(group);
  }
  else document.getElementById('svgAll').appendChild(group);
}

function drawNothing(position) {
  let row = parseInt(position/5);
  let isEven = 1 - row%2;
  let column = 2*(position%5) + isEven;
  let group = document.getElementById('squareGroup' + column.toString() + row.toString());
  let rect = document.getElementById('square' + column.toString() + row.toString());
  group.removeChild(rect);
  group.appendChild(rect);
}

function drawKing(color,position) {
  let row = parseInt(position/5);
  let isEven = 1 - row%2;
  let column = 2*(position%5) + isEven;
  let group = document.getElementById('squareGroup' + column.toString() + row.toString());
  let square = document.getElementById('square' + column.toString() + row.toString());
  group.removeChild(square);
  group.appendChild(square);
  let king = document.getElementById('King' + color + position.toString());
  group.removeChild(king);
  group.appendChild(king);
}

function createPiece(color,position) {
  let colorString = COLORLIGHTPIECE;
  let strokeString = COLORDARKPIECE;
  let styleString2="filter: url(#glow);"
  if (color == 'black') { colorString = COLORDARKPIECE; strokeString = COLORLIGHTPIECE; }
  let path1String = "M 10,105 c 0,60 190,60 190,0 l 0,-35 l -190,0 z";
  let path2String = "M 10,70 c 0,60 190,60 190,0 c 0,-60 -190,-60 -190,0 z" ;
  let styleString = 'fill: url(#lg) ' + colorString + '; stroke: ' + strokeString +'; stroke-width: 10;';
  let row = parseInt(position/5);
  let isEven = 1 - row%2;
  let column = 2*(position%5) + isEven;
  let pt = boardToCanvasCoords(column,row);
  let x = (pt.x).toString();
  let y = (pt.y + 50).toString();
  if (position == -1 && color == 'white') { x = '6600'; y = '200'; }
  if (position == -1 && color == 'black') { x = '6900'; y = '200'; }
  let group = document.createElementNS("http://www.w3.org/2000/svg","g");
  let path1 = document.createElementNS("http://www.w3.org/2000/svg","path");
  let path2 = document.createElementNS("http://www.w3.org/2000/svg","path");
  group.setAttributeNS(null,"id",'Pawn' + color + position.toString());
  path1.setAttributeNS(null,"id",'P1' + color + position.toString());
  path2.setAttributeNS(null,"id",'P2' + color + position.toString());
  path1.setAttributeNS(null,"d",path1String);
  path1.setAttributeNS(null,"display","hidden");
  path1.setAttributeNS(null, "style", styleString);
  path2.setAttributeNS(null,"d",path2String);
  path2.setAttributeNS(null,"display","hidden");
  path2.setAttributeNS(null, "style", styleString);
  let t = 'translate(' + x + ',' + y + ') scale(1.5 1.5)';
  group.setAttributeNS(null,"transform",t);
  if (position < 0) group.addEventListener('click',changeMouse);
  group.appendChild(path1);
  group.appendChild(path2);
  if (position >= 0) {
    let squareGroup = document.getElementById('squareGroup' + column.toString() + row.toString());
    squareGroup.appendChild(group);
  }
  else document.getElementById('svgAll').appendChild(group);
}

function drawPiece(color,position) {
  let row = parseInt(position/5);
  let isEven = 1 - row%2;
  let column = 2*(position%5) + isEven;
  let group = document.getElementById('squareGroup' + column.toString() + row.toString());
  let rect = document.getElementById('square' + column.toString() + row.toString());
  group.removeChild(rect);
  group.appendChild(rect);
  let pawn = document.getElementById('Pawn' + color + position.toString());
  group.removeChild(pawn);
  group.appendChild(pawn);
}

function showMoves(target,type) {
  if (gameMode != 'play') return;
  let id = target.id;
  let i = parseInt(id[11]);
  let j = parseInt(id[12]);
  let activeField = (i+j)%2 == 1;
  if (!activeField) return;
  let color = 'lightGrey';
  if (type == 'mouseup') color = 'rgb(128,128,128)';
  let isOdd = i%2;
  let position = ((i+10*j) - isOdd)/2;
  for (let h=0; h<activePosition.moves.length; h++) {
    let add = s.difference(activePosition.moves[h]).additions;
    if (position == add[0])  {manualMove(target); return; }
  }
  let pieceType = s.fen[position];
  let moves = s.getMoves();
  if (type == 'mousedown') {
    activePosition.pos = position;
    activePosition.moves = [];
  }
  for (let h=0; h<moves.length; h++) {
    let rightPiece = false;
    let current = s;
    for (let z=0; z<moves[h].length; z++) {
      let addDel = current.difference(moves[h][z]);
      let add = addDel.additions;
      let del = addDel.deletions;
      if (add.length != 1) {console.log('error'); return; }
      current = moves[h][z];
      let p1 = s.nrPieces(pieceType);
      if (pieceType < 3) p1 += s.nrPieces(pieceType + 2);
      let p2 = current.nrPieces(pieceType);
      if (pieceType < 3) p2 += current.nrPieces(pieceType + 2);
      if (z==0 && del.includes(position) && p1 == p2) rightPiece = true; //activePosition.pos = position;}
      if (rightPiece && type == 'mousedown') {
        putDot(add[0],1,color);
        if (z == moves[h].length-1) {
          putDot(add[0],2, color);
          activePosition.moves.push(moves[h][z]);
        }
      }
      if (rightPiece && type == 'mouseup') {
        remDot(add[0],1,color);
        if (z == moves[h].length-1) {
          remDot(add[0],2, color);
          //activePosition.moves.push(moves[h][z]);
        }
      }
    }
  }
}
