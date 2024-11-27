import React, { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../../context/AppContext";
import ReactPaginate from "react-paginate";

const TablaFintoc = () => {
  const [movements, setMovements] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [balance, setBalance] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [linkToken, setLinkToken] = useState("");
  const [sinceDate, setSinceDate] = useState("");
  const [untilDate, setUntilDate] = useState("");
  const { linkIdFintoc } = useContext(AppContext);
  const [selectedUser, setSelectedUser] = useState(
    "temp-user-2b212102-653d-4c01-b0f3-a90e64a23070"
  ); ///check the user, this is wich i update with the user of the session
  const [selectedBank, setSelectedBank] = useState("");
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };
  const offset = currentPage * itemsPerPage;
  const currentMovements = movements.slice(offset, offset + itemsPerPage);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get(
        `https://appify-black-side.vercel.app/conciliacion/alldata/${selectedUser}`
      );
      const conciliationsData = response.data.payload.map(
        (item) => item.conciliacion
      );
      const accountsData = response.data.payload.flatMap(
        (item) => item.cuentas
      );
      setAccounts(conciliationsData);
      setSelectedAccountId(accountsData);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  const renderAccountOptions = () => (
    <select
      value={selectedBank}
      onChange={(e) => {
        setSelectedBank(e.target.value);
      }}
    >
      <option value="">Select a Bank</option>
      {accounts.map((account) => (
        <option key={account.id} value={account.id}>
          {account.id}
        </option>
      ))}
    </select>
  );
  console.log("bank:", selectedBank);

  const renderAccountsDropdown = () => {
    console.log("selectedAccountId", selectedAccountId);
    return (
      <select
        value={selectedAccountId}
        onChange={(e) => {
          setSelectedAccountId(e.target.value);
        }}
      >
        <option value="">Select an Account</option>
        {Array.isArray(selectedAccountId) ? (
          selectedAccountId.map((accountid) => (
            <option key={accountid.account_id} value={accountid.account_id}>
              {accountid.account_id}
            </option>
          ))
        ) : (
          <option key={selectedAccountId} value={selectedAccountId}>
            {selectedAccountId}
          </option>
        )}
      </select>
    );
  };

  const cuentaBancoConciliacion = async () => {
    try {
      const response = await axios.post(
        `https://appify-black-side.vercel.app/conciliacion/createVinculacion`,
        {
          idCuentaBanco: selectedBank,
          idConciliacion: linkIdFintoc,
        }
      );
      console.log("res vinculation bank:", response);
    } catch (error) {
      console.error("Error cuentaBancoConciliacion:", error);
    }
  };

  const updateUser = async () => {
    try {
      const response = await axios.put(
        `https://appify-black-side.vercel.app/conciliacion/update/${linkIdFintoc}`,
        {
          user: selectedUser,
          /* id: linkIdFintoc, */
        }
      );
      console.log("res update user:", response);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const getAllData = async (selectedBankId) => {
    try {
      const response = await axios.get(
        `https://appify-black-side.vercel.app/conciliacion/alldata/${selectedUser}`
        /* {
          params: {
            userId: selectedUser,
          },
        } */
      );
      const selectedConciliacion = response.data.payload.find(
        (conciliacion) => conciliacion.conciliacion.id === selectedBankId
      );

      if (selectedConciliacion) {
        setLinkToken(selectedConciliacion.conciliacion.link_token);
      } else {
        console.error(
          "Conciliacion not found for the selected bank ID:",
          selectedBankId
        );
      }
      console.log("response alldata", response);
    } catch (error) {
      console.error("Error getting all data:", error);
    }
  };

  console.log("link token:", linkToken);
  console.log("account id:", selectedAccountId);

  const fetchAndPostMovements = async () => {
    try {
      const response = await axios.get(
        "https://appify-black-side.vercel.app/conciliacion/fintoc/movements",
        {
          params: {
            since: sinceDate,
            until: untilDate,
            link_token: linkToken,
            account_id: selectedAccountId,
          },
        }
      );
      console.log("response", response);
      const modifiedMovements = response.data.payload.map((movement) => ({
        ...movement,
        cuenta_id: selectedAccountId,
      }));
      setMovements(modifiedMovements);
      console.log("modifiedMovements", modifiedMovements);

      await axios.post(
        "https://appify-black-side.vercel.app/conciliacion/createMov/",
        modifiedMovements
      );
    } catch (error) {
      console.error("Error fetching or posting movements:", error);
    }
  };

  const fetchStoredMovements = async () => {
    try {
      const response = await axios.get(
        `https://appify-black-side.vercel.app/conciliacion/movimientos/${selectedAccountId}`
      );
      setMovements(response.data.payload);
    } catch (error) {
      console.error("Error fetching stored movements:", error);
    }
  };

  const fetchStoredBalance = async () => {
    try {
      const response = await axios.get(
        `https://appify-black-side.vercel.app/conciliacion/cuentas/${selectedBank}`
      );
      console.log("response storebalance", response);
      setBalance(response.data.payload);
    } catch (error) {
      console.error("Error fetching stored movements:", error);
    }
  };

  console.log("movements:", movements);
  const formatCurrency = (value) => {
    const numberValue = parseFloat(value);
    if (isNaN(numberValue)) {
      throw new TypeError("Value is not a number");
    }
    return `$${numberValue.toFixed(2)}`;
  };
  const formatDate = (date) => new Date(date).toLocaleDateString();

  const renderMovementsTable = () => (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Post Date</th>
            <th>Type</th>
            <th>Currency</th>
            <th>Reference Id</th>
          </tr>
        </thead>
        <tbody>
          {currentMovements.map((movement) => (
            <tr key={movement.id}>
              <td>{movement.id}</td>
              <td>{movement.description}</td>
              <td>{formatCurrency(movement.amount)}</td>
              <td>{formatDate(movement.post_date)}</td>
              <td>{movement.type}</td>
              <td>{movement.currency}</td>
              <td>{movement.reference_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={Math.ceil(movements.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  );

  return (
    <div>
      <div>
        {balance.map((item) => (
          <div key={item.id} className="card">
            <h2>{item.id}</h2>
            <p>Type: {item.type || item.tipo}</p>
            <p>
              Available Balance:{" "}
              {item.balance?.available || item.saldo_disponible || "N/A"}
            </p>
            <p>
              Current Balance:{" "}
              {item.balance?.current || item.saldo_actual || "N/A"}
            </p>
            <p>Refreshed at: {formatDate(item.refreshed_at) || "look"}</p>
          </div>
        ))}
      </div>
      <h2>Financial Transactions</h2>
      {renderAccountOptions()}
      {selectedBank && renderAccountsDropdown()}{" "}
      <label>
        Since:
        <input
          type="date"
          value={sinceDate}
          onChange={(e) => setSinceDate(e.target.value)}
        />
      </label>
      <label>
        Until:
        <input
          type="date"
          value={untilDate}
          onChange={(e) => setUntilDate(e.target.value)}
        />
      </label>
      <button onClick={fetchAccounts}>1.fetchAccounts</button>
      <button onClick={cuentaBancoConciliacion}>
        2.cuentaBancoVinculation
      </button>
      <button onClick={updateUser}>3.updateUser</button>
      <button onClick={getAllData(selectedBank)}>4.getAllData</button>
      <button onClick={fetchAndPostMovements}>
        5.Fetch and Post Movements
      </button>
      <button onClick={fetchStoredMovements}>6.Fetch Stored Movements</button>
      <button onClick={fetchStoredBalance}>6.Fetch Stored Balance</button>
      {movements.length > 0 && renderMovementsTable()}
    </div>
  );
};

export default TablaFintoc;
