import React, {Component} from 'react';
import _ from 'lodash';


class KeyUsedSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            keyWords : [],
            Words: [],
            title : '',
            description : '',
            keyword1 : '',
            keyword2: '',
            keyword3: '',
            keyword4: '',
            keyword5: '',
            bulletPoint1: '',
            bulletPoint2: '',
            bulletPoint3: '',
            bulletPoint4: '',
            bulletPoint5: '',
            unUsedKeywords: [],
            usedKeywords: [],
        }
        this.makeSentanceOrKeyWord = this.makeSentanceOrKeyWord.bind(this);
    }

    makeSentanceOrKeyWord = (e) => {
        let str = this.state.text;
        let keywords = str.split('\n');
        keywords = _.filter(keywords,(function(val){
            if(val && val.trim() !== ''){
                return val;
            }
        }));
        str = keywords.join(' ');
        let Words = str.split(' ')
        this.setState({
            keyWords : keywords,
            text : str,
            Words: Words,
        });
    }

    onChangeText = (e) => {

        let { Words, title, description, keyword1, keyword2, keyword3, keyword4, keyword5, bulletPoint1, bulletPoint2, bulletPoint3, bulletPoint4, bulletPoint5 } = this.state;
        let text = {
            title: title,
            description: description.trim(),
            description: description.trim(),
            keyword1: keyword1.trim(),
            keyword2: keyword2.trim(),
            keyword3: keyword3.trim(),
            keyword4: keyword4.trim(),
            keyword5: keyword5.trim(),
            bulletPoint1: bulletPoint1.trim(),
            bulletPoint2: bulletPoint2.trim(),
            bulletPoint3: bulletPoint3.trim(),
            bulletPoint4: bulletPoint4.trim(),
            bulletPoint5: bulletPoint5.trim(),
        }
        text[e.target.name] = e.target.value
        let mergedtext = ''
        Object.keys(text).forEach(j=>{
            mergedtext += ' ' +text[j];
        });

        let keywords = mergedtext.split('\n');
        keywords = _.filter(keywords,(function(val){
            if(val && val.trim() !== ''){
                return val;
            }
        }));
        let str = keywords.join(' ');
        let wordArray = str.split(' ')
        let usedKeywords =[]
        let unUsedKeywords =[]

        Words.forEach(i=>{
            if (wordArray.indexOf(i) !== -1) {
                usedKeywords.push(i)
            }
            else {
                unUsedKeywords.push(i)
            }
        })

        this.setState({
            [e.target.name]: e.target.value,
            usedKeywords,
            unUsedKeywords
        },
        )
    }

    render() {
        let {text, title, description, keyword1, keyword2, keyword3, keyword4, keyword5, bulletPoint1, bulletPoint2, bulletPoint3, bulletPoint4, bulletPoint5, unUsedKeywords, usedKeywords, } = this.state;
        let unUsedKeywordsValue = unUsedKeywords.join(' ')
        let usedKeywordsValue = usedKeywords.join(',')
        let isDIsplay = title !== '' || description!== '' || keyword1!== '' || keyword2!== '' || keyword3!== '' || keyword4!== '' || keyword5!== '' || bulletPoint1!== '' || bulletPoint2!== '' || bulletPoint3!== '' || bulletPoint4!== '' || bulletPoint5!== '';
        return (
            <div className="App">
                <h2 style={{marginTop:15}}>SCRIBBLE</h2>
                <div className="mainApp">
                    <div className="left">
                        {
                            isDIsplay &&
                            <div>
                                <h4>UnUsed Words</h4>
                                <textarea className="disabled" value={unUsedKeywordsValue} disabled={true}> </textarea>
                                <h4>UnUsed Words</h4>
                                <textarea className="disabled" value={usedKeywordsValue}  disabled={true}> </textarea>
                            </div>
                        }

                        <h4>Enter KeyWords</h4>
                        <textarea value={text} onChange={(e)=>this.setState({text: e.target.value})} onBlur={(e)=>this.makeSentanceOrKeyWord(e)} > </textarea>
                    </div>
                    <div className="use-keyword">
                        <h4>Title and Description</h4>
                        <fieldset>
                            <div className="m-t">
                                <label>Title</label><br/>
                                <textarea value={title} name="title"  className="textbox"  onChange={this.onChangeText} > </textarea>
                            </div>
                            <div className="m-t">
                                <label>Description</label><br/>
                                <textarea value={description} name="description" className="textbox"  onChange={this.onChangeText} > </textarea>
                            </div>
                        </fieldset>
                        <h4>Bullets and Keywords</h4>
                        <fieldset className="bullets">
                        <div className="right w100 m-t">
                            <div className="w50">
                                <div className="m-t">
                                    <label>Keywords #1</label><br/>
                                    <textarea value={keyword1} name="keyword1" className="mini-textbox"  onChange={this.onChangeText} > </textarea>
                                </div>
                                <div className="m-t">
                                    <label>Keywords #2</label><br/>
                                    <textarea value={keyword2} name="keyword2"  className="mini-textbox"  onChange={this.onChangeText} > </textarea>
                                </div>
                                <div className="m-t">
                                    <label>Keywords #3</label><br/>
                                    <textarea value={keyword3} name="keyword3" className="mini-textbox"  onChange={this.onChangeText} > </textarea>
                                </div>
                                <div className="m-t">
                                    <label>Keywords #4</label><br/>
                                    <textarea value={keyword4} name="keyword4" className="mini-textbox"  onChange={this.onChangeText} > </textarea>
                                </div>
                                <div className="m-t">
                                    <label>Keywords #5</label><br/>
                                    <textarea value={keyword5}  name="keyword5" className="mini-textbox"  onChange={this.onChangeText} > </textarea>
                                </div>
                            </div>
                            <div className="w50">
                                <div className="m-t">
                                    <label>Bullet Point #1</label><br/>
                                    <textarea value={bulletPoint1}  name="bulletPoint1" className="mini-textbox"  onChange={this.onChangeText} > </textarea>
                                </div>
                                <div className="m-t">
                                    <label>Bullet Point #2</label><br/>
                                    <textarea value={bulletPoint2}  name="bulletPoint2" className="mini-textbox"  onChange={this.onChangeText} > </textarea>
                                </div>
                                <div className="m-t">
                                    <label>Bullet Point #3</label><br/>
                                    <textarea value={bulletPoint3}  name="bulletPoint3" className="mini-textbox"  onChange={this.onChangeText} > </textarea>
                                </div>
                                <div className="m-t">
                                    <label>Bullet Point #4</label><br/>
                                    <textarea value={bulletPoint4}  name="bulletPoint4" className="mini-textbox"  onChange={this.onChangeText} > </textarea>
                                </div>
                                <div className="m-t">
                                    <label>Bullet Point #5</label><br/>
                                    <textarea value={bulletPoint5}  name="bulletPoint5" className="mini-textbox"  onChange={this.onChangeText} > </textarea>
                                </div>
                            </div>
                        </div>
                        </fieldset>
                    </div>
                </div>
            </div>
        );
    }
}

export default KeyUsedSelector;
