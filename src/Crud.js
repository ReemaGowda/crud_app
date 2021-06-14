import React, { Component } from 'react';

import axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


class Crud extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            users: [
            ],
            name: '',
            email:'',
            password: '',
            id :0
         }
    }

    componentDidMount() {
        axios.get("http://localhost:3000/users")
            .then(result => {
                console.log(result.data)
                
                this.setState({
                    users:result.data
                })
            })
            .catch(error => {
            console.log(error)
        })
    }

    nameChange = (e) => {
        this.setState({
            name:e.target.value
        })
    }

    emailChange = (e) => {
        this.setState({
            email:e.target.value
        })
    }


    passwordChange = (e) => {
        this.setState({
            password:e.target.value
        })
    }

    addHandler = (e,id) => {

        if (id===0) {
            axios.post("http://localhost:3000/users",{name:this.state.name,email:this.state.email,password:this.state.password})
            .then(() => {
                this.componentDidMount();
        })
        } else {
            axios.put(`http://localhost:3000/users/${id}`,{name:this.state.name,email:this.state.email,password:this.state.password})
            .then(() => {
                this.componentDidMount();
        })
        }
       
    }

    deletehandler = (e,id) => {
        axios.delete(`http://localhost:3000/users/${id}`)
            .then(() => {
                this.componentDidMount();
        })
    }

    
    edithandler = (e,id) => {
        axios.get(`http://localhost:3000/users/${id}`)
            .then(result => {
                this.setState({
                    name: result.data.name,
                    email: result.data.email,
                    password: result.data.password,
                    id: result.data.id,
                    
                })
        })
    }

    render() { 
        const {users} = this.state
        return ( 
            <div className="container">
                <form autoComplete="off" onSubmit={(e)=>this.addHandler(e,this.state.id)}>
                    <div className="form-group">
                        <label><b>User name:</b></label>
                        <input type="text" className="form-control" placeholder="User name" name="name" value={this.state.name}
                            onChange={(e) => this.nameChange(e)}  required/>
                    </div>
                    <div className="form-group">
                        <label><b>User Email:</b></label>
                        <input type="email" className="form-control" placeholder="User email" name="email" value={this.state.email}
                             onChange={(e) => this.emailChange(e)} required
                        />
                    </div>
                    <div className="form-group">
                        <label><b>User password:</b></label>
                        <input type="password" className="form-control" placeholder="User password" name="password" value={this.state.password}
                             onChange={(e) => this.passwordChange(e)} required
                        />
                    </div>
                    <input type="submit" className={this.state.id==0 ?'btn btn-primary':'btn btn-success'} value={this.state.id==0 ?'Add':'update'}/>
                </form>
                <table className="table table-border table-bordered text-center table-striped ">
                    <thead>
                        <tr>
                            <th>user id</th>
                            <th>user name</th>
                            <th>user email</th>
                            <th>user password</th>
                            <th>user Edit</th>
                            <th>user Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => (
                                <tr>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.password}</td>
                                    <td><button onClick={(e) => this.edithandler(e, user.id)} className="btn btn-success btn-sm">Edit</button></td>
                                    <td><button onClick={(e) => this.deletehandler(e, user.id)} className="btn btn-danger btn-sm">Delete</button></td>
                                  
                                </tr>
                            ))
                        }

                       
                    </tbody>
              </table>
                
            </div>
         );
    }
}
 
export default Crud;