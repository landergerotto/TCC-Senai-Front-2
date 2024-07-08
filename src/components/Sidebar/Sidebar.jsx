import React from "react";
import { useNavigate } from "react-router-dom";
import CIcon from '@coreui/icons-react';
import {cilChart, cilDescription, cilSpeedometer, cilCloudDownload, cilLayers, cilPuzzle, cilChartLine } from '@coreui/icons';

import styles from "./Sidebar.module.css";
import { CSidebar, CSidebarHeader, CSidebarBrand, CSidebarNav, CNavTitle, CNavItem, CBadge, CNavGroup, CSidebarFooter, CSidebarToggler } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function SideNavBar(props) {
    const [isVisible, setIsVisible] = React.useState(false);
    const navigate = useNavigate();

    return (
        
        <div className={styles.sidebar}>           
            <CSidebar 
            className="border-end" 
            colorScheme="dark" 
            placement="start" 
            unfoldable
            style={{ height:'10000vh' }}>
                <CSidebarHeader className="border-bottom">
                    <CSidebarBrand>BOSCH</CSidebarBrand>
                </CSidebarHeader>
                <CSidebarNav>
                    <CNavTitle>BPS Cross</CNavTitle>
                    <CNavItem href="#"><CIcon customClassName="nav-icon" icon={cilChart} /> VSM</CNavItem>
                    <CNavItem href="#"><CIcon customClassName="nav-icon" icon={cilDescription} /> Form <CBadge color="primary ms-auto">NEW</CBadge></CNavItem>
                    <CNavGroup
                        toggler={
                            <>
                                <CIcon customClassName="nav-icon" icon={cilChartLine} /> Relatório
                            </>
                        }
                    >
                        <CNavItem href="#"><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Gráficos</CNavItem>
                        <CNavItem href="#"><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Nav dropdown item</CNavItem>
                    </CNavGroup>
                    <CNavItem href="https://coreui.io"><CIcon customClassName="nav-icon" icon={cilCloudDownload} /> Download CoreUI</CNavItem>
                    <CNavItem href="https://coreui.io/pro/"><CIcon customClassName="nav-icon" icon={cilLayers} /> Try CoreUI PRO</CNavItem>
                </CSidebarNav>
            </CSidebar>

        </div>
    );
}

export default SideNavBar;
