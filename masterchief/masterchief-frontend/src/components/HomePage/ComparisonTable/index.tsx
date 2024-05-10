import React from "react";
import HandBuiltPCImage from "../../../assets/img/new-build/build.avif";
import PreBuiltPCImage from "../../../assets/img/new-build/prebuilt.png";
import "../Home.css";
import {CheckIcon} from "../../../assets/icons/icons";

const HomePageComparisonTable = () => {
    return (
        <div className="container mw-100">
            <div className="container d-flex justify-content-center p-5" style={{width: "75rem"}}>
                <div className="container text-center">
                    <div>
                        <h4 className="mb-4 comparison-title">Why Our Service Benefits You</h4>
                        <p className="text-muted comparison-text">Our service is designed to provide you with superior value and
                            performance compared to retail store pre-built options.</p>
                        <div>
                            <table className="table table-striped table-hover table comparison-table">
                                <thead>
                                <tr>
                                    <th></th>
                                    <th style={{color: "#333333"}}>Retail Store Pre-Built</th>
                                    <th style={{color: "#333333"}}>Prototype Hand-Built</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="align-middle">Entry-level performance
                                        (i5-12400, RTX 4060, 1TB SSD, 12GB RAM)
                                    </td>
                                    <td><CheckIcon/></td>
                                    <td><CheckIcon/> *(16GB RAM)</td>
                                </tr>
                                <tr>
                                    <td className="align-middle">Quality parts from
                                        recognized manufacturers (Corsair, MSI, NZXT, EVGA, etc.)
                                    </td>
                                    <td></td>
                                    <td><CheckIcon/></td>
                                </tr>
                                <tr>
                                    <td className="align-middle">Optimized ventilation
                                        system
                                    </td>
                                    <td></td>
                                    <td><CheckIcon/></td>
                                </tr>
                                <tr>
                                    <td className="align-middle">Professional cable
                                        management
                                    </td>
                                    <td></td>
                                    <td><CheckIcon/></td>
                                </tr>
                                <tr>
                                    <td className="align-middle">Built to last and
                                        evolve
                                    </td>
                                    <td></td>
                                    <td><CheckIcon/></td>
                                </tr>
                                <tr>
                                    <td className="align-middle">Refined and personalized
                                        aesthetics
                                    </td>
                                    <td></td>
                                    <td><CheckIcon/></td>
                                </tr>
                                <tr>
                                    <td className="align-middle">Includes Windows 10/11,
                                        Microsoft Office, and configuration
                                    </td>
                                    <td></td>
                                    <td><CheckIcon/></td>
                                </tr>
                                <tr>
                                    <td className="align-middle">
                                        Equipment warranty
                                    </td>
                                    <td><CheckIcon/></td>
                                    <td><CheckIcon/></td>
                                </tr>
                                <tr>
                                    <td className="align-middle">Service warranty
                                    </td>
                                    <td></td>
                                    <td><CheckIcon/></td>
                                </tr>
                                <tr>
                                    <th scope="col" className="align-middle" style={{color: "#333333"}}>PRICE</th>
                                    <th scope="col">$1200</th>
                                    <th scope="col">$1150</th>
                                </tr>
                                <tr>
                                    <th scope="col" className="align-middle"></th>
                                    <th scope="col">
                                        <div className="p-3">
                                            <img src={PreBuiltPCImage} alt="Custom PC" style={{height: '200px'}}/>
                                        </div>
                                    </th>
                                    <th scope="col">
                                        <div className="p-3">
                                            <img src={HandBuiltPCImage} alt="Custom PC" style={{height: '200px'}}/>
                                        </div>
                                    </th>
                                </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePageComparisonTable;
