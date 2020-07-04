import React, { Component } from 'react';
import firebase from "../../firebase";
import { Button, Row, Container, Col, Form } from "react-bootstrap";
import { storage } from "../../firebase";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Dropdown from "./dropdown";


class Employees extends Component {


    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            phone:"",
            address:"",
            allInputs: {
                imgUrl:""
            },
            imageAsFile: null,
            imageAsUrl:allInputs
          }
    }

    



    render() { 
        return ( 
            
         );
    }
}
 
export default Employees;