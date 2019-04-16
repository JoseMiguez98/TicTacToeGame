import React from 'react';
import {Board} from './Board.jsx'
import './index.css';
  
  
  export class Game extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null)
        }],
        stepNumber: 0,
        isXNext: true
      }
      this.handleClick = this.handleClick.bind(this);
    }


    handleClick(i){
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length-1];
      const squares = current.squares.slice();

      if(calculateWinner(squares) || squares[i]){
        return;
      }

      squares[i] = this.state.isXNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares
        }]),
        stepNumber: history.length,
        isXNext: !this.state.isXNext
      });
    }

    jumpTo(step){
      this.setState({
        stepNumber: step,
        isXNext: (step % 2) === 0
      })
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      const moves = history.map((step, move)=> {
        const description = move ? 'Go to move #' + move : 'Go to game start';
        return (
          <li key={move}><button onClick={()=> this.jumpTo(move) }> {description} </button></li>
        )
      });

      let status;

      if(winner){
        status = "Winner is: " + winner;
      }else{
        status = "Next turn: " + (this.state.isXNext ? "X" : "O");
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares = {current.squares}
              onClick = {this.handleClick}
              status = {status}
            />
          </div>
          <div className="game-info">
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }


  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  