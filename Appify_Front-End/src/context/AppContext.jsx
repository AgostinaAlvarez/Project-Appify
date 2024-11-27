import { createContext, useState } from "react";
import { FaHome } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { TbReportMoney } from "react-icons/tb";
import { FaBuilding } from "react-icons/fa";
import { Button, Select } from "antd";
import { IoDocumentOutline } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa";
import SelectComponent from "../components/Select/SelectComponent";
import { HiMiniRectangleGroup } from "react-icons/hi2";
import { FaRegClock } from "react-icons/fa";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { redirectToUserDetailRoute } from "../utils/helpers";

import { LuHome } from "react-icons/lu";
import { VscGraph } from "react-icons/vsc";
import { LuClipboardList } from "react-icons/lu";
import { PiMoneyLight } from "react-icons/pi";
import { PiBriefcase } from "react-icons/pi";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [signUpCode, setSignUpCode] = useState(false);

  //loading para las private routes
  const [loadingPublicRoutes, setloadingPublicRoutes] = useState(true);

  //loading para las rutas privadas
  const [loadingPrivateRoutes, setLoadingPrivateRoutes] = useState(true);

  const [logged, setLogged] = useState(false);

  const [userLoggedData, setUserLoggedData] = useState({
    id: "1114ad52-f699-4eb8-9a08-ef9e61eaa42a",
    name: "SuperUsuario",
  });

  const [condicionesDePago, seetCondicionesDePago] = useState([
    {
      id: "1",
      numero_dias: 10,
      nombre: null,
    },
    {
      id: "2",
      numero_dias: 15,
      nombre: null,
    },
    {
      id: "3",
      numero_dias: 30,
      nombre: null,
    },
    {
      id: "4",
      numero_dias: 45,
      nombre: null,
    },
    {
      id: "5",
      numero_dias: 40,
      nombre: "condición creada por el cliente",
    },
  ]);

  const menuOptionsinitialState = [
    { icon: <LuHome />, text: "Inicio", route: "/", selected: true },

    {
      icon: <VscGraph />,
      route: "/quotes",
      text: "Gestión",
      submenuOptions: [
        { name: "Proyectos", selected: true, route: "/quotes" },
        //{name:'Consultas',selected:false, route:'/quote_requests'},
        { name: "Clientes", selected: false, route: "/clients/dashboard" },
      ],
      submenuOpen: false,
    },

    {
      icon: <LuClipboardList />,
      route: "/work_orders",
      text: "Órdenes",
      submenuOptions: [
        { name: "Orden de trabajo", selected: true, route: "/work_orders" },
        //{name:'Tablero',selected:false, route:'/work_orders/panel'},
        { name: "Orden de Compra", selected: false, route: "/purchases" },
      ],
      submenuOpen: false,
    },

    //{ icon: <FaCalendarAlt />, route:'/delivery_orders/delivery_route',text: 'Calendario', submenuOptions:[{name:'Agendamiento',selected:true, route:'/delivery_orders/delivery_route'},{name:'Mis Tareas',selected:false, route:'/qtwist/delivery_orders'} ], submenuOpen: false  },

    {
      icon: <PiMoneyLight />,
      route: "/sale_invoices",
      text: "Finanzas",
      submenuOpen: false,
      submenuOptions: [
        {
          name: "Ventas",
          selected: true,
          route: "/sale_invoices",
          itemsOpen: false,
          items: [
            {
              name: "Despachos",
              selected: false,
              route: "/dispach_documents",
            },
            {
              name: "Cobros",
              selected: false,
              route: "/sale_payment_groups",
            },
          ],
        },
        {
          name: "Compras",
          selected: false,
          route: "/service_invoices",
          itemsOpen: false,
          items: [
            {
              name: "Documentos tributarios",
              selected: false,
              route: "/tax_documents",
            },
            {
              name: "Pagos",
              selected: false,
              route: "/payment_groups",
            },
          ],
        },
        {
          name: "Cuentas",
          selected: false,
          route: "/banks",
          itemsOpen: false,
          items: [
            {
              name: "Resultados",
              selected: false,
              route: "/results",
            },
            {
              name: "Balance",
              selected: false,
              route: "/balance",
            },
            {
              name: "Administrar",
              selected: false,
              route: "/admin_acount",
            },
          ],
        },
      ],
    },

    {
      icon: <PiBriefcase />,
      route: "/users",
      text: "Mi Empresa",
      submenuOptions: [
        /*
            {
              name:'Mi Perfil',
              selected:true, 
              route:'/users/my_profile'
            },
            */
        {
          name: "Usuarios",
          selected: false,
          route: "/users",
        },
        {
          name: "Productos/Servicios",
          selected: false,
          route: "/products",
        },
        {
          name: "Lista de precios",
          selected: false,
          route: "/price_lists",
        },
        {
          name: "Proveedores",
          selected: false,
          route: "/providers",
        },
      ],
      submenuOpen: false,
    },
  ];

  const [deployAside, setDeployAsie] = useState(false);

  const [menuOptions, setMenuOptions] = useState(menuOptionsinitialState);
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  //LISTA DE CUENTAS
  const [categoriaCtas, setCategoriaCtas] = useState([
    { value: "1", label: "Activos fijo" },
    { value: "2", label: "Ajustes de centralización" },
    { value: "3", label: "Anticipo clientes" },
    { value: "4", label: "Anticipo proveedores" },
    { value: "5", label: "Arriendos y leasing" },
    { value: "6", label: "Cargos e interes bancarios" },
    { value: "7", label: "Comidas y entretenimiento" },
    { value: "8", label: "Contratistas" },
    { value: "9", label: "Costo insumos, materiales y productos" },
    { value: "10", label: "Créditos bancarios" },
    { value: "11", label: "Cuentas por cobrar" },
    { value: "12", label: "Cuentas por pagar" },
    { value: "13", label: "Cuentas servicios básicos" },
    { value: "14", label: "Dcto fecha cartera" },
    { value: "15", label: "Dctos girados y no cobrados" },
    { value: "16", label: "Diferencias tipo cambio" },
    { value: "17", label: "Gasto sin documento tributario" },
    { value: "18", label: "Gastos reembolsables" },
    { value: "19", label: "Gastos sin clasificar" },
    { value: "20", label: "Honorarios por pagar" },
    { value: "21", label: "Impuestos pagados retenidos" },
    { value: "22", label: "Impuestos y patentes" },
    { value: "23", label: "Intereses y gastos financieros" },
    { value: "24", label: "Inventarios productos y materias primas" },
    { value: "25", label: "Inversion socios" },
    { value: "26", label: "Iva no recuperrable" },
    { value: "27", label: "IVA por pagar" },
    { value: "28", label: "Otros activos circulante" },
    { value: "29", label: "Otros gastos del negocio" },
    { value: "30", label: "Otros gastos misceláneos" },
    { value: "31", label: "Otros ingresos no operacionales" },
    { value: "32", label: "Pago socios y gastos personales" },
    { value: "33", label: "Patrimonio de balance de apertura" },
    { value: "34", label: "Pendiente por revisar" },
    { value: "35", label: "Preguntar a mi contador" },
    { value: "36", label: "Prestamos empleados" },
    { value: "37", label: "Publicidad y marketing" },
    { value: "38", label: "Remuneraciones socios" },
    { value: "39", label: "Reparaciones y mantenimiento" },
    { value: "40", label: "Retención honorarios" },
    { value: "41", label: "Retiro de socios" },
    { value: "42", label: "Seguros" },
    { value: "43", label: "Servicios Legales y Profesionales" },
    { value: "44", label: "Sueldos y remuneraciones personal" },
    { value: "45", label: "Suministros de oficina y software" },
    { value: "46", label: "Varios acreedores" },
    { value: "47", label: "Vehiculos y gastos asociados" },
    { value: "48", label: "Ventas" },
    { value: "49", label: "Ventas sin documento tributario" },
    { value: "50", label: "Viajes" },
  ]);

  //Lista de subusuarios:
  const [subusuarios, setSubusuarios] = useState([]);
  //Estado inicial de los permisos de superusuario:

  //LISTA DE PRODUCTOS
  const [products, setProducts] = useState([]);

  //LISTA DE PROVEEDORES
  const [proveedores, setProveedores] = useState([]);

  //LISTA DE CLIENTES
  const [clientes, setClientes] = useState([]);

  //LISTA DE PROYECTOS:
  const [proyectos, setProyectos] = useState([]);

  //LISTA DE ORDENES DE TRABAJO
  const [ordenesDeTrabajo, setOrdenesDeTrabajo] = useState([]);

  //LISTA ORDENES DE COMPRA
  const [ordenesDeCompra, setOrdenesDeCompra] = useState([]);

  //LISTA DE VENTAS
  const [ventas, setVentas] = useState([]);

  //LISTA DE TRANSPORTISTAS
  const [transportistas, setTransportistas] = useState([]);

  //LISTA DE BANCOS
  const [bancos, setBancos] = useState([]);
  //MERCADO PAGO
  const [preferenceId, setPreferenceId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState({
    quantity: "1",
    price: "299",
    amount: 299,
    description: "Parrotfy monthly",
  });
  //LINKID FINTOC
  const [linkIdFintoc, setLinkIdFintoc] = useState(null);
  const [linkToken, setLinkToken] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [movements, setMovements] = useState([]);
  const [balance, setBalance] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [select2, setSelect2] = useState(false);
  const [storedMovements, setStoredMovements] = useState([]);
  const fetchAndPostMovements = async (
    sinceDate,
    untilDate,
    linkToken,
    selectedAccountId,
    setMovements,
    onComplete
  ) => {
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
      console.log("response fetchAndPostMovements:", response);
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
      if (onComplete) onComplete(modifiedMovements);
      console.log("Movements stored in state:", modifiedMovements);
      /* const balance = ""; */
      // onComplete(modifiedMovements);
    } catch (error) {
      console.error("Error fetching or posting movements:", error);
    }
  };
  const fetchStoredMovements = async (
    selectedAccountId,
    setStoredMovements
  ) => {
    try {
      const response = await axios.get(
        `https://appify-black-side.vercel.app/conciliacion/movimientos/${selectedAccountId}`
      );
      console.log("Movimientos almacenados:", response.data.payload);
      setStoredMovements(response.data.payload);
    } catch (error) {
      console.error("Error fetching stored movements:", error);
    }
  };

  const fetchStoredBalance = async (selectedBank, setBalance) => {
    try {
      const response = await axios.get(
        `https://appify-black-side.vercel.app/conciliacion/cuentas/${selectedBank}`
      );
      console.log("response storebalance", response);
      console.log("Balance almacenado:", response.data.payload);
      setBalance(response.data.payload);
    } catch (error) {
      console.log("Falla de fetch Store balance", selectedBank);
      console.error("Error fetching stored movements:", error);
    }
  };
  const fetchAccounts = async () => {
    try {
      const response = await axios.get(
        `https://appify-black-side.vercel.app/conciliacion/alldata/${userLoggedData.id}`
      );
      const conciliationsData = response.data.payload.map(
        (item) => item.conciliacion
      );
      const accountsData = response.data.payload.flatMap(
        (item) => item.cuentas
      );
      setAccounts(conciliationsData);
      console.log(conciliationsData);
      console.log(conciliationsData[0]?.link_id_banco || "");
      setSelectedBank(conciliationsData[0]?.link_id_banco || "");
      console.log("banco en fetch accounts", selectedBank);
      setSelectedAccountId(accountsData);
      // setAccounts(accountsData);
      setSelect2(true);
      await getAllData(conciliationsData[0]?.link_id_banco || "");
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };
  const getAllData = async (selectedBank) => {
    console.log(selectedBank);
    try {
      const response = await axios.get(
        `https://appify-black-side.vercel.app/conciliacion/alldata/${userLoggedData.id}`
      );
      const selectedConciliacion = response.data.payload.find(
        (conciliacion) => conciliacion.conciliacion.id === selectedBank
      );

      if (selectedConciliacion) {
        const linkToken1 = selectedConciliacion.conciliacion.link_token;
        setLinkToken(linkToken1);
        console.log("Link token obtenido del getDATA:", linkToken);
      } else {
        console.error(
          "Conciliacion not found for the selected bank ID:",
          selectedBank
        );
      }
      console.log("response alldata", response);
    } catch (error) {
      console.error("Error getting all data:", error);
    }
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
          user: userLoggedData.id,
          /* id: linkIdFintoc, */
        }
      );
      console.log("res update user:", response);
      await fetchAccounts();
      await cuentaBancoConciliacion();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  return (
    <AppContext.Provider
      value={{
        signUpCode,
        setSignUpCode,
        loadingPublicRoutes,
        setloadingPublicRoutes,
        logged,
        setLogged,
        userLoggedData,
        setUserLoggedData,
        menuOptionsinitialState,
        menuOptions,
        deployAside,
        setDeployAsie,
        setMenuOptions,
        modal,
        setModal,
        modalContent,
        categoriaCtas,
        setCategoriaCtas,
        subusuarios,
        setSubusuarios,
        products,
        setProducts,
        proveedores,
        setProveedores,
        clientes,
        setClientes,
        ordenesDeTrabajo,
        setOrdenesDeTrabajo,
        ordenesDeCompra,
        setOrdenesDeCompra,
        proyectos,
        setProyectos,
        ventas,
        setVentas,
        condicionesDePago,
        seetCondicionesDePago,
        setModalContent,
        transportistas,
        setTransportistas,
        bancos,
        setBancos,
        loadingPrivateRoutes,
        setLoadingPrivateRoutes,
        linkIdFintoc,
        setLinkIdFintoc,
        select2,
        setSelect2,
        movements,
        setMovements,
        balance,
        setBalance,
        linkToken,
        setLinkToken,
        accounts,
        setAccounts,
        selectedAccountId,
        setSelectedAccountId,
        selectedBank,
        setSelectedBank,
        storedMovements,
        setStoredMovements,
        fetchAccounts,
        fetchAndPostMovements,
        fetchStoredMovements,
        fetchStoredBalance,
        getAllData,
        cuentaBancoConciliacion,
        updateUser,
        preferenceId,
        setPreferenceId,
        isLoading,
        setIsLoading,
        orderData,
        setOrderData,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
