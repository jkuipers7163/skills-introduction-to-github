const UPLEFT = 0; // 0
const UPRIGHT = 1; // 1
const DOWNRIGHT = 2; // 2
const DOWNLEFT = 3;  /// 3
const EMPTY = 0;
const BLACK = 1;
const WHITE = 2;
const BLACKKING = 3;
const WHITEKING = 4;
const white = true;
const black = false;

const COLORLIGHTPIECE = "rgb(230, 220, 180)";
const COLORDARKPIECE = "rgb(100, 0, 50)";

const cnv = document.getElementById('svgBoard');
const infoPanel = document.getElementById('svgAll');
//const compute = document.getElementById("compute");
//const analyse = document.getElementById("analyse");
const stelling = document.getElementById("bakMetStenen");
const start =  document.getElementById("nieuwSpel");
const comments = document.getElementById("opmerkingen");
//let pauzeWit = null; //document.getElementById("speelPauzeer");
//let pauzeZwart = null;
stelling.addEventListener('click',nieuweStelling);
//compute.('click',computerMove);
//compute.addEventListener('mousedown',highLight);
infoPanel.addEventListener('click',mousePosition);
infoPanel.addEventListener('mousedown',mousePosition);
infoPanel.addEventListener('mouseup',mousePosition);
//analyse.addEventListener('click',analysis);
start.addEventListener('click',nieuwSpel);
const backArrow = document.getElementById("backArrow");
backArrow.addEventListener('click',prevMove);
const radioBack = document.getElementById("bckTriangle");
radioBack.addEventListener('click',prevMove);
const radioNext = document.getElementById("fwdTriangle");
radioNext.addEventListener('click',nextMove);
const aanZet = document.getElementById("aanZet");
//aanZet.addEventListener('click',changePiece);
const buttonNext = document.getElementById("fwdButtonA");
const buttonBack = document.getElementById("bckButtonA");
let activePosition = { pos: -1, moves: [] };
let gameMode = 'play';

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function mousePosition(e) {
  console.log('m',e.target);
  if (e.target.id == 'aanZet' && e.type == 'click') { changePiece(e.target); return; }
  //if (e.target.id == 'example' && e.type == 'click') {getCode(); return; }
  let i = Math.floor((e.offsetX -1650/8)/40);
  let j = Math.floor((e.offsetY-150/8)/40);
  if (i<0 || i>9 || j<0 || j>9) return;
  if (gameMode == 'adapt') {
    let target = document.getElementById('squareGroup' + i.toString() + j.toString());
    if (e.type == 'click' && (i+j)%2 == 1) changePiece(target);
  }
  if (gameMode == 'play') {
    let target = document.getElementById('squareGroup' + i.toString() + j.toString());
    let type = e.type;
    showMoves(target,type);
  }
}

function changeMouse(e) {
  if (gameMode != 'adapt') return;
  let name = e.target.parentElement.id;
  let color = name.slice(4,9);
  let colorString = COLORDARKPIECE;
  let strokeString = COLORLIGHTPIECE;
  if (color == 'white') { colorString = COLORLIGHTPIECE; strokeString = COLORDARKPIECE; }
  let groupOpen = `<g transform="scale(0.5)">`;
  let path1String = `<path d="M 10,105 c 0,60 190,60 190,0 l 0,-35 l -190,0 z" stroke="` + strokeString + `" stroke-width="10" fill="` + colorString + `"/>`;
  let path2String = `<path d="M 10,70 c 0,60 190,60 190,0 c 0,-60 -190,-60 -190,0 z" stroke="` + strokeString + `" stroke-width="10" fill="` + colorString + `"/>`;
  let path3String = `<path d="M 10,140 c 0,60 190,60 190,0 l 0,-35 l -190,0 z" stroke="` + strokeString + `" stroke-width="10" fill="` + colorString + `"/>`;
  if (name == 'Pawnwhite-1' || name == 'Pawnblack-1')  path3String = '';
  let groupClose = `</g>`;
  let intro = `\'data:image/svg+xml;utf8,`
  let svgOpen =  `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="50" height="50" viewBox="0 0 200 200">`;
  let image = groupOpen + path3String + path1String + path2String + groupClose;
  let svgClose = `</svg>'`
  let url = `url(` + intro + svgOpen + image + svgClose + `), auto`;
  document.getElementById('svgAll').setAttributeNS(null,'cursor', url);
  document.getElementById('svgAll').setAttributeNS(null,'cursorName', name);
}

function changePiece(target) {
  if (gameMode != 'adapt') return;
  let id = target.id;
  let cursorName = document.getElementById('svgAll').getAttributeNS(null,'cursorName');
  let codePiece = 0;
  if (cursorName == 'Pawnwhite-1') codePiece = 2;
  if (cursorName == 'Pawnblack-1') codePiece = 1;
  if (cursorName == 'Kingwhite-1') codePiece = 4;
  if (cursorName == 'Kingblack-1') codePiece = 3;
  //console.log(id);
  if (id == 'aanZet') s.color = !s.color;
  else {
    let column = parseInt(id[11]);
    let row = parseInt(id[12]);
    let isOdd = column%2;
    let position = ((column+10*row) - isOdd)/2;
    if (s.fen[position] == 0) s.fen[position] = codePiece;
    else s.fen[position] = 0;
  }
  s.show();
}

function statePairToNotation(s,t) {
  let add = s.difference(t).additions;
  let del = s.difference(t).deletions;
  if (add.length != 1) {
    console.log('error1 in statePairToNotation');
    return;
  }
  let newPos = add[0];
  let oldPos = -1;
  for (let i=0; i<del.length; i++) {
    if (s.fen[del[i]]%2 == 1 && !s.color) oldPos = del[i];
    if (s.fen[del[i]]%2 == 0 && s.color) oldPos = del[i];
  }
  if (oldPos < 0)  {console.log('error2 in statePairToNotation'); return}
  let hyphen = (del.length > 1) ? 'x':'-';
  let oldP = (oldPos < 9) ? '0' + (oldPos+1).toString() : (oldPos+1).toString();
  let newP = (newPos < 9) ? '0' + (newPos+1).toString() : (newPos+1).toString();
  //if (del.length > 1) hyphen = 'x';
  return oldP + hyphen + newP;
}

function listToNotation(list) {
  let text = '';
  let current = list[0];
  let color = current.color;
  if (!color) text += ' ....., ';
  for (let i=1; i<list.length; i++) {
    next = list[i];
    text += statePairToNotation(current, next);
    if (current.color) text += ', '; else text += '\n';
    current = next;
  }
  text = text.slice(0,text.length-1);
  let notation = text.split('\n');
  for (let i=0; i<notation.length; i++)
    i<10 ? notation[i] = '0' + i.toString() + ': ' + notation[i]: notation[i] = i.toString() + ': ' + notation[i];
  return notation;
}

function manualMove(target) {
  if (gameMode != 'play') return;
  let id = target.id;
  let i = parseInt(id[11]);
  let j = parseInt(id[12]);
  let active = (i+j)%2 == 1;
  let isOdd = i%2;
  let position = ((i+10*j) - isOdd)/2;
  if (!active) {activePosition = {pos: -1, moves: []}; return; }
  for (let h=0; h<activePosition.moves.length; h++) {
    let add = s.difference(activePosition.moves[h]).additions;
    if (add[0] == position) {
      s = new State(activePosition.moves[h].fen,!s.color);
      sList.push(s);
      sIndex += 1;
      s.show();
      showNotation(sList);
      activePosition = {pos: -1, moves: []};
      let color = s.color ? COLORLIGHTPIECE: COLORDARKPIECE;
      aanZet.setAttributeNS(null,'fill',color);
      hervatSpel();
      return;
    }
  }
  activePosition = {pos: -1, moves: []};
  return;
}

function prevMove(e) {
  if (gameMode != 'play') return;
  if (sIndex > 0) {
    sIndex--;
    s = sList[sIndex];
    if (e.target.id == "backArrow") sList.pop();
    showNotation(sList);
    s.show();
    let color = s.color ? COLORLIGHTPIECE: COLORDARKPIECE;
    aanZet.setAttributeNS(null,'fill',color);
  }
}

function nextMove() {
  if (gameMode != 'play') return;
  if (sIndex < sList.length-1) sIndex++;
  s = sList[sIndex];
  showNotation(sList);
  s.show();
  let color = s.color ? COLORLIGHTPIECE: COLORDARKPIECE;
  aanZet.setAttributeNS(null,'fill',color);
}

function analysis() {
  if (gameMode != 'play') return;
  sIndex = sList.length-1
  s = sList[sIndex];
  let moves = s.getQuickListMoves();
  if (moves.length == 0) {console.log('end of game!'); return; }
  let ab = alphaBeta(s, 0.1, -1000, 1000);
  let nextState = ab.move;
  let value = ab.v;
  let mainVariant = ab.variant;
  showNotation(mainVariant);
  s.show();
}

function computerMove(maxDepth) {
  if (gameMode != 'play') return;
  setTimeout( () => {
  sIndex = sList.length-1;
  s = sList[sIndex];
  let volume = 0;
  if (s.color) volume = getDashBoardStatus('Wit').volume;
  else volume = getDashBoardStatus('Zwart').volume;
  console.log('volume',volume);
  let stopEven = (volume == 0);
  if (stopEven) return;
  if (sIndex >= 199) {
    //pauze.setAttributeNS(null,'pauzeIsTrue','true');
    //document.getElementById('comments').textContent = "Remise";
    return;
  }
  let moves = s.getQuickListMoves();
  if (moves.length == 0) {
    //pauze.setAttributeNS(null,'pauzeIsTrue','true');
    let winnaar = 'Wit';
    if (s.color) winnaar = 'Zwart';
    //document.getElementById('comments').textContent = winnaar + ' wint';
    return;
  }
  //volume = 0;
  //if (s.color) volume = getDashBoardStatus('Wit').volume; else volume = getDashBoardStatus('Zwart').volume;
  //if (volume == 0) return;
  let ab = alphaBeta(s, 81/(volume*volume*volume), -1000, 1000,0);
  let m = Math.floor(ab.move.length*Math.random());
  let nextState = ab.move[m];
  let value = ab.v;
  let mainVariant = ab.variant;
  s = new State(nextState.fen,!s.color);
  sList.push(s);
  sIndex++;
  s.show();
  let color = s.color ? COLORLIGHTPIECE: COLORDARKPIECE;
  aanZet.setAttributeNS(null,'fill',color);
  showNotation(sList);
  //showValue(value);
  return value;},100);
}

class State {
  constructor(fen,color) {
    this.fen = fen;
    this.color = color;
  }
  difference(s) {
    let additions = [];
    let deletions = []
    for (let i=0; i<50; i++) {
      if (this.fen[i] == 0 && s.fen[i] != 0) additions.push(i);
      if (this.fen[i] != 0 && s.fen[i] == 0) deletions.push(i);
    }
    return {additions: additions, deletions: deletions};
  }
  nrPieces(type) {
    let n = 0;
    for (let i=0; i<50; i++) if (this.fen[i] == type) n++;
    return n;
  }
  getQuickListMoves() {
    let list = [];
    let moves = this.getMoves();
    for (let i=0; i<moves.length; i++) list.push(moves[i][moves[i].length-1]);
    return list;
  }
  getMoves() {
    let maximumPaths = this.getCaptures();
    for (let i=0; i<maximumPaths.length; i++) {
      let finalState = maximumPaths[i][maximumPaths[i].length-1];
      for (let pos = 0; pos<5; pos++) if (finalState.fen[pos] == 2) finalState.fen[pos] = 4;
      for (let pos = 45; pos<50; pos++) if (finalState.fen[pos] == 1) finalState.fen[pos] = 3;
    }
    if (maximumPaths.length > 0) return maximumPaths;
    let maximalPaths = [];
    for (let i=0; i<50; i++) {
      if (this.color && this.fen[i] == 2 || (!this.color && this.fen[i] == 1)) {
        for (let j=0; j<4; j++) {
          let moves = this.getPieceMoves(i,j);
          for (let h=0; h<moves.length; h++) maximalPaths.push(moves[h]);
        }
      }
      if (this.color && this.fen[i] == 4 || (!this.color && this.fen[i] == 3)) {
        for (let j=0; j<4; j++) {
          let moves = this.getKingMoves(i,j);
          for (let h=0; h<moves.length; h++) maximalPaths.push(moves[h]);
        }
      }
    }
    if (maximalPaths.length == 0) return [];
    for (let i=0; i<maximalPaths.length; i++) {
      let finalState = maximalPaths[i][maximalPaths[i].length-1];
      for (let pos = 0; pos<5; pos++) if (finalState.fen[pos] == 2) finalState.fen[pos] = 4;
      for (let pos = 45; pos<50; pos++) if (finalState.fen[pos] == 1) finalState.fen[pos] = 3;
    }
    return maximalPaths;
  }
  getCaptures() {
    let maximalPaths = [];
    for (let i=0; i<50; i++) {
      if (this.color && this.fen[i] == 2 || (!this.color && this.fen[i] == 1)) {
        for (let j=0; j<4; j++) {
          let jumps = this.getPieceJumps(i,j);
          for (let h=0; h< jumps.length; h++) maximalPaths.push(jumps[h]);
        }
      }
      if (this.color && this.fen[i] == 4 || (!this.color && this.fen[i] == 3)) {
        for (let j=0; j<4; j++) {
          let jumps = this.getKingJumps(i,j);
          for (let h=0; h<jumps.length; h++) maximalPaths.push(jumps[h]);
        }
      }
    }
    if (maximalPaths.length == 0) return [];
    let le = 0;
    for (let i=0; i<maximalPaths.length; i++) {
      if (maximalPaths[i].length > le) le = maximalPaths[i].length;
    }
    let maximumPaths = [];
    for (let i=0; i<maximalPaths.length; i++) {
      if (maximalPaths[i].length == le) maximumPaths.push(maximalPaths[i]);
    }
    return maximumPaths;
  }
  getKingJumps(position,direction) {
    if (this.fen[position] <= 2) return [];
    let fen = this.fen;
    let row = parseInt(position/5);
    let isEven = 1 - row%2;
    let dCode = [-6,-5,5,4];
    let step = dCode[direction];
    let current = position;
    let boundary = ((current+5)%10 == 0 && direction%3 == 0) ||  ((current+6)%10 == 0 && direction%3 != 0);
    if (boundary) return [];
    current = position + step + isEven; isEven = 1 - isEven;
    boundary = ((current+5)%10 == 0 && direction%3 == 0) ||  ((current+6)%10 == 0 && direction%3 != 0);
    while (current<50 && current>=0 && fen[current] == 0 && !boundary) {
      current += step + isEven;
      isEven = 1 - isEven;
      boundary = ((current+5)%10 == 0 && direction%3 == 0) ||  ((current+6)%10 == 0 && direction%3 != 0);
    }
    if (current >= 50 || current < 0) return [];
    if (fen[position]%2 == fen[current]%2) return [];
    let obstacle = current;
    boundary = ((current+5)%10 == 0 && direction%3 == 0) ||  ((current+6)%10 == 0 && direction%3 != 0);
    if (boundary) return [];
    current += step + isEven; isEven = 1 - isEven;
    boundary = false;
    let nextPosition = [];
    while (current<50 && current>=0 && fen[current] == 0 && !boundary) {
      nextPosition.push(current);
      boundary = ((current+5)%10 == 0 && direction%3 == 0) ||  ((current+6)%10 == 0 && direction%3 != 0);
      current += step + isEven;
      isEven = 1 - isEven;
    }
    if (nextPosition.length == 0) return [];
    let longestPaths = [];
    for (let i=0; i<nextPosition.length; i++) {
      let fenCopy = fen.slice(0,fen.length);
      fenCopy[nextPosition[i]] = fenCopy[position];
      fenCopy[obstacle] = 0;
      fenCopy[position] = 0;
      let nextState = new State(fenCopy,this.color);
      let meerslag = false;
      let followUpJumps = nextState.getKingJumps(nextPosition[i],direction);  // continue same direction
      if (followUpJumps.length > 0) {
        meerslag = true;
        for (let j=0; j<followUpJumps.length; j++) longestPaths.push([nextState,...followUpJumps[j]]);
      }
      followUpJumps = nextState.getKingJumps(nextPosition[i],(direction+1)%4); // turn around one quarter
      if (followUpJumps.length > 0) {
        meerslag = true;
        for (let j=0; j<followUpJumps.length; j++) longestPaths.push([nextState,...followUpJumps[j]]);
      }
      followUpJumps = nextState.getKingJumps(nextPosition[i],(direction+3)%4);  // turn the other way
      if (followUpJumps.length > 0) {
        meerslag = true;
        for (let j=0; j<followUpJumps.length; j++) longestPaths.push([nextState,...followUpJumps[j]]);
      }
      if (!meerslag) longestPaths.push([nextState]);
    }
    return longestPaths;
  }
  getPieceJumps(position,direction) {
    let fen = this.fen;
    if (fen[position] == 0) return [];
    if (fen[position] > 2) return [];
    //if (fen[position] == 1 && (direction == UPLEFT || direction == UPRIGHT)) return [];
    //if (fen[position] == 2 && (direction == DOWNLEFT || direction == DOWNRIGHT)) return [];
    let row = parseInt(position/5);
    let isEven = 1 - row%2;
    let dCode = [-6,-5,5,4];
    let step = dCode[direction];
    let current = position;
    let boundary = ((current+5)%10 == 0 && direction%3 == 0) ||  ((current+6)%10 == 0 && direction%3 != 0);
    if (boundary) return [];
    current = position + step + isEven; isEven = 1 - isEven;
    boundary = ((current+5)%10 == 0 && direction%3 == 0) ||  ((current+6)%10 == 0 && direction%3 != 0);
    if (current >= 50 || current < 0) return [];
    if (fen[current] == 0) return [];
    if (fen[position]%2 == fen[current]%2) return [];
    let obstacle = current;
    boundary = ((current+5)%10 == 0 && direction%3 == 0) ||  ((current+6)%10 == 0 && direction%3 != 0);
    if (boundary) return [];
    current += step + isEven; isEven = 1 - isEven;
    boundary = false;
    let nextPosition = current;
    if (fen[nextPosition] != 0) return [];
    let longestPaths = [];
    let fenCopy = fen.slice(0,fen.length);
    fenCopy[nextPosition] = fenCopy[position];
    fenCopy[obstacle] = 0;
    fenCopy[position] = 0;
    let nextState = new State(fenCopy,this.color);
    let meerslag = false;
    let followUpJumps = nextState.getPieceJumps(nextPosition,direction);  // continue same direction
    if (followUpJumps.length > 0) {
      meerslag = true;
      for (let j=0; j<followUpJumps.length; j++) longestPaths.push([nextState,...followUpJumps[j]]);
    }
    followUpJumps = nextState.getPieceJumps(nextPosition,(direction+1)%4); // turn around one quarter
    if (followUpJumps.length > 0) {
      meerslag = true;
      for (let j=0; j<followUpJumps.length; j++) longestPaths.push([nextState,...followUpJumps[j]]);
    }
    followUpJumps = nextState.getPieceJumps(nextPosition,(direction+3)%4);  // turn the other way
    if (followUpJumps.length > 0) {
      meerslag = true;
      for (let j=0; j<followUpJumps.length; j++) longestPaths.push([nextState,...followUpJumps[j]]);
    }
    if (!meerslag) longestPaths.push([nextState]);
    return longestPaths;
  }
  getKingMoves(position,direction) {
    let fen = this.fen;
    if (fen[position] <= 2) return [];
    let row = parseInt(position/5);
    let isEven = 1 - row%2;
    let dCode = [-6,-5,5,4];
    let step = dCode[direction];
    let current = position;
    let boundary = ((current+5)%10 == 0 && direction%3 == 0) ||  ((current+6)%10 == 0 && direction%3 != 0);
    if (boundary) return [];
    current = position + step + isEven; isEven = 1 - isEven;
    boundary = false;
    let nextPosition = [];
    while (current<50 && current>=0 && fen[current] == 0 && !boundary) {
      nextPosition.push(current);
      boundary = ((current+5)%10 == 0 && direction%3 == 0) ||  ((current+6)%10 == 0 && direction%3 != 0);
      current += step + isEven;
      isEven = 1 - isEven;
    }
    if (nextPosition.length == 0) return [];
    let longestPaths = [];
    for (let i=0; i<nextPosition.length; i++) {
      let fenCopy = fen.slice(0,fen.length);
      fenCopy[nextPosition[i]] = fenCopy[position];
      //fenCopy[obstacle] = 0;
      fenCopy[position] = 0;
      let nextState = new State(fenCopy,this.color);
      longestPaths.push([nextState]);
    }
    return longestPaths;
  }
  getPieceMoves(position,direction) {
    let fen = this.fen;
    if (fen[position] > 2 || fen[position] == 0) return [];
    if (fen[position] == 1 && (direction == UPLEFT || direction == UPRIGHT)) return [];
    if (fen[position] == 2 && (direction == DOWNLEFT || direction == DOWNRIGHT)) return [];
    let row = parseInt(position/5);
    let isEven = 1 - row%2;
    let dCode = [-6,-5,5,4];
    let step = dCode[direction];
    let current = position;
    let boundary = ((current+5)%10 == 0 && direction%3 == 0) ||  ((current+6)%10 == 0 && direction%3 != 0);
    if (boundary) return [];
    current = position + step + isEven; isEven = 1 - isEven;
    let nextPosition = current;
    let longestPaths = [];
    if (nextPosition < 50 && nextPosition >= 0 && fen[nextPosition] == 0) {
      let fenCopy = fen.slice(0,fen.length);
      fenCopy[nextPosition] = fenCopy[position];
      //fenCopy[obstacle] = 0;
      fenCopy[position] = 0;
      let nextState = new State(fenCopy,this.color);
      longestPaths.push([nextState]);
    }
    return longestPaths;
  }
  evaluate() {
    let v = 0;
    for (let i=0; i<50; i++) {
      if (this.fen[i] == 1) v--;
      if (this.fen[i] == 2) v++;
      if (this.fen[i] == 3) v-=10;
      if (this.fen[i] == 4) v+=10;
    }
    return v + Math.random();
  }
  show() {
    for (let i=0; i<50; i++) {
      if (this.fen[i] == 0) drawNothing(i);
      if (this.fen[i] == 1) {drawNothing(i); drawPiece('black',i);}
      if (this.fen[i] == 2) {drawNothing(i); drawPiece('white',i);}
      if (this.fen[i] == 3) {drawNothing(i); drawKing('black',i);}
      if (this.fen[i] == 4) {drawNothing(i); drawKing('white',i);}
    }
    let color = this.color ? COLORLIGHTPIECE: COLORDARKPIECE;
    aanZet.setAttributeNS(null,'fill',color);
  }
}

function setupGame() {
  drawBoard();
  createNotationPanel();
  for (let i=-1; i<50; i++) {
    createKing('white',i);
    createPiece('white',i);
    createKing('black',i);
    createPiece('black',i);
  }
  for (let i=0; i<50; i++) drawNothing(i);
  let bakje = document.getElementById('bakMetStenen');
  parent = bakje.parentElement;
  parent.removeChild(bakje);
  parent.appendChild(bakje);
  console.log(parent.id);
  createDashboard(parent,'Wit',4500,1000,5);
  createDashboard(parent,'Zwart',6000,1000,5);
  volumeWit = document.getElementById('volumeKnop_Wit');
  volumeZwart =  document.getElementById('volumeKnop_Zwart');
  aanUitWit = document.getElementById('aanUitKnop_Wit');
  aanUitZwart = document.getElementById('aanUitKnop_Zwart');
  volumeWit.addEventListener('mouseup',hervatSpel);
  volumeZwart.addEventListener('mouseup',hervatSpel);
  aanUitWit.addEventListener('mouseup',hervatSpel);
  aanUitZwart.addEventListener('mouseup',hervatSpel);
  s = null;
}

function setDashBoard(name,volume) {
  let knop = document.getElementById('volumeKnop_' + name);
  let aanUit = document.getElementById('aanUitKnop_' + name);
  if (volume == 0) {
    aanUit.setAttributeNS(null,"fill",'rgb(255 0 0)');
    knop.setAttributeNS(null,'transform','rotate(-180)');
    knop.setAttributeNS(null,'stroke','rgb(255 0 0)');
    document.getElementById("neonLight_" + name).setAttributeNS(null,'stroke','rgb(255 0 0)');  }
  else {
    aanUit.setAttributeNS(null,"fill",'rgb(0 255 0)');
    document.getElementById("neonLight_" + name).setAttributeNS(null,'stroke','rgb(0 255 0)');
    let phi = 30*(volume - 5);
    if (phi < -180) phi = 30*(volume - 17);
    phi = phi.toString();
    knop.setAttributeNS(null,'transform','rotate(' + phi + ')');
    knop.setAttributeNS(null,'stroke','rgb(0 255 0)');
  }
}

function hervatSpel() {
  console.log('ookjier');
  if (s==null) { document.getElementById('comments').textContent = 'Spel niet opgestart!'; return; }
  if (s.color && getDashBoardStatus('Wit').volume == 0) return;
  if (!s.color && getDashBoardStatus('Zwart').volume == 0) return;
  console.log('hallo');
  let aantalZetten = sIndex;
  while (aantalZetten < 162) {
    computerMove();
    aantalZetten++;
  }
}

function nieuweStelling(e) {
  gameMode = 'adapt';
  stelling.parentElement.removeChild(stelling);
  document.getElementById('startText').textContent = 'Bevestig stelling';
  let initFen = [];
  for (let i=0; i<50; i++) initFen.push(0);
  s = new State(initFen,white);
  sIndex = 0;
  lastElement = 0;
  sList = [s];
  setDashBoard('Wit',0);
  setDashBoard('Zwart',0);
  //pauzeWit.setAttributeNS(null,'pauzeIsTrue','true');
  //pauzeZwart.setAttributeNS(null,'pauzeIsTrue','true');
  s.show();
}

function nieuwSpel() {
  if (document.getElementById('startText').textContent == 'Bevestig stelling') {
    document.getElementById('startText').textContent = 'Nieuw spel';
    document.getElementById('svgAll').setAttributeNS(null,'cursor','');
    document.getElementById('svgAll').appendChild(stelling);
    gameMode = 'play';
    hervatSpel();
    return;
  }
  setDashBoard('Wit',0);
  setDashBoard('Zwart',0);
  let initFen = [];
  for (let i=0; i<20; i++) initFen.push(1); // de zwarte stenen 3: zwarte dam
  for (let i=0; i<10; i++) initFen.push(0); // de lege velden
  for (let i=0; i<20; i++) initFen.push(2); // de witte stenen  4: witte dam
  s = new State(initFen,white);
  sIndex = 0;
  lastElement = 0;
  sList = [s];
  let color = s.color ? COLORLIGHTPIECE: COLORDARKPIECE;
  aanZet.setAttributeNS(null,'fill',color);
  s.show();
  //showNotation(sList);
  hervatSpel();
}

 setupGame();
