import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class AddQuestion extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            question: '',
            answer: '',
            url: ''
        }
        this.updateQuestion = this.updateQuestion.bind(this);
        this.updateAnswer = this.updateAnswer.bind(this);
        this.onClickAdd = this.onClickAdd.bind(this);
    };
    updateQuestion(e) {
        this.setState({question: e.target.value});
    }
    updateAnswer(e) {
        this.setState({answer: e.target.value});
    }

    callApi = async () => {
        const response = await fetch('/api/questions', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'question': this.state.question,
                'answer': this.state.answer,
            }),
        });
        const body = await response.json();
    
        if (response.status !== 200) throw Error(body.message);
    
        return body;
      };

    onClickAdd(e) {

        this.callApi()
          .then(res => {
              console.log(res);
            this.setState({question: '', answer: '', url: 'http://localhost:3000/Question/'+res.id});
          })
          .catch(err => alert('request failed', err));

    }
    render() {
        return (
            <div>
                <h1>Add a Question</h1>
                <br></br>
                <br></br>
                <span>Question:</span><br></br>
                <input className="App-input" type = "text" value = {this.state.question} placeholder="Enter Question" onChange = {this.updateQuestion} required />
                <br></br><br></br>
                <span>Answer:</span><br></br>
                <input className="App-input" type = "text" value = {this.state.answer} placeholder="Enter Answer" onChange = {this.updateAnswer} required />
                <br></br><br></br>
                <button onClick = {this.onClickAdd}>Add</button>
                <br></br><br></br>
                <a href={this.state.url} target="blank">{this.state.url}</a>
            </div>
        );
    }
}
export default AddQuestion;