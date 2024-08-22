import React from "react";
import { useNavigate } from "react-router-dom";
import CIcon from '@coreui/icons-react';
import { cilHome, cilChartLine, cilAccountLogout, cilPlus, cilFactory, cilTag } from '@coreui/icons';

import styles from "./Sidebar.module.css";
import { CSidebar, CSidebarNav, CNavItem } from '@coreui/react';
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
                {/* <CSidebarHeader className="border-bottom">
                    <CSidebarBrand>BOSCH</CSidebarBrand>
                </CSidebarHeader> */}
                <CSidebarNav>
                    {/* <CNavTitle>BPS Cross</CNavTitle> */}
                    <CNavItem href="/"><CIcon customClassName="nav-icon" icon={cilHome} /> Home </CNavItem>
                    <CNavItem href="/login"><CIcon customClassName="nav-icon" icon={cilAccountLogout} /> Login </CNavItem>
                    <CNavItem href="/create"><CIcon customClassName="nav-icon" icon={cilPlus} /> Cadastrar Processo </CNavItem>
                    <CNavItem href="/partnumber"><CIcon customClassName="nav-icon" icon={cilTag} /> Cadastrar PartNumber </CNavItem>
                    <CNavItem href="/vsm"><CIcon customClassName="nav-icon" icon={cilFactory} /> VSM </CNavItem>
                    <CNavItem href="/relatorio"><CIcon customClassName="nav-icon" icon={cilChartLine} /> Relatório </CNavItem>
                    {/* <CNavGroup
                        toggler={
                            <>
                                <CIcon customClassName="nav-icon" icon={cilChartLine} /> Relatório
                            </>
                        }
                    >
                        <CNavItem href="#"><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Gráficos</CNavItem>
                        <CNavItem href="#"><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Nav dropdown item</CNavItem>
                    </CNavGroup> */}
                </CSidebarNav>
            </CSidebar>

        </div>
    );
}

export default SideNavBar;
