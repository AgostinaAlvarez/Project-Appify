import React, { useState, useEffect, useContext } from "react";
import { useFintoc } from "./Fintoc";
import { AppContext } from "../../../context/AppContext";

const FintocWidget = ({ onComplete , accountType }) => {
  const [Fintoc, loadingFintoc, errorFintoc] = useFintoc();
  const [widget, setWidget] = useState(null);
  const [confirmSelection, setConfirmSelection] = useState(false);
  const { linkIdFintoc, setLinkIdFintoc } = useContext(AppContext);

  useEffect(() => {
    if (confirmSelection && Fintoc && !loadingFintoc && !errorFintoc) {
      // Destroy existing widget instance if it exists
      if (widget) {
        widget.destroy();
      }

      const newWidget = Fintoc.create({
        publicKey: import.meta.env.VITE_PK_LIVE_FINTOC,
        holderType: accountType,
        product: "movements",
        webhookUrl: "https://appify-black-side.vercel.app/conciliacion/createCon",
        onSuccess: (link) => {
          console.log("Success!");
          console.log(link);
          console.log("link id:", link.id);
          setLinkIdFintoc(link.id);
          if (onComplete) onComplete();
        },
        onExit: () => {
          console.log("Widget closing!");
          setConfirmSelection(false);
        },
        onEvent: (event) => {
          console.log("An event just happened!");
          console.log(event);
        },
      });

      setWidget(newWidget);
      newWidget.open();
    }
  }, [confirmSelection, Fintoc, loadingFintoc, errorFintoc]);

  useEffect(() => {
    setConfirmSelection(true); // Llama a la función para abrir el widget cuando el componente se monta por primera vez
  }, []); // Esto asegura que solo se ejecute una vez al montar el componente

  if (loadingFintoc) return <div>Loading...</div>;
  if (errorFintoc) return <div>Error: {errorFintoc.message}</div>;

  console.log("LinkIdFintoc:", linkIdFintoc);

  return (
    <div>
      {widget && <div>Fintoc</div>}
    </div>
  );
};

export default FintocWidget;