import React, {Component} from 'react';
import _ from 'lodash';


class KeyWordSelector extends Component {
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

    convertToCsv = (name) => {
        let contents =  this.state[name];
        if(contents.length > 0){
            const header = [[name,'Count']];
            const data = contents.map((content) => {
                const rowData = [];
                rowData.push(content.name);
                rowData.push(content.count);
                return rowData;

            });
            const rowContents = header.concat(data);
            this.download_csv(rowContents.join("\n"), "reports.csv");
        }
    }

    download_csv = (csv, filename) => {
        var csvFile;
        var downloadLink;

        csvFile = new Blob([csv], {type: "text/csv"});
        downloadLink = document.createElement("a");
        downloadLink.download = filename;
        downloadLink.href = window.URL.createObjectURL(csvFile);
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }

    export = () => {
        let { uniquePhrases, uniqueWords } = this.state;
        const header = [['uniqueWords', 'uniquePhrases']];
        const data = [];
        const length = uniquePhrases.length > uniqueWords.length ? uniquePhrases.length : uniqueWords.length;
        for(var i=0; i < length; i++) {
            const rowData = [];
            if (i<uniqueWords.length) {
                rowData.push(uniqueWords[i].name);
            }else {
                rowData.push('');
            }
            if (i<uniquePhrases.length) {
                rowData.push(uniquePhrases[i].name);
            }else {
                rowData.push('');
            }
            data.push(rowData);
        }
        const rowContents = header.concat(data);
        this.download_csv(rowContents.join("\n"), "reports.csv");
    }

    remove = (name) => {
        let { uniquePhrases, uniqueWords } = this.state;
        uniquePhrases = uniquePhrases.filter(x=>x.name.indexOf(name) === -1);
        uniqueWords = uniqueWords.filter(x=>x.name.indexOf(name) === -1);
        this.setState({
            uniquePhrases,
            uniqueWords,
            selectedWords: [],
        })
    }

    removePhrase = (name) => {
        let { uniquePhrases } = this.state;
        uniquePhrases = uniquePhrases.filter(x=>x.name!==name);
        let Words = [];
        let uniqueWords = [];
        uniquePhrases.forEach(i=> {
            const word = i.name.split(' ').filter(x=>x.trim() !== '')
            word.forEach(j=> {
                Words.push(j.trim())
            });
        });
        uniqueWords = _.uniq(Words);
        uniqueWords = uniqueWords.map(i=> {
            return {name: i, count: (Words.filter(x=>x === i).length)};
        })
        this.setState({
            uniquePhrases,
            uniqueWords,
        })
    }

    getUniquePhrase = () => {
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
        let {phraseText, uniqueWords, selectedWords} = this.state;
        let uniquePhrases = this.getUniquePhrase();
        uniqueWords =  _.orderBy(uniqueWords, ['count'],['desc']);
        uniquePhrases =  _.orderBy(uniquePhrases, ['name'],['asc']);
        return (
            <div className="App">
                <h2 style={{marginTop:15}}>KEYWORDS SELECTOR</h2>
                <div className="mainApp">
                    <div className="left">
                        <textarea value={phraseText} onChange={(e)=>this.setState({phraseText: e.target.value})}> </textarea>
                        <input type="button" value='Process' onClick={this.onProcess}/>
                        { (uniqueWords.length > 0 || uniquePhrases.length > 0) && <input style={{marginLeft:15}} type="button" value='Export Both' onClick={this.export}/> }
                    </div>
                    <div className="right">
                        <div className="w50">
                            { uniqueWords.length > 0 && <input type="button" value='Export' onClick={()=>this.convertToCsv('uniqueWords')}/> }
                            <h2><b>Unique Words ({uniqueWords.length})</b></h2>
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
                            { uniquePhrases.length > 0 && <input type="button" value='Export' onClick={()=>this.convertToCsv('uniquePhrases')}/> }
                            <h2><b>Unique Phrases ({uniquePhrases.length})</b></h2>
                            <ul>
                                {
                                    uniquePhrases.map((i, index)=>(
                                        <li key={index}>
                                            <span className="close" onClick={()=>this.removePhrase(i.name)}>X</span>
                                            <label>
                                                {i.name}
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

export default KeyWordSelector;
