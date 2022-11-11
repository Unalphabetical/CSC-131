import React from "react";
import { Grid } from "@mui/material";
import Other from './Other';
import UserInput from "./UserInput";
import Vendia from "./Vendia";
import Cards from "./Cards";

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
       value: '',
       showPassword: false,
       data: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClickShowPassword  = this.handleClickShowPassword.bind(this);
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
    this.setData = this.setData.bind(this);
  }
  
  setData (newData){
    this.setState({data: newData});
  }

  handleChange (event) {
    const value = event.target.value;
    this.setState({value: formatSSN(event.target.value)});
  }

  handleClickShowPassword (event) {
    this.setState({
      showPassword: !this.state.showPassword,
    })
  }

  handleMouseDownPassword (event) {
    event.preventDefault();
  };

  render(){
    return (
      <>
        <Grid container spacing={30}>

          <Grid item xs = {12}>
            <Other />  {/** Travel X Logo */}
          </Grid>

          <Grid item xs = {12} alignItems="center" justifyContent="center">
            <UserInput 
              password={this.state.value}
              showPassword={this.state.showPassword}
              handleChange={this.handleChange}
              handleClickShowPassword={this.handleClickShowPassword}
              handleMouseDownPassword={this.handleMouseDownPassword}
            ></UserInput>
          </Grid>
        </Grid>

        <Vendia ssn={this.state.value} setData={this.setData}></Vendia>

        <Grid container item justifyContent="center" alignItems="center">
          { (this.state.data != null && this.state.data.items != null) && createCard(this.state.data.items[0]) }
        </Grid>

      </>

    );

  }

}

export default App;

function createCard(data) {
  if (data != null){
    return (
      <Cards
      type="DMV"
      firstName={data.firstName}
      lastName={data.lastName}
      dob={data.dob}
      dl={data.dl}
      ></Cards>
    );
  }
}

function formatSSN(value) {
  
  if (!value) return value;
  const ssnLength = value.length;

  // This removes all unnecessary characters
  value = value.replace(/[^\d]/g, '');

  if (ssnLength < 4) return value;

  if (ssnLength < 6) {
    return `${value.slice(0, 3)}-${value.slice(3)}`;
  }

  return `${value.slice(0, 3)}-${value.slice(3, 5)}-${value.slice(5, 9)}`;
}
