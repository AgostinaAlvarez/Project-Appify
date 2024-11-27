import { useState, useEffect, useContext } from "react";
import FintocWidget from "./FintocWidget";
import SelectComp from "../../../components/Select/SelectComp";
import { App, DatePicker } from "antd";
import axios from "axios";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { TableReusable } from "../../../components/Table/TableReusable";
import { BsArrowRight } from "react-icons/bs";
import { AiOutlineLink } from "react-icons/ai";
const formatCurrency = (value) => {
  const numberValue = parseFloat(value);
  if (isNaN(numberValue)) {
    throw new TypeError("Value is not a number");
  }
  return `$${numberValue.toFixed(2)}`;
};
const formatDate = (date) => new Date(date).toLocaleDateString();
export const ModalFintoc = ({ onComplete }) => {
  const [modal1, setModal1] = useState(true);
  const [widgetCompleted, setWidgetCompleted] = useState(false);
  const [modal2, setModal2] = useState(false);
  // const [accounts, setAccounts] = useState([]);
  const {
    userLoggedData,
    linkIdFintoc,
    setIdFintoc,
    linkToken,
    setLinkToken,
    movements,
    setMovements,
    select2,
    setSelect2,
    balance,
    setBalance,
    accounts,
    setAccounts,
    selectedAccountId,
    setSelectedAccountId,
    selectedBank,
    setSelectedBank,
    fetchAccounts,
    fetchAndPostMovements,
    fetchStoredMovements,
    fetchStoredBalance,
    getAllData,
    cuentaBancoConciliacion,
    storedMovements,
    setStoredMovements,
    updateUser,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const [selectedAccountType, setSelectedAccountType] = useState("");

  const [dateRange, setDateRange] = useState([]);
  const [sinceDate, setSinceDate] = useState("");
  const [untilDate, setUntilDate] = useState("");
  // const [select2, setSelect2]= useState(false);

  //Modal 1

  const handleContinueClick = () => {
    setModal1(false);
  };
  const handleWidgetCompletion = () => {
    setWidgetCompleted(true);
    setModal2(true); // Abre modal2 cuando se completa el widget
  };
  const handleAccountTypeChange = (event) => {
    setSelectedAccountType(event.target.value);
  };
  useEffect(() => {
    if (widgetCompleted) {
      setModal2(true);
    }
  }, [widgetCompleted]);

  useEffect(() => {
    if (widgetCompleted) {
      console.log("El widget se ha completado");
      updateUser();
      setModal2(true); // Abre modal2 cuando se completa el widget
    }
  }, [widgetCompleted]);

  const handleBankChange = (value) => {
    setSelectedBank(value);
  };

  const handleCloseModal = () => {
    setModal1(false);
    setModal2(false);
  };

  const handleDateChange = (dates) => {
    setDateRange(dates);
    if (dates.length === 2) {
      setSinceDate(dates[0].format("YYYY-MM-DD"));
      setUntilDate(dates[1].format("YYYY-MM-DD"));
    }
  };

  const vincularFintoc = async (sinceDate, untilDate, linkToken) => {
    await fetchAccounts();
    try {
      if (!selectedBank) {
        console.error("Falta selected bank.");
      } else if (!selectedAccountId) {
        console.error("Falta selected accountId.");
      } else if (!sinceDate) {
        console.error("Falta selected since.");
      } else if (!untilDate) {
        console.error("Falta selected until.");
      } else {
        console.log(
          "Datos para fetchAndPostMovements:",
          "sinceDate:",
          sinceDate,
          "untilDate:",
          untilDate,
          "linkToken:",
          linkToken,
          "selectedAccountId:",
          selectedAccountId[0].id
        );

        await fetchAndPostMovements(
          sinceDate,
          untilDate,
          linkToken,
          selectedAccountId[0].id,
          setMovements
        );
        await fetchStoredMovements(selectedAccountId[0].id, setStoredMovements);
        await fetchStoredBalance(selectedBank, setBalance);
        await onComplete(movements, balance);
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error vinculando Fintoc:", error);
    }
  };

  const handleAccountIdChange = (value) => {
    setSelectedAccountId(value);
  };
  return (
    <>
      {/* Paso 1 */}
      {modal1 && (
        <>
          <h1>Vincular a fintoc</h1>
          <div
            style={{
              height: "100%",
              width: "90%",
              boxSizing: "border-box",
              padding: "20px 0px",
            }}
            className="principal-container-column"
          >
            <div
              style={{
                backgroundColor: "#b9b9b98d",
                minHeight: "30%",
                width: "100%",
                padding: 20,
                boxSizing: "border-box",
                margin: "auto",
              }}
            >
              <div className="header-fintoc">
                <h2>Tipo de cuenta</h2>
                <p>Seleccione el tipo de cuenta que corresponda</p>
              </div>
              <form className="step-form">
                <div className="principal-container-column">
                  <div className="form-grid-fintoc">
                    <div className="form-row-fintoc" style={{ gap: 5 }}>
                      <span className="form-label">Individual </span>
                      <input
                        type="radio"
                        name="accountType"
                        value="individual"
                        checked={selectedAccountType === "individual"}
                        onChange={handleAccountTypeChange}
                      />
                    </div>
                    <div className="form-row-fintoc" style={{ gap: 5 }}>
                      <span className="form-label">Business</span>
                      <input
                        type="radio"
                        name="accountType"
                        value="business"
                        checked={selectedAccountType === "business"}
                        onChange={handleAccountTypeChange}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="container-item-flex-end" style={{ marginTop: 30 }}>
              <button
                onClick={handleContinueClick}
                className="mt-4 bg-blue-500 hover:bg-grey-700 text-black font-bold py-2 px-4 rounded btn-continuar-fintoc"
              >
                Continuar
                <BsArrowRight />
              </button>
            </div>
          </div>
        </>
      )}
      {/* paso 2 */}
      {!modal1 && !modal2 && (
        <FintocWidget
          onComplete={handleWidgetCompletion}
          accountType={selectedAccountType}
        />
      )}
      {/*Paso 3*/}
      {modal2 && (
        <>
          <h1>Vincular a fintoc</h1>
          <div
            style={{
              height: "100%",
              width: "90%",
              boxSizing: "border-box",
              padding: "20px 0px",
            }}
            className="principal-container-column"
          >
            <div
              style={{
                backgroundColor: "#b9b9b98d",
                minHeight: "30%",
                width: "100%",
                padding: 20,
                boxSizing: "border-box",
                margin: "auto",
              }}
            >
              <div className="header-fintoc">
                <h2>Cuenta</h2>
                <p>
                  Seleccione la cuenta que corresponda , la fecha de inicio
                  sugerida es desde la contratación de Appify.
                </p>
              </div>
              <form className="step-form">
                <div className="principal-container-column">
                  <div className="form-grid-fintoc">
                    {select2 && (
                      <div className="form-row-fintoc" style={{ gap: 5 }}>
                        <span className="form-label">Cuenta 2</span>
                        <SelectComp
                          placeholder={"Seleccione la cuenta"}
                          options={selectedAccountId.map((account) => ({
                            value: account.id,
                            label: account.nombre,
                          }))}
                          onChange={handleAccountIdChange}
                        />
                      </div>
                    )}
                    <div className="form-row-fintoc" style={{ gap: 5 }}>
                      <span className="form-label">Fecha inicio</span>
                      <DatePicker.RangePicker
                        value={dateRange}
                        onChange={handleDateChange}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="container-item-flex-end" style={{ marginTop: 30 }}>
              <button
                onClick={() => vincularFintoc(sinceDate, untilDate, linkToken)}
                className="mt-4 bg-blue-500 hover:bg-grey-700 text-black font-bold py-2 px-4 rounded btn-vincular-fintoc"
              >
                Vincular
                <AiOutlineLink style={{ color: "#ffffff" }} />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export const TablaFintoc = () => {
  const { movements } = useContext(AppContext);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Descrición",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Cantidad",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Fecha de publicación",
      dataIndex: "postDate",
      key: "postDate",
    },
    {
      title: "Tipo",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Moneda",
      dataIndex: "currency",
      key: "currency",
    },
    {
      title: "Referencia",
      dataIndex: "reference_id",
      key: "reference_id",
    },
  ];
  return (
    <>
      <TableReusable dataSource={movements} columns={columns} />
    </>
  );
};
