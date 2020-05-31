import React, { Component } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import './Footer.css';

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <MDBFooter color="white" className="font-small pt-4 mt-4">
                    <MDBContainer fluid className="text-center text-md-left">
                        <MDBRow>
                            <MDBCol md="6">
                                <h5 style={{ color: 'white' }}>From the devs:</h5>
                                <p>
                                    Thank you for visting our school's website!
                                     <br></br>
                                    Disclaimer: This is not the real Thomas Jefferson Elementary
                            </p>
                            </MDBCol>
                            <MDBCol md="6">
                                <h5 style={{ color: 'white' }}>Additional Resources</h5>
                                <a style={{ color: 'white' }} target="_blank" rel="noopener noreferrer" href="http://bedfordtjes.sharpschool.net/">
                                    The real Thomas Jefferson Elementary
                                </a>
                                <div>{" "}</div>
                                <a style={{ color: 'white' }} target="_blank" rel="noopener noreferrer" href="https://jefferson.apsva.us/">
                                    The sequel
                                </a>
                                <div>{" "}</div>
                                <a style={{ color: 'white' }} target="_blank" rel="noopener noreferrer" href="https://tjhsst.fcps.edu/">
                                    The sequel's sequel
                                </a>
                                <div>{" "}</div>
                                <a style={{ color: 'white' }} target="_blank" rel="noopener noreferrer" href="https://www.fcps.edu/node/24745">
                                    Fairfax County Public Schools
                                </a>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                    <div className="footer-copyright text-center py-3">
                        <MDBContainer fluid>

                        </MDBContainer>
                    </div>
                </MDBFooter>
            </div>
        );
    }
}

export default Footer;