import React, { Component } from 'react';

class Question extends Component {

    constructor(props) {
        super(props);
        this.state = {
            response: '',
            requestAnswer: '',
            question: '',
            answer: '',
            id: this.props.match.params.questionid
          };
       this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.callApi()
           .then(res => this.setState({ response: res.result }))
           .catch(err => console.log(err));
      }
    
      callApi = async () => {
        const response = await fetch('/api/questions/'+this.state.id);
        const body = await response.json();
    
        if (response.status !== 200) throw Error(body.message);
    
        return body;
      };

      handleChange(e) {
        var key = e.target.getAttribute('data-key');
        this.setState({requestAnswer: e.target.value});
      }
      checkAnswer(e) {
        var key = e.target.getAttribute('data-key');
        if (this.state.answer == this.state.requestAnswer)
            alert("you are right");
        else {
            this.state.requestAnswer = '';
            alert("wrong");
        }
      }
   render() {
    const messages = Object.keys(this.state.response);

    if (messages.length == 0) 
        return (<h1>Question not found</h1>);
    else  {
        this.state.question = this.state.response[0].question;
        this.state.answer = this.state.response[0].answer;

            return (
                <div className="question-box">
                    <table><tbody>
                        <tr>
                            <td className="question">{this.state.question}</td>
                            <td className="answer">
                                <input type = "text" value = {this.state.requestAnswer} placeholder="Enter Answer" onChange={this.handleChange}/>
                                <br></br><br></br>
                                <button onClick={this.checkAnswer.bind(this)}>Check</button>
                            </td>
                        </tr>
                    </tbody></table>
                </div>
            );
        }
   }
}
export default Question;