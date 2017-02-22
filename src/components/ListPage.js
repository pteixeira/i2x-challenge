import React, { Component } from 'react';
import moment from 'moment';

class ListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogged: false,
      items: []
    }
  }

  componentWillMount() {
    if (sessionStorage.getItem('token')) {
      this.setState({ isLogged: true });
      const token = sessionStorage.getItem('token');
      /* temp */
      fetch('https://i2x-challenge.herokuapp.com/ai/recording/list/', {
        headers: {
          'Authorization': `JWT ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'GET'
      })
      .then(data => data.json())
      .then(json => this.setState({ items: json.results }));
    }
  }

  logOut() {
    sessionStorage.removeItem('token');
    this.context.router.push('/');
  }

  renderRating(rating) {
    let stars = [];
    for(let i = 0; i < rating; i++) {
      stars.push(<span className="glyphicon glyphicon-star" key={i}></span>)
    }
    return stars;
  }

  renderDuration(duration) {
    const mins = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${seconds > 0 ? mins + 'mins' : ''} ${seconds}secs`;
  }

  playAudio(index) {
    const audioElement = document.getElementById(`audio-${index}`);
    audioElement.currentTime = 0;
    audioElement.play();
  }

  render() {
    return (
      <div className="row is-flex">
        { this.state.items.map((item, i) => {
          return (
            <div className="item col-xs-4" key={`item-${i}`}>
              <div className="item-script">{item.final_script} Script</div>
              <div className="item-rating">
                <strong>Rating:</strong> {this.renderRating(item.rating)}
              </div>
              <div className="item-duration"><strong>Duration:</strong> {this.renderDuration(item.duration)}</div>
              <div className="item-url">
                <audio src={item.url} hidden id={`audio-${i}`}></audio>
                <span className="glyphicon glyphicon-play" onClick={this.playAudio.bind(this, i)}></span>
              </div>
              <div className="item-created">
                <strong>Created At:</strong> {moment(item.created).format('DD-MM-YYYY HH:mm a')}
              </div>
            </div>
          )
        }) }
        <button onClick={this.logOut.bind(this)}>LogOut</button>
      </div>
    );
  }
}

ListPage.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default ListPage;
