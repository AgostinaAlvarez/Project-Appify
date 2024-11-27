import React, { useState, useContext, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import PrincipalCard from "../../../../components/Card/PrincipalCard";
import { useNavigate } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { Button, ConfigProvider, DatePicker, Table } from "antd";
import { AiOutlineLink } from "react-icons/ai";
import AddMoreBtn from "../../../../components/Buttons/AddMoreBtn";
import Filter from "../../../../components/Filter/Filter";
import SelectComp from "../../../../components/Select/SelectComp";
import { AppContext } from "../../../../context/AppContext";
import { updateSubMenuAsideOptions } from "../../../../utils/helpers";
import { ModalFintoc, TablaFintoc } from "../../Conciliacion/ModalFintoc";
import axios from "axios";

const CuentasDetail = () => {
  const navigate = useNavigate();
  const { setModal, setModalContent, linkIdFintoc, movements, balance } =
    useContext(AppContext);

  useEffect(() => {
    console.log("balance cuentasdetail:", balance);
    // console.log(
    //   "balance cuentasdetail saldo actual:",
    //   balance ? balance[0].saldo_actual : "Loading..."
    // );
  });

  const [fintocLinked, setFintocLinked] = useState(false);

  function AddTransacion() {
    navigate("/transaction/new");
  }

  const handleComplete = () => {
    if (!linkIdFintoc) {
      setModal(false);
    }
  };
  const handleClick = () => {
    setModal(true);
    setModalContent(<ModalFintoc onComplete={handleComplete} />);
  };

  useEffect(() => {
    if (linkIdFintoc) {
      setFintocLinked(true);
      localStorage.setItem(fintocLinked, true);
      console.log("Fintoc vinculado en localStorage.");
    }
  }, [linkIdFintoc]);

  const desvincular = () => {
    setFintocLinked(false);
    localStorage.removeItem(fintocLinked);
    console.log("Fintoc desvinculado en localStorage.");
    desvincularDb();
  };

  const desvincularDb = async () => {
    try {
      const response = await axios.delete(
        `https://appify-black-side.vercel.app/conciliacion/bankUnlink/${linkIdFintoc}`
      );
      console.log("res unlink bank:", response);
    } catch (error) {
      console.error("Error unlinking bank:", error);
    }
  };
  const { menuOptions, setMenuOptions } = useContext(AppContext);

  //abrir el submenu cuando se renderice este componente
  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(
      menuOptions,
      "Finanzas",
      "/banks"
    );
    setMenuOptions(updateData);
  }, []);

  return (
    <>
      <div className="principal-container-column">
        <div
          className="row"
          onClick={() => {
            //navigate('/payment_groups')}} style={{fontSize:13,gap:5,color:"grey",cursor:"pointer"}
            navigate("/banks");
          }}
        >
          <FaArrowLeftLong />
          <span>Volver a cuentas bancarias</span>
        </div>
        <PrincipalCard>
          <div className="principal-container-column">
            <div className="container-item-flex-end">
              <AiFillEdit style={{ fontSize: 24, color: "grey" }} />
            </div>
            <div className="row-space-btw">
              <h1>Nombre del banco</h1>
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      colorPrimary: `#22D695`,
                      colorPrimaryHover: `#22D695`,
                      colorPrimaryActive: `#22D695`,
                      lineWidth: 0,
                    },
                  },
                }}
              >
                <Button
                  onClick={fintocLinked ? desvincular : handleClick}
                  type="primary"
                  size="large"
                  style={{ display: "flex", alignItems: "center", gap: 15 }}
                >
                  <AiOutlineLink style={{ color: "#ffffff" }} />
                  <span>
                    {fintocLinked ? "Desvincular fintoc" : "Vincular fintoc"}
                  </span>
                </Button>
              </ConfigProvider>
            </div>
            <div className="principal-grid grid-3-columns">
              <div
                className="column"
                style={{ alignItems: "center", justifyContent: "center" }}
              >
              <span className="proyectos-detail-grid-value">
                  {balance
                    ? balance.length > 0
                      ? balance[0].saldo_actual
                      : "No data"
                    : "Loading..."}
                </span>
                <span>Saldo actual</span>
              </div>
              <div
                className="column"
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <span className="proyectos-detail-grid-value">
                  Activo circulante
                </span>
                <span>Tipo de cuenta</span>
              </div>
              <div
                className="column"
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <span className="proyectos-detail-grid-value">Automatic</span>
                <span>Documentos permitidos</span>
              </div>
            </div>
          </div>
        </PrincipalCard>
        <PrincipalCard>
          <div className="principal-container-column">
            <div className="row-space-btw">
              <h2>Transacciones</h2>
              <AddMoreBtn label={"Agregar"} HanldeClick={AddTransacion} />
            </div>

            <Filter>
              <div className="filter-menu-item">
                <DatePicker picker="week" />
              </div>

              <div className="filter-menu-item">
                <SelectComp
                  placeholder={"Estado"}
                  options={[
                    {
                      value: "Aprobado",
                      label: "Aprobado",
                    },
                    {
                      value: "Pendiente",
                      label: "Pendiente",
                    },
                    {
                      value: "En proceso",
                      label: "En proceso",
                    },
                  ]}
                />
              </div>
            </Filter>
            {fintocLinked && (
              <TablaFintoc movements={movements} balance={balance} />
            )}
          </div>
        </PrincipalCard>
      </div>
    </>
  );
};

export default CuentasDetail;
