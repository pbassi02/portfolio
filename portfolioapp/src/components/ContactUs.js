import React, { Component } from 'react';
import emailjs from 'emailjs-com';

export default class ContactUs extends Component {

  constructor(props){
    super(props)
    this.state = {
      name: "",
      email: "",
      message: ""
    }
  }

  validEmail = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const item = this.state.email ? this.state.email.toLowerCase() : "";
  
    if (!reg.test(item)) return false
    else return true
  }

  sendEmail = () => {
    let emailObject = {
      from_name: this.state.name,
      from_email: this.state.email,
      message: this.state.message
    }

    console.log("Sending Email")

    emailjs.send('service_gmailone', 'template_rs5t06n', emailObject, "user_QQogHTCscSXvxKK2AAaNH")
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });

    this.resetForm()
  }

  resetForm = () => {
    this.setState({
      name: "",
      email: "",
      message: ""
    })
  }


  validateFormValues = () => {
    if(this.validEmail()) this.sendEmail(); //saveContactInfo(name, email, message)
    else alert("Please enter valid email!")
  }

  render() {
    let resumeData = this.props.resumeData;
    return (
      <section id="contact">
          <div className="row section-head">
            <div className="ten columns">
              <p className="lead">
              Contact me
              </p>
              <form>
                <label for="fname">Name
                  <input type="text" id="fname" name="fname" placeholder="Enter name"
                    value={this.state.name}
                    onChange={(event) => this.setState({name: event.target.value})}
                    maxLength={65}
                  />
                </label>
                <label for="fname">Email
                  <input type="text" id="femail" name="femail"  placeholder="Enter email"
                    value={this.state.email}
                    onChange={(event) => this.setState({email: event.target.value})}
                    maxLength={65}
                  />
                </label>
                <label for="fname">Message
                  <textarea id="fmessage" name="fmessage" rows="3" cols="100"  placeholder="Enter message"
                    value={this.state.message}  
                    onChange={(event) => this.setState({message: event.target.value})}
                    maxLength={255}
                  />
                </label>
                <input type="button" value="Submit" onClick={() => this.validateFormValues()}/>
              </form>
            </div>
          </div>
          <div className="row">
            <aside className="eigth columns footer-widgets">
              <div className="widget">
                <h4>Linked in:
                  {" " + resumeData.linkedinId}
                </h4>
              </div>
            </aside>
          </div>
        </section>
        );
  }
}