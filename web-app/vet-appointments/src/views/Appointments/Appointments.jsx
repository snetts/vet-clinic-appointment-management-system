import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import BookAppointment from "views/Appointments/BookAppointment.jsx";
import { getData, deleteData } from "utility/API.jsx";
import { processAppointments } from "utility/AppointmentUtil.jsx";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  textField: {
    width: 200
  }
};

class Appointments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      allAppointments: [],
      currentAppointments: []
    };
  }

  componentDidMount() {
    this.loadComponent();
  }

  loadComponent = () => {
    getData("http://localhost:8080/api/v1/appointment")
      .then(response => processAppointments(response))
      .then(allAppointments => {
        this.setState({
          allAppointments: allAppointments
        });
      })
      .catch(error => console.error(error));
  };

  cancelAppointment = (id, event) => {
    console.log(event);
    deleteData("http://localhost:8080/api/v1/appointment/" + id).then(() =>
      this.loadComponent()
    );
  };

  render() {
    return (
      <div>
        <BookAppointment onSuccess={this.loadComponent} />
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={this.props.cardTitleWhite}>All Appointments</h4>
              </CardHeader>
              <CardBody>
                <Table
                  onRowButtonClick={this.cancelAppointment}
                  tableHeaderColor="primary"
                  tableHead={["#", "Pet", "Vet", "Appointment Slot", "Cancel"]}
                  tableData={this.state.allAppointments}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Appointments.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(Appointments);
