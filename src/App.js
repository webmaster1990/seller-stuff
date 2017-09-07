import React, {Component} from 'react';
import _ from 'lodash';
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
    }
  }

  onProcess = () => {
    const {phraseText} = this.state;
    let Words = [];
    let uniqueWords = [];
    let uniquePhrases = [];
    const phrases = phraseText.split(/\n/g).filter(x=>x.trim() !== '').map(x=> {
      return x.trim();
    });
    uniquePhrases = _.uniq(phrases);
    uniquePhrases.forEach(i=> {
      const word = i.split(' ').filter(x=>x.trim() !== '')
      word.forEach(j=> {
        Words.push(j.trim())
      });
    });
    uniqueWords = _.uniq(Words);
    uniqueWords = uniqueWords.map(i=> {
      return {name: i, count: (Words.filter(x=>x === i).length)};
    })
    uniquePhrases = uniquePhrases.map(i=> {
      return {name: i, count: (phrases.filter(x=>x === i).length)};
    })
    console.log(uniquePhrases)
    this.setState({
      uniquePhrases: uniquePhrases,
      uniqueWords: uniqueWords,
    })
  }

  onChange = (event) => {
    let selectedWords = this.state.selectedWords;
    if (event.target.checked) {
      selectedWords = {
        ...this.state.selectedWords,
        [event.target.name]: true,
      }

    } else {
      delete selectedWords[event.target.name]
    }
    this.setState({
      selectedWords: selectedWords,
    });
  }

  remove = (name) => {
    let { uniquePhrases, uniqueWords } = this.state;
    uniquePhrases = uniquePhrases.filter(x=>x.name.indexOf(name) === -1);
    uniqueWords = uniqueWords.filter(x=>x.name.indexOf(name) === -1);
    this.setState({
      uniquePhrases,
      uniqueWords,
    })
  }

  getuniquePhrase = () => {
    const {uniquePhrases, selectedWords} = this.state;
    if (Object.keys(selectedWords).length === 0) {
      return uniquePhrases;
    }
    else {
      let returnObj = [];
      Object.keys(selectedWords).forEach(i=>{
        const matchedPhrases = uniquePhrases.filter(j=>j.name.indexOf(i) !== -1);
        matchedPhrases.forEach(item=> {
          returnObj.push(item);
        })
      });
      return returnObj;
    }
  }

  render() {
    const {phraseText, uniqueWords, selectedWords} = this.state;
    let uniquePhrases = this.getuniquePhrase();
    return (
      <div className="App">
        <div className="mainApp">
          <div className="left">
            <textarea value={phraseText} onChange={(e)=>this.setState({phraseText: e.target.value})}> </textarea>
            <input type="button" value='Process' onClick={this.onProcess}/>
          </div>
          <div className="right">
            <div className="w50">
              <ul>
                {
                  uniqueWords.map((i, index)=>(
                    <li key={index}>
                      <span className="close" onClick={()=>this.remove(i.name)}>X</span>
                      <input type="checkbox" checked={selectedWords[i.name] || false} name={i.name}
                             onChange={this.onChange}/>
                      <label htmlFor={i.name}>
                        {i.name} ({i.count})
                      </label>
                    </li>
                  ))
                }
              </ul>
            </div>
            <div className="w50">
              <ul>
                {
                  uniquePhrases.map((i, index)=>(
                    <li key={index}>
                      <label>
                        {i.name} ({i.count})
                      </label>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
