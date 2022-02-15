import React from "react";
import Room from "../Table/Room";
import { connect } from "react-redux";
import { loadRoom } from "../api";
import { roomToStore } from "../redux/actions";
import {addRoom , getLength} from '../api'


class Rooms extends React.Component {
  state = {
    roomsArr: [],
    id: 0,
    idCount: 1,
    length : []
  };

  componentDidMount() {
    const { id } = this.state;
    loadRoom(id).then((data) => {
      this.props.roomToStore(data);
    });
    this.newLength()
  }

  newLength = () => {
    getLength().then((data) => {
      this.setState({length : data});
      console.log(data)
    });
  }

  addNewRoom = () => {
    addRoom();
    this.newLength();
  }

  getRoom = (e) => {
    this.setState({id : e.target.value - 1})
    loadRoom(e.target.value - 1)
    .then((data) => {
      this.props.roomToStore(data);
    });
     
     
  }

  render() {
    const { roomsArr } = this.props;
    const {length} = this.state

    return (
      <div className="rooms">
        <div className="selector">
          <select onChange={this.getRoom}>
            {length.map(item => {
              return<option>{item}</option>
            })}
          </select>
        </div>
        <br></br>
        {roomsArr.length > 0 && (
          <Room
            roomArr={roomsArr}
            callback={this.changeArr}
            roomId={this.state.id}
          />
        )}
        <button onClick={this.addNewRoom}>Добавить комнату</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  roomToStore: (data) => dispatch(roomToStore(data)),
});

const mapStateToProps = (state) => {
  return {
    roomsArr: state.roomsArr,
  };
};

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(Rooms);