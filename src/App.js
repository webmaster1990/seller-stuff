import React, {Component} from 'react';
import KeyWordSelector from './KeyWordSelector';
import KeyUsedSelector from './KeyUsed';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phraseText: '',
      phraseList: [],
      uniquePhrases: [],
      uniqueWords: [],
      selectedWords: {},
      wordFinder: 'WordFinder'
    }
    this.hideShow = this.hideShow.bind(this);
  }

  hideShow(value) {
      this.setState({
        wordFinder: value
      });
  }

  render() {

    return (
      <div className="App">
        <div>
          <input type="button" value='Key Word Finder' onClick={()=>this.hideShow('WordFinder')}/>
          &nbsp;&nbsp;
          <input type="button" value='Scribble' onClick={()=>this.hideShow('Scribble')}/>
        </div>
        <div className={`${this.state.wordFinder === 'Scribble' ? 'hide' : ''}`}><KeyWordSelector/></div>
        <div className={`${this.state.wordFinder === 'WordFinder' ? 'hide' : ''}`}><KeyUsedSelector/></div>
      </div>
    );
  }
}

export default App;
