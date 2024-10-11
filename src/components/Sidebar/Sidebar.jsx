import { useEffect, useState } from "react";
import CIcon from "@coreui/icons-react";
import {
  cilHome,
  cilChartLine,
  cilAccountLogout,
  cilPlus,
  cilFactory,
  cilTag,
  cilExitToApp,
} from "@coreui/icons";
import { CSidebar, CSidebarNav, CNavItem } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";

import styles from "./Sidebar.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

import ModalComponent from "../Modal/ModalComponent";
import { decodeJWT, validateJWT } from "../../service/jwtService";

function SideNavBar() {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalFunc, setModalFunc] = useState();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  function logout() {
    sessionStorage.clear();
    localStorage.clear();
    setShowModal(false);
    window.location.reload();
  }

  function confirmLeave() {
    setModalData({
      title: "Sair?",
      text: "Deseja mesmo sair? As informações não salvas serão perdidas.",
      btnCancel: "Fechar",
      btnConfirm: "Sair",
    });
    setShowModal(true);
    setModalFunc(() => logout);
  }

  useEffect(() => {
    async function checkLoggedUser() {
      const token = sessionStorage.getItem("token");
      const email = sessionStorage.getItem("email");

      if (!token || !email) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      const isValidUser = await validateJWT(token, email);
      if (isValidUser) {
        const decodedUser = decodeJWT(token);
        setUser(decodedUser);
      } else {
        setUser(null);
      }

      setIsLoading(false);
    }

    checkLoggedUser();
  }, []);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={styles.sidebar}>
      <CSidebar
        className="border-end"
        colorScheme="dark"
        placement="start"
        unfoldable
        style={{ height: "100vh" }}
      >
        <CSidebarNav>
          <CNavItem href="/">
            <CIcon customClassName="nav-icon" icon={cilHome} /> Home{" "}
          </CNavItem>
          {!user && (
            <CNavItem href="/login">
              <CIcon customClassName="nav-icon" icon={cilAccountLogout} /> Login{" "}
            </CNavItem>
          )}
          <>
            <CNavItem href="/create">
              <CIcon customClassName="nav-icon" icon={cilPlus} /> Cadastrar
              Processo{" "}
            </CNavItem>
            <CNavItem href="/partnumber">
              <CIcon customClassName="nav-icon" icon={cilTag} /> Cadastrar
              PartNumber{" "}
            </CNavItem>
            <CNavItem href="/vsm">
              <CIcon customClassName="nav-icon" icon={cilFactory} /> VSM{" "}
            </CNavItem>
            <CNavItem href="/relatorio">
              <CIcon customClassName="nav-icon" icon={cilChartLine} /> Relatório{" "}
            </CNavItem>
          </>
          {user && (
            <CNavItem
              href="/"
              onClick={(event) => {
                event.preventDefault();
                confirmLeave();
              }}
            >
              <CIcon customClassName="nav-icon" icon={cilExitToApp} /> Sair{" "}
            </CNavItem>
          )}
        </CSidebarNav>
      </CSidebar>
      <ModalComponent
        isOpened={showModal}
        onClose={handleCloseModal}
        data={modalData}
        confirmOnClick={modalFunc}
      />
    </div>
  );
}

export default SideNavBar;
