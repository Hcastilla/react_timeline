import './../sass/app.sass';
import React from 'react';
import ReactDOM from 'react-dom';

class AddPublucation extends React.Component{
  constructor(props)
  {
    super(props)
    this.state = {
      userName : null,
      text : null
    }
  }
  submit(e){
    e.preventDefault();
    const publication = {
      userName : this.state.userName,
      text: this.state.text,
      likes: 0
    }
    this.props.add(publication);
    this.props.change();
  }
  change(event, element)
  {
    this.state[element] = event.target.value;
    this.setState({
      text: this.state.text,
      userName: this.state.userName
    });
  } 
  render()
  {
    return(
     <div className="addPublication">
      <form onSubmit={this.submit.bind(this)}>

        <input type="text" className="custom__item" placeholder="Name" 
          onChange={e => {this.change(e, 'userName')}} required/>

        <input type="text" className="custom__item" placeholder="Text" 
          onChange={e => {this.change(e, 'text')}} required/>

        <div className="addPublication__btns">

          <div className="custom__btn" onClick={this.props.change}>
            <i className="fa fa-close"></i>
          </div>
          <input type="submit" value="GO" className="custom__btn"/>
        </div>

      </form>
     </div>
    )
  }
}   

class Publication extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {
      publication : this.props.publication
    }
  }

  like()
  {
    this.state.publication.likes += 1;
    this.setState({
      publication : this.state.publication
    })
  }
  render(){
    return(
      <div className="publication">
        <span className="publication__userName">
          {this.state.publication.userName}
        </span>
        <div className="publication__content">
        
          {this.state.publication.text}

          <div className="publication__content__likes" 
            onClick={this.like.bind(this)}>
            <i className="fa fa-heart" aria-hidden="true"></i>
            <span>{this.state.publication.likes}</span>
          </div>
        </div>
      </div>
    )
  }
}

class TimeLine extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {
      publications : [],
      addPublication : false
    }
    this.addPublication = this.addPublication.bind(this);
    this.setPublication = this.setPublication.bind(this);
  }

  componentDidMount()
  {
    this.setPublication({
      userName: 'Hernán Castilla',
      text : 'Le vent se lève! . . . il faut tenter de vivre!',
      likes: 100
    });
  }

  addPublication()
  {
    this.setState({
      addPublication : !this.state.addPublication
    })
  }

  setPublication(publication)
  {
    publication = <Publication publication={publication}/>;
    this.setState(
      {
        publications: [... this.state.publications, publication]
      }
    )
  }

  render(){
    return(
      <div className="timeLine">
        <div className="timeLine__addPublication" 
          onClick={this.addPublication}>
          <i className="fa fa-plus" aria-hidden="true"></i>
        </div>
        {this.state.publications}
        { this.state.addPublication == true ? 
          <AddPublucation change={this.addPublication} add={this.setPublication}/> : null }
      </div>
    )
  }
}

ReactDOM.render(<TimeLine />, document.getElementById("app"));
