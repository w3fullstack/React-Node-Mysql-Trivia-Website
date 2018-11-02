import React, { Component } from 'react';

class UpdateAnswer extends Component {

      constructor(props) {
        super(props);
        this.state = {
            response: '',
            data: []
          };
        this.handleChange = this.handleChange.bind(this);
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
        this.state.data[key].answer = e.target.value;
        this.setState({data: this.state.data});
      }

      UpdateAnswer(e) {
        var key = e.target.getAttribute('data-key');
        fetch('/api/updateanswer', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'id': this.state.data[key].id,
                'answer': this.state.data[key].answer,
            }),
        })
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                this.setState({question: '', answer: ''});
            } else {
                const error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
        })
        .catch(error => { alert('request failed', error); });
      }
   render() {
    const messages = Object.keys(this.state.response).map((key) => {
        this.state.data[key] = this.state.response[key];
        return (
            <div className="question-box" key={key}>
                <table>
                    <tr>
                        <td className="question">{this.state.data[key].question}</td>
                        <td className="answer">
                            <input type = "text" value = {this.state.data[key].answer} placeholder="Enter Answer" data-key={key} onChange={this.handleChange}/>
                            <br></br><br></br>
                            <button data-key={key} onClick={this.UpdateAnswer.bind(this)}>Update</button>
                        </td>
                    </tr>
                </table>
            </div>
        )
    })

        return (
            <div>
                <h1>Update Answer</h1>
                {messages}
            </div>
        );
   }
}
export default UpdateAnswer;