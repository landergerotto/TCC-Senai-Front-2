import React, { useState } from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

// TODO IMPORT STYLES
// import "../styles.css"; 
import SideNav, {
    Toggle,
    Nav,
    NavItem,
    NavIcon,
    NavText
} from "@trendmicro/react-sidenav";

function SideNavBar(props) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <SideNav className="sidenav" expanded={this.state.isVisible}>
            <SideNav.Toggle
                onClick={() => {
                    setIsVisible( !isVisible );
                }}
            />
            <SideNav.Nav defaultSelected="/Summary">
                <NavItem eventKey="Summary" onSelect={() => this.props.navigate("/")}>
                    <NavIcon>
                        <i
                            class="fa fa-home"
                            style={{ fontSize: "1.5em" }}
                            aria-hidden="false"
                        ></i>
                    </NavIcon>
                    <NavText>Summary</NavText>
                </NavItem>
                <NavItem
                    eventKey="statistics"
                    onSelect={() => this.props.navigate("/statistics")}
                >
                    <NavIcon>
                        <i className="fa fa-bar-chart" style={{ fontSize: "1.5em" }} />
                    </NavIcon>
                    <NavText>Bugs statistics</NavText>
                </NavItem>
                <NavItem
                    eventKey="Bugs types"
                    onSelect={() => this.props.navigate("/types")}
                >
                    <NavIcon>
                        <i className="fa fa-bug" style={{ fontSize: "1.5em" }} />
                    </NavIcon>
                    <NavText>Bugs types</NavText>
                </NavItem>
                <NavItem
                    eventKey="timeline"
                    onSelect={() => this.props.navigate("/timeline")}
                >
                    <NavIcon>
                        <i className="fa fa-line-chart" style={{ fontSize: "1.5em" }} />
                    </NavIcon>
                    <NavText>Bugs timeline</NavText>
                </NavItem>
                <NavItem
                    eventKey="Bugs area"
                    onSelect={() => this.props.navigate("/area")}
                >
                    <NavIcon>
                        <i className="fa fa-area-chart" style={{ fontSize: "1.5em" }} />
                    </NavIcon>
                    <NavText>Bugs area</NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    );
}


export default SideNavBar;
