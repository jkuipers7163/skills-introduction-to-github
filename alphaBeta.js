function alphaBeta(state, spread, alpha, beta, depth) {
  if (spread > 1e8) return {v: state.evaluate(), move: -1, state: state, variant: []};
  let moves = state.getQuickListMoves();
  if (moves.length == 0 && state.color) return {v: -500+depth, move: [], state: state, variant: []};
  if (moves.length == 0 && !state.color) return {v: 500-depth, move: [], state: state, variant: []};
  //if (moves.length == 0 && state.color) {console.log('loss'); return {v: -500-Math.random(), move: [], state: state, variant: []};}
  //if (moves.length == 0 && !state.color) {console.log('win'); return {v: 500+Math.random(), move: [], state: state, variant: []};}
  let sOpt = null;
  let mOpt = [];
  let variant = [];
  if (state.color) {
    let maxEval = -1000000;
    for (let i=0; i<moves.length; i++) {
      let s = new State(moves[i].fen.slice(0,50),black);
      let ab = alphaBeta(s,spread*moves.length,alpha,beta,depth+1);
      if (ab.v > maxEval) {maxEval = ab.v; sOpt = ab.state; mOpt = [s]; variant = [state,...ab.variant];}
      alpha = Math.max(alpha,maxEval);
      if (beta <= alpha) break;
    }
    return {v: maxEval, move: mOpt, state: sOpt, variant: variant};
  }
  if (!state.color) {
    let minEval = 1000000;
    for (let i=0; i<moves.length; i++) {
      let s = new State(moves[i].fen.slice(0,50),white);
      let ab = alphaBeta(s,spread*moves.length,alpha,beta,depth+1);
      let mE = minEval;
      if (ab.v < minEval) {minEval = ab.v; sOpt = ab.state; mOpt = [s]; variant = [state,...ab.variant];}
      beta = Math.min(beta,minEval);
      if (beta <= alpha) break;
    }
    return {v: minEval, move: mOpt, state: sOpt, variant: variant};
  }
}
