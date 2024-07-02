import React from "react";
import { useNavigate } from "react-router-dom";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import styles from "./Sidebar.module.css";
import SideNav, {
    Toggle,
    Nav,
    NavItem,
    NavIcon,
    NavText
} from "@trendmicro/react-sidenav";

function SideNavBar(props) {
    const [isVisible, setIsVisible] = React.useState(false);
    const navigate = useNavigate();

    return (
        <SideNav
            className={styles.sidenav}
            defaultExpanded={isVisible}
            onToggle={(expanded) => setIsVisible(expanded)}
        >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="/Summary">
                <NavItem eventKey="Summary" onSelect={() => navigate("/")}>
                    <NavIcon>
                        <i className="fa fa-home" style={{ fontSize: "1.5em" }} aria-hidden="false"></i>
                    </NavIcon>
                    <NavText>Summary</NavText>
                </NavItem>
                <NavItem eventKey="statistics" onSelect={() => navigate("/statistics")}>
                    <NavIcon>
                        <i className="fa fa-bar-chart" style={{ fontSize: "1.5em" }} />
                    </NavIcon>
                    <NavText>Bugs statistics</NavText>
                </NavItem>
                <NavItem eventKey="Bugs types" onSelect={() => navigate("/types")}>
                    <NavIcon>
                        <i className="fa fa-bug" style={{ fontSize: "1.5em" }} />
                    </NavIcon>
                    <NavText>Bugs types</NavText>
                </NavItem>
                <NavItem eventKey="timeline" onSelect={() => navigate("/timeline")}>
                    <NavIcon>
                        <i className="fa fa-line-chart" style={{ fontSize: "1.5em" }} />
                    </NavIcon>
                    <NavText>Bugs timeline</NavText>
                </NavItem>
                <NavItem eventKey="Bugs area" onSelect={() => navigate("/area")}>
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
