import React from "react";
import PrivateStructure from "../../../screens/Structure/PrivateStructure";
import VentasDashboard from "../../../screens/Administracion/Ventas/VentasDashboard";
import ComprasDashboard from "../../../screens/Administracion/Compras/ComprasDashboard";
import { Route } from "react-router-dom";
import CuentasDashboard from "../../../screens/Administracion/Cuentas/CuentasDashboard";
import NuevoDocumentoDeVenta from "../../../screens/Administracion/Ventas/NuevoDocumentoDeVenta/NuevoDocumentoDeVenta";
import NuevoDocumentoDeDespacho from "../../../screens/Administracion/Ventas/DocumentosDeDespacho/NuevoDocumentoDeDespacho/NuevoDocumentoDeDespacho";
import NuevoDocumentoDeCompra from "../../../screens/Administracion/Compras/ComprasSection/NuevoDocumentoDeCompra/NuevoDocumentoDeCompra";
import NuevaCompra from "../../../screens/Administracion/Compras/NuevaCompra/NuevaCompra";
import DocumentosDeDespachoDashboard from "../../../screens/Administracion/Ventas/DocumentosDeDespacho/DocumentosDeDespachoDashboard";
import CobrosDashboard from "../../../screens/Administracion/Ventas/Cobros/CobrosDashboard";
import NuevoCobro from "../../../screens/Administracion/Ventas/Cobros/NuevoCobro/NuevoCobro";
import DocumetosTributariosDashboard from "../../../screens/Administracion/Compras/DocumentosTributarios/DocumetosTributariosDashboard";
import PagosDashboard from "../../../screens/Administracion/Compras/Pagos/PagosDashboard";
import NuevoPago from "../../../screens/Administracion/Compras/Pagos/NuevoPago/NuevoPago";
import CuentasDetail from "../../../screens/Administracion/Cuentas/CuentasDetail/CuentasDetail";
import EditarTransaccion from "../../../screens/Administracion/Cuentas/Transacciones/EditarTransaccion";
import AgregarTransaccion from "../../../screens/Administracion/Cuentas/Transacciones/AgregarTransaccion";
import ResultadosDashboard from "../../../screens/Administracion/Cuentas/Resultados/ResultadosDashboard";
import BalanceDashboard from "../../../screens/Administracion/Cuentas/Balance/BalanceDashboard";
import AdministracionDashboard from "../../../screens/Administracion/Cuentas/Balance/Administracion/AdministracionDashboard";
import DetalleCuentaAdmin from "../../../screens/Administracion/Cuentas/Balance/Administracion/DetalleCuenta/DetalleCuentaAdmin";
import NuevaCondicionDePago from "../../../screens/Administracion/Cuentas/Balance/Administracion/Condiciones/NuevaCondicionDePago";
import EditarCondicionDePago from "../../../screens/Administracion/Cuentas/Balance/Administracion/Condiciones/EditarCondicionDePago";
import { NuevaCtaBancaria } from "../../../screens/Administracion/Cuentas/CuentasBancarias/NuevaCtaBancaria";
import { NuevaCuenta } from "../../../screens/Administracion/Cuentas/NuevaCuenta";
import Reconciliation from "../../../screens/Administracion/Conciliacion/Reconciliation";
import PrivateRoutes from "../PrivateRoutes";
import DocumentoDeVentaDetail from "../../../screens/Administracion/Ventas/DocumentoDeVentaDetail/DocumentoDeVentaDetail";
const AdministracionRoutes = [
  <Route
    path="/sale_invoices/pending"
    element={
      <PrivateStructure>
        <VentasDashboard />
      </PrivateStructure>
    }
  />,

  //Ventas
  // --- Documentos de venta
  <Route
    path="/sale_invoices"
    element={
      <PrivateStructure>
        <VentasDashboard />
      </PrivateStructure>
    }
  />,

  <Route path="/sale_invoices/:id" element={
    <PrivateStructure>
      <DocumentoDeVentaDetail/>
    </PrivateStructure>
  }/>,

  // --- Documentos de despacho

  <Route
    path="/dispach_documents"
    element={
      <PrivateStructure>
        <DocumentosDeDespachoDashboard />
      </PrivateStructure>
    }
  />,
  <Route
    path="/dispach_documents/new"
    element={
      <PrivateStructure>
        <NuevoDocumentoDeDespacho />
      </PrivateStructure>
    }
  />,

  <Route
    path="/sale_invoices/new"
    element={
      <PrivateStructure>
        <NuevoDocumentoDeVenta />
      </PrivateStructure>
    }
  />,
  // --- Documentos de despacho
  //<Route path='/shipping_invoices' element={<PrivateStructure><VentasDashboard/></PrivateStructure>}/>,
  //<Route path='/shipping_invoices/new' element={<PrivateStructure><NuevoDocumentoDeDespacho/></PrivateStructure>}/>,

  //compras
  ///---Documentos de compras
  <Route
    path="/service_invoices"
    element={
      <PrivateStructure>
        <ComprasDashboard />
      </PrivateStructure>
    }
  />,
  <Route
    path="/service_invoices/new"
    element={
      <PrivateStructure>
        <NuevaCompra />
      </PrivateStructure>
    }
  />,
  //--DTE Pendientes
  <Route
    path="/purchase_invoice_pendings"
    element={
      <PrivateStructure>
        <ComprasDashboard />
      </PrivateStructure>
    }
  />,

  //Pagos
  <Route
    path="/service_invoices/payments"
    element={
      <PrivateStructure>
        <PagosDashboard />
      </PrivateStructure>
    }
  />,
  <Route
    path="/payment_groups"
    element={
      <PrivateStructure>
        <PagosDashboard />
      </PrivateStructure>
    }
  />,
  <Route
    path="/payment/new"
    element={
      <PrivateStructure>
        <NuevoPago />
      </PrivateStructure>
    }
  />,

  //Cobros
  /*
      <Route path='/sale_invoices/payments' element={<PrivateStructure><CobrosDashboard/></PrivateStructure>}/>,
      <Route path='/sale_payment_groups' element={<PrivateStructure><CobrosDashboard/></PrivateStructure>}/>,
      */
  <Route
    path="/sale_payment_groups"
    element={
      <PrivateStructure>
        <CobrosDashboard />
      </PrivateStructure>
    }
  />,
  <Route
    path="/sale_payment/new"
    element={
      <PrivateStructure>
        <NuevoCobro />
      </PrivateStructure>
    }
  />,

  //Cuentas
  <Route
    path="/banks"
    element={
      <PrivateStructure>
        <CuentasDashboard />
      </PrivateStructure>
    }
  />,
  <Route
    path="/bank/:id"
    element={
      <PrivateStructure>
        <CuentasDetail />
      </PrivateStructure>
    }
  />,
  <Route
    path="/bank/:id/conciliation"
    element={
      <PrivateStructure>
        <Reconciliation />
      </PrivateStructure>
    }
  />,

  <Route
    path="/banks/results"
    element={
      <PrivateStructure>
        <CuentasDashboard />
      </PrivateStructure>
    }
  />,
  <Route
    path="/banks/balance"
    element={
      <PrivateStructure>
        <CuentasDashboard />
      </PrivateStructure>
    }
  />,
  <Route
    path="/banks/new"
    element={
      <PrivateStructure>
        <NuevaCtaBancaria />
      </PrivateStructure>
    }
  />,
  //Documentos tributarios
  <Route
    path="/tax_documents"
    element={
      <PrivateStructure>
        <DocumetosTributariosDashboard />
      </PrivateStructure>
    }
  />,

  //Transacciones
  <Route
    path="/transaction/edit/:id"
    element={
      <PrivateStructure>
        <EditarTransaccion />
      </PrivateStructure>
    }
  />,
  <Route
    path="/transaction/new"
    element={
      <PrivateStructure>
        <AgregarTransaccion />
      </PrivateStructure>
    }
  />,

  //Resultados:
  <Route
    path="/results"
    element={
      <PrivateStructure>
        <ResultadosDashboard />
      </PrivateStructure>
    }
  />,

  //Balance
  <Route
    path="/balance"
    element={
      <PrivateStructure>
        <BalanceDashboard />
      </PrivateStructure>
    }
  />,
  //Admin
  <Route
    path="/admin_acount"
    element={
      <PrivateStructure>
        <AdministracionDashboard />
      </PrivateStructure>
    }
  />,
  <Route
    path="/admin_acount/new"
    element={
      <PrivateStructure>
        <NuevaCuenta />
      </PrivateStructure>
    }
  />,
  <Route
    path="/acount/:id"
    element={
      <PrivateStructure>
        <DetalleCuentaAdmin />
      </PrivateStructure>
    }
  />,

  //Condicion de pago nueva
  <Route
    path="/payment_condition/new"
    element={
      <PrivateStructure>
        <NuevaCondicionDePago />
      </PrivateStructure>
    }
  />,
  <Route
    path="/payment_condition/edit"
    element={
      <PrivateStructure>
        <EditarCondicionDePago />
      </PrivateStructure>
    }
  />,
];

export default AdministracionRoutes;
