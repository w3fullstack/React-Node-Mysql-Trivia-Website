import React, { Component } from 'react';

class Exam extends Component {

    constructor(props) {
        super(props);
        this.state = {
            response: '',
            data: [],
            newdata: []
          };
       //this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.callApi()
          .then(res => this.setState({ response: res.result }))
          .catch(err => console.log(err));
      }
    
      callApi = async () => {
        const response = await fetch('/api/questions');
        const body = await response.json();
    
        if (response.status !== 200) throw Error(body.message);
    
        return body;
      };

      handleChange(e) {
        var key = e.target.getAttribute('data-key');
        this.state.newdata[key] = e.target.value;
      }
      checkAnswer(e) {
        var key = e.target.getAttribute('data-key');
        alert(this.state.newdata[key]);
        if (this.state.data[key].answer == this.state.newdata[key])
            alert("you are right");
        else {
            this.state.newdata[key] = '';
            alert("wrong");
        }
      }
   render() {
    const messages = Object.keys(this.state.response).map((key) => {
        this.state.data[key] = this.state.response[key];
        return (
            <div className="question-box" key={key}>
                <table><tbody>
                    <tr>
                        <td className="question">{this.state.data[key].question}</td>
                        <td className="answer">
                            <input type = "text" value = {this.state.newdata[key]} placeholder="Enter Answer" data-key={key} onChange={this.handleChange.bind(this)}/>
                            <br></br><br></br>
                            <button data-key={key} onClick={this.checkAnswer.bind(this)}>Check</button>
                        </td>
                    </tr>
                </tbody></table>
            </div>
        )
    })

        return (
            <div>
                <h1>Examination</h1>
                {messages}
            </div>
        );
   }
}
export default Exam;