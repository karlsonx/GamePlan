import React, { Component } from "react";
import RSVPItem from "./RSVPItem.jsx";

class RSVPBox extends Component {
    constructor(props) {
        super(props)
        this.state = ({
          guestsArray : [],
        })
        //
    //    this.deleteGuest = this.deleteGuest.bind(this);
    //    this.addGuest = this.addGuest.bind(this) 
    }

    componentDidMount() {
       //we have hardcoded event ID here, must be changed to a variable
        fetch('/rsvp', {
            method: 'post',
            body: JSON.stringify({"event_id": "5dc9ae30a59286288c8bf539"}),
            headers: {
                "Content-Type": "application/json"
              },
        })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            guestsArray: responseJson,
          });
          console.log(responseJson)
        })
        .catch((error) =>{
            console.error('Possible fetch error',error);
          });
    }

    addGuest(user_name, rsvp) {
        //format 
        fetch('/rsvp/addGuest', {
            method: 'post',
            body: JSON.stringify({
                "user_name": user_name,
                "rsvp" : rsvp,
                //the RSVP is not resolved yet, it was tested with 'false' as default. But when the user is created it's default must be 'undefined' or other that will not break the code.
            }),
            headers: {
                "Content-Type": "application/json"
              },
        })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
          guestArray: responseJson,
          });
        })
        .catch((error) =>{
            console.error('Possible fetch error',error);
          });
        console.log(this.state.todosArray)
    }

    //Function to delete a user from the DB (unfinished)

    // deleteGuest(id) {
    //     fetch('/rsvp/deleteGuest', {
    //         method: 'delete',
    //         body: JSON.stringify({"user_id": id}),
    //         headers: {
    //             "Content-Type": "application/json"
    //           },
    //     })
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //       this.setState({
    //       todosArray: responseJson,
    //       });
    //     })
    //     .catch((error) =>{
    //         console.error('Possible fetch error',error);
    //       });
    //     console.log(id)
    // }

    render() {
        const fetchedGuests = [];
        for (let i = 0; i < this.state.guestsArray.length; i++) {
            const currentGuest = this.state.guestsArray[i];
            fetchedGuests.push(<RSVPItem key={currentGuest._id} user_id={currentGuest._id} user_name={currentGuest.user_name} RSVP={currentGuest.rsvp} />)
        } //end for loop
        console.log('The fetched guests', fetchedGuests)

        return (
          <div className="RSVPList">
            {fetchedGuests}
              <div className="createGuest">
                {/* <Form addTodo={this.addTodo} /> */}
              <button className="addButton">Add Guest</button>
              <input/>
            </div>
          </div>  
        )
    } //end render

}

export default RSVPBox;
