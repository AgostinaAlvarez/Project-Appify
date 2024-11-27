import React, { useState, useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { SpinnerCircular } from "spinners-react";
import { AppContext } from "../../context/AppContext";
import classnames from "classnames";

export const TermsAndCondition = ({ setStep }) => {
  initMercadoPago(import.meta.env.VITE_MP_PK);
  const { preferenceId, setPreferenceId, orderData, setOrderData } =
    React.useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = React.useState(false);
  const [currentPreferenceId, setCurrentPreferenceId] = useState(null);

  const paymentClass = classnames("payment-form dark", {
    "payment-form--hidden": !isReady,
  });

  const handleClick = () => {
    console.log("inside checkout click");
    console.log("order data before sending", orderData);
    setIsLoading(true);
    fetch("http://localhost:8080/mp/create_preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => {
        console.log("res:", response);
        return response.json();
      })
      .then((preference) => {
        console.log("preference:", preference);
        setPreferenceId(preference.id);
        setCurrentPreferenceId(preference.id);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleOnReady = () => {
    console.log("handleonready");
    setIsReady(true);
  };

  useEffect(() => {
    console.log("preferenceId in terms", preferenceId);
  }, [preferenceId]);

  const renderCheckoutButton = () => {
    console.log("currentPreferenceId renderbutton: ", currentPreferenceId);
    if (!currentPreferenceId) return null;

    return (
      <Wallet
        initialization={{ preferenceId: currentPreferenceId }}
        onReady={handleOnReady}
      />
    );
  };
  console.log("preferenceId in terms", preferenceId);

  const renderSpinner = () => {
    if (isLoading) {
      return (
        <div className="spinner-wrapper">
          <SpinnerCircular сolor="#009EE3" />
        </div>
      );
    }
  };

  return (
    <>
      <div className="terms-bg">
        <div className="title-terms">
          <h1>Términos y condiciones</h1>
          <p>Appify - Términos del Servicio</p>
        </div>
        <div className="text-terms">
          <p>
            Appify - Términos del Servicio Fecha de vigencia: 06/05/2024 Estos
            Términos de servicio ("Términos") rigen su uso de nuestro sitio web
            (el "Sitio") y los productos y servicios relacionados, incluido
            cualquier contenido o información proporcionada como parte del Sitio
            o dichos productos, servicios o sitios web relacionados
            (colectivamente con el Sitio, los "Servicios"), que son propiedad u
            operados por Appify, Inc, una empresa de servicios de Delaware
            Corporation y sus afiliadas y subsidiarias (denominadas
            colectivamente en el presente como "Appify", "nosotros", "nuestro" o
            "nosotros") . Nuestra Política de privacidad, disponible en
            www.Appify.com/en/privacy-policy , se incorpora por referencia a
            estos Términos. Lea detenidamente estos Términos y la Política de
            privacidad antes de acceder a los Servicios, ya que estos Términos
            forman un acuerdo legal vinculante entre usted y Appify. Estos
            Términos pueden aplicarse a usted individualmente, a la empresa o al
            usuario de otra entidad legal que represente, o a ambos. Si está
            utilizando el Sitio o los Servicios en nombre de una empresa u otra
            entidad legal, por la presente declara y garantiza que tiene la
            autoridad para celebrar estos Términos en nombre de dicha entidad.
            Al acceder, registrarse o utilizar los Servicios, usted: (1)
            reconoce que ha leído y comprende estos Términos; (2) acepta estar
            obligado por ellos en su totalidad, y (3) está celebrando un acuerdo
            legalmente vinculante con nosotros. Tal como se usa en estos
            Términos y a menos que se identifique por separado como aplicable a
            una persona o entidad, "usted" y "su" se refieren tanto a usted
            individualmente como a la entidad en nombre de la cual está
            celebrando estos Términos. SI NO ACEPTA TODOS ESTOS TÉRMINOS, NO
            UTILICE LOS SERVICIOS. SU USO DE NUESTROS SERVICIOS REQUIERE SU
            ACEPTACIÓN DE ESTOS TÉRMINOS YA QUE PUEDEN SER MODIFICADOS
            OCASIONALMENTE, INCLUYENDO LAS POLÍTICAS INCORPORADAS POR REFERENCIA
            EN EL PRESENTE DOCUMENTO, QUE INCLUYE LA POLÍTICA DE PRIVACIDAD DE
            Appify. 1.- Resumen de Servicios; Cambios. Descripción general de
            los servicios . Los Servicios incluyen una plataforma en línea para
            la gestión de impresión y diseño gráfico, que incluye, entre otros,
            cotización, generación de órdenes de trabajo, planificación de la
            producción, control de despacho, gestión de la satisfacción del
            cliente y otros servicios relacionados. Cambios en los Servicios .
            Las características y funcionalidades específicas de nuestros
            Servicios son dinámicas y pueden cambiar ocasionalmente. Nos
            reservamos total y exclusiva discreción con respecto a la operación
            de nuestros Servicios. Nos reservamos el derecho de cambiar los
            términos sin previo aviso. También nos reservamos el derecho de
            retirar, suspender o descontinuar cualquier funcionalidad o
            característica de nuestros Servicios en cualquier momento. También
            podemos limitar, por ubicaciones geográficas, ciertos Servicios
            disponibles. 2.- Su Elegibilidad; Tu responsabilidad Para ser
            elegible para usar los Servicios, usted declara y garantiza que: (i)
            tiene al menos 18 años de edad, o es mayor de edad en la
            jurisdicción en la que reside; (ii) actualmente no están
            restringidos de los Servicios y no tienen prohibido tener una cuenta
            relacionada con los mismos; (iii) solo mantendrá una cuenta en un
            momento dado; (iv) solo proporcionará información precisa a Appify;
            (v) tiene pleno poder y autoridad para celebrar estos Términos y
            hacerlo no violará ningún otro acuerdo del que sea parte; y (vi) no
            violará ningún derecho de Appify o de un tercero. Debe tener acceso
            a Internet y todo el equipo necesario para acceder al Sitio y
            utilizar los Servicios. Esto podría incluir computadoras, módems,
            impresoras y, en algunos casos, dispositivos móviles y tabletas.
            Usted es responsable del mantenimiento y cuidado de dicho equipo.
            Usted asume toda la responsabilidad por su uso y acceso a los
            Servicios. Las cuentas son para un solo usuario, empresa u otra
            entidad legal, según corresponda. Se prohíbe cualquier uso de
            múltiples partes, que no sea el uso individual en nombre de una
            empresa u otra entidad legal. Por ejemplo, está prohibido compartir
            un inicio de sesión entre usuarios individuales que no pertenecen a
            la entidad. Sin perjuicio de cualquier disposición en contrario, los
            usuarios de Appify pueden proporcionar claves temporales al personal
            de Appify (“Usuarios Externos Autorizados”) para acceder a la cuenta
            del usuario. Un Usuario Externo Autorizado es un usuario designado
            por usted a quien puede retirar el acceso en cualquier momento. Los
            Usuarios Externos Autorizados pueden tener acceso a todas las
            funciones de los Servicios y realizar las acciones instruidas por el
            suscriptor dado un requisito de asistencia específico. Si administra
            la cuenta de Appify en nombre de una empresa u organización, declara
            y garantiza que tiene derecho a proporcionar dichos códigos de
            acceso y credenciales a Usuarios Externos Autorizados. 3.- Datos
            Personales; Tu contenido; Su cuenta 3.1 Precisión . Al registrarse
            en nuestros Servicios, declara y garantiza que toda la información
            que nos envía es verdadera, precisa, actual y completa, y que nos
            notificará de inmediato por escrito si su información cambia. Es su
            responsabilidad mantener la información de su cuenta y perfil
            precisa y actualizada. No somos responsables de ninguna disputa o
            reclamo relacionado con cualquier información inexacta, incompleta o
            extemporánea que nos haya proporcionado. 3.2 Privacidad . Para
            utilizar nuestros Servicios, es posible que deba registrarse con
            nosotros y enviar cierta información. Usted acepta expresamente que
            podemos recopilar, divulgar, almacenar y utilizar su información de
            acuerdo con los términos de la Política de privacidad de Appify,
            disponible en www.Appify.com/en/privacy-policy . 3.3 Su contenido.
            Entre usted y Appify, usted posee la información, los materiales,
            las fotos u otro contenido (el "Contenido") que proporciona a Appify
            en virtud de este Acuerdo. Appify puede utilizar cualquier Contenido
            que cargue o proporcione a Appify en relación con los Servicios para
            proporcionar y promocionar los Servicios o el negocio de Appify. En
            consecuencia, otorga a Appify, y a todas sus subsidiarias,
            afiliadas, sucesoras y cesionarias, un derecho mundial, perpetuo,
            libre de regalías, totalmente pagado, sublicenciable, no exclusivo y
            transferible para usar, publicar, reproducir, distribuir, modificar,
            preparar trabajos derivados, adaptar, mostrar públicamente y
            utilizar el Contenido. Dicho derecho a usar dicho Contenido
            sobrevivirá a la terminación de estos Términos y la terminación de
            los Servicios. Usted nos autoriza a usar, reenviar, o publicar su
            perfil o información relacionada en otros sitios y servicios.
            Además, nos autoriza a usar su logotipo corporativo y nombre
            corporativo, si corresponde, para fines promocionales (para optar
            por no participar, envíenos un correo electrónico a
            sales@Appify.com). Sin perjuicio de lo anterior, conserva todos los
            derechos sobre el Contenido, excepto como dispuesto de otro modo en
            este documento o según lo dispuesto en cualquier otro acuerdo entre
            usted y Appify. Cualquier Contenido que nos envíe se proporciona
            bajo su propio riesgo de pérdida. Usted es el único responsable de
            todo el Contenido que comparta, proporcione, muestre, publique o
            difunda a otros, ya sea que nosotros o usted hayamos tomado tal
            acción. Al proporcionarnos Contenido, usted declara y garantiza que
            tiene derecho a enviarlo y que no es confidencial y no viola ninguna
            ley, restricciones contractuales u otros derechos de terceros
            (incluidos los derechos de propiedad intelectual). Appify también
            puede eliminar o eliminar su Contenido de los Servicios en cualquier
            momento a su exclusivo criterio. 3.4 Interacciones con otros
            usuarios. Usted es el único responsable de todas las interacciones
            con otros usuarios. Usted reconoce y acepta que no tenemos la
            obligación de verificar ningún Contenido u otra información
            proporcionada por los usuarios en los Servicios. Appify ofrece
            varios foros que le permiten publicar comentarios. Appify también
            permite compartir información al permitir que los usuarios publiquen
            contenido e información, incluidos enlaces y otra información. De
            conformidad con la licencia otorgada por usted anteriormente, Appify
            puede otorgar a otros usuarios de los Servicios acceso y compartir
            derechos sobre su Contenido de acuerdo con estos Términos, su
            configuración y la naturaleza de su conexión con dichos otros
            usuarios. La información que comparte puede ser vista y utilizada
            por otros usuarios de los Servicios. Appify no puede garantizar que
            los usuarios de los Servicios no utilicen la información que
            compartes en Appify, ni la forma de uso. Appify no es responsable de
            la apropiación indebida o el uso indebido de su Contenido u otra
            información por parte de otro usuario o de un tercero. Usted es el
            único responsable de sus interacciones con otros usuarios. Además,
            Appify no es responsable de la veracidad, exactitud, autenticidad o
            integridad del Contenido o cualquier otra información proporcionada
            por otros usuarios o cualquier otro tercero. Por la presente,
            liberas a Appify de todas las reclamaciones, demandas o daños de
            cualquier tipo, conocidos o desconocidos, relacionados de alguna
            manera con (i) cualquier relación que surja entre los usuarios de
            los Servicios, (ii) cualquier disputa entre tú y otro usuario, o (
            iii) que surja de cualquier servicio que se haya originado a través
            de los Servicios o que haya sido proporcionado de otro modo por un
            usuario. Además, 3.5 Su cuenta . Excepto por su Contenido con
            licencia para nosotros como se establece anteriormente, la cuenta
            que crea y cualquier perfil relacionado es de nuestra propiedad. Con
            respecto a su cuenta, acepta: (i) mantener su contraseña segura y
            confidencial; (ii) no permitir que otros usen su cuenta; (iii) no
            utilizar las cuentas de otros; (iv) no transferir su cuenta a otra
            parte; y (v) notificarnos de cualquier uso no autorizado real o
            sospechado de su cuenta. Usted es responsable de cualquier actividad
            que ocurra en su cuenta. 3.6 Red de Maestros de Appify . Los
            usuarios tienen la oportunidad de registrarse voluntariamente en
            Appify para registrarse en el Sitio como miembros maestros (" Appify
            Masters ") de la red Appify (" Appify Masters Network ").”), con el
            objeto de ofrecer, por sí solo, soporte técnico, facilitando la
            planta para visitas, consultorías, intercambio de experiencias y
            otras actividades enfocadas a la mejora continua del software y la
            prestación de los Servicios. Los usuarios que se suscriban
            voluntariamente para ser miembros de Appify Master Network tendrán
            beneficios especiales, como acceso a nuevos módulos en fase de
            prueba y beneficios y programas especiales para la red. Además,
            estos usuarios, además de aportar y ayudar al resto de miembros de
            la red con información, consejos, consultas y compartir buenas
            prácticas, ofrecerán visitas sin coste a usuarios potenciales o
            actuales de Appify bajo determinadas condiciones en beneficio del
            usuario. : (I) todas las visitas serán coordinadas con al menos dos
            días hábiles de anticipación y están sujetas a la aprobación del
            usuario, pudiendo a su discreción posponer las reuniones o
            cancelarlas definitivamente por criterio comercial; (II) los
            usuarios externos o potenciales que visiten el piso del contratista
            deberán estar acompañados en todo momento y bajo la supervisión del
            usuario de Appify Master Network o cualquiera de sus empleados o
            representantes. 3.7 Comentarios . De vez en cuando, puede
            identificar problemas, soluciones a problemas identificados,
            proporcionar sugerencias, comentarios u otros comentarios
            relacionados con nuestros Servicios o relacionados con Appify
            ("Comentarios") a Appify. Usted reconoce y acepta que todos los
            Comentarios son y se proporcionarán de forma totalmente voluntaria y
            Appify tendrá la libertad de utilizar o divulgar dichos Comentarios
            para cualquier propósito. Además, reconoce y acepta que sus
            Comentarios no contienen información confidencial o patentada y que
            no tiene derecho a ninguna compensación o reembolso de ningún tipo
            por parte de Appify bajo ninguna circunstancia relacionada con
            dichos Comentarios. 4. Uso personal; Licencia limitada; Propiedad
            Sujeto a los términos y condiciones del presente, Appify le otorga
            un derecho limitado, revocable, intransferible, no sublicenciable y
            no exclusivo para acceder a los Servicios a través de un dispositivo
            móvil generalmente disponible, un navegador web o un Sitio
            autorizado por Appify para ver contenido e información. y de otro
            modo usar los Servicios en la medida prevista y permitida por la
            funcionalidad de los mismos. Esta licencia es personal para usted y
            no puede revender nuestros Servicios, permitir que otros usuarios
            accedan a nuestros Servicios a través de su cuenta o usar los
            Servicios para alojar contenido para otros. No puede copiar ni
            descargar ningún contenido de los Servicios excepto con la
            aprobación previa por escrito de Appify. Usted reconoce que, salvo
            que se indique expresamente lo contrario, estos Términos son
            únicamente entre usted y Appify. Además, sin la aprobación previa
            por escrito de Appify, no puede distribuir, exhibir o exhibir
            públicamente, arrendar, vender, transmitir, transferir, publicar,
            editar, copiar, crear trabajos derivados, alquilar, sublicenciar,
            distribuir, descompilar, desmontar , realizar ingeniería inversa o
            hacer un uso no autorizado de los Servicios. Queda prohibido
            cualquier uso comercial no autorizado expresamente. Usted acepta no
            eliminar, ocultar ni alterar los avisos de derechos de autor,
            patentes, marcas registradas u otros derechos de propiedad adheridos
            a los Servicios. Sus derechos están sujetos a su cumplimiento de
            estos Términos, así como de cualquier otro acuerdo aplicable a los
            Servicios que está utilizando. Los Servicios prestados por Appify se
            otorgan bajo licencia, no se venden. Los Servicios, y todas las
            copias de los Servicios, son propiedad de Appify o sus terceros
            licenciantes y están protegidos por diversas leyes de propiedad
            intelectual, incluidas, entre otras, las leyes de derechos de autor
            y secretos comerciales. Appify se reserva todos los derechos no
            otorgados expresamente en este documento. Usted acepta que no tiene
            derecho a ninguna marca comercial o marca de servicio de Appify y
            que no puede usar ninguna de esas marcas de ninguna manera a menos
            que Appify lo autorice expresamente. La realización de copias o la
            distribución no autorizadas del contenido del Sitio o la violación
            de estos Términos puede dar lugar a la cancelación de su cuenta de
            Appify, la prohibición del uso de los Servicios y otras acciones
            legales. Appify se reserva el derecho de limitar su uso o acceso a
            los Servicios, a su exclusivo criterio, para mantener el rendimiento
            y la disponibilidad de los Servicios y para hacer cumplir estos
            Términos de servicio. Appify no es responsable de la pérdida,
            corrupción, alteración o eliminación de ningún contenido transmitido
            a través de nuestros Servicios. Al utilizar nuestros Servicios,
            usted renuncia expresamente al derecho de reclamar daños y
            perjuicios y acepta eximir de responsabilidad a Appify por cualquier
            pérdida, alteración, corrupción o eliminación. Usted reconoce y
            acepta que es el único responsable de conservar todos los registros
            y conciliar toda la información de transacciones relacionadas con su
            uso de los Servicios. 5. Tarifas; Términos de pago Si compra
            cualquiera de los Servicios que ofrecemos por una tarifa ("Servicios
            pagados"), acepta pagar las tarifas aplicables por los Servicios
            pagados a su vencimiento más todos los impuestos relacionados. Todos
            los impuestos aplicables se calculan en función de la información de
            facturación que nos proporciona en el momento de la compra. A menos
            que se indique lo contrario, todas las tarifas se evalúan en dólares
            estadounidenses. También acepta que Appify y sus proveedores de
            servicios externos que brindan servicios de procesamiento de pagos
            pueden almacenar su información de pago. Podemos cobrarle a su
            información de pago los cargos subsiguientes que autorice, como
            actualizaciones de cuenta u otros cargos especiales autorizados por
            usted. Si el método de pago que utiliza con nosotros llega a su
            fecha de vencimiento y no edita la información correspondiente ni
            cancela dicho Servicio pago, usted nos autoriza a continuar
            facturando ese método de pago y sigue siendo responsable de los
            montos no cobrados. Si compra una suscripción a un Servicio pago, se
            le facturará el primer mes inmediatamente después de comprar o
            actualizar a una cuenta de suscripción. A menos que se establezca lo
            contrario en un documento de pedido aplicable que incorpore estos
            Términos, los Servicios se facturan por adelantado mensualmente y no
            son reembolsables. Para cualquier actualización o reducción en el
            nivel del plan, su información de pago se cargará automáticamente
            con la nueva tarifa en su próximo ciclo de facturación además del
            cambio prorrateado en el monto de su suscripción por el resto del
            ciclo de facturación actual (la reducción de su nivel del plan puede
            causar la pérdida de funciones o capacidad de su cuenta; Appify no
            acepta ninguna responsabilidad por dicha pérdida). Su cuenta de
            suscripción se renovará automáticamente, siempre que pueda cancelar
            la suscripción en cualquier momento antes del final del período de
            facturación actual y la cancelación surtirá efecto en el próximo
            período de facturación. Conservará el acceso a dichos Servicios
            pagos desde el momento en que cancela hasta el comienzo del próximo
            período de facturación, pero no recibirá un reembolso o crédito por
            los días restantes en su período de facturación actual. Usted acepta
            reembolsarnos todos los costos de cobro e intereses por cualquier
            monto vencido. pero no recibirá un reembolso o crédito por los días
            restantes en su período de facturación actual. Usted acepta
            reembolsarnos todos los costos de cobro e intereses por cualquier
            monto vencido. pero no recibirá un reembolso o crédito por los días
            restantes en su período de facturación actual. Usted acepta
            reembolsarnos todos los costos de cobro e intereses por cualquier
            monto vencido. Appify puede ofrecer a determinados clientes pruebas
            gratuitas de los Servicios de pago. Si compra una suscripción a un
            Servicio de pago que incluye una prueba gratuita, recibirá acceso
            gratuito a dicho Servicio de pago durante el período de prueba
            gratuito. Al final del período de prueba gratuito aplicable, se le
            cobrará el precio de la suscripción para dicho Servicio pago y se le
            puede continuar cobrando hasta que cancele su suscripción. Para
            evitar cargos, debe cancelar antes de que finalice el período de
            prueba gratuito. La falta de pago puede resultar en la terminación
            de su suscripción. Puede cancelar o suspender sus Servicios de pago
            poniéndose en contacto con Appify en sales@Appify.com. A menos que
            se indique expresamente lo contrario, no garantizamos reembolsos por
            falta de uso, insatisfacción o cualquier otro motivo. 6. Contenido y
            sitios web de terceros No controlamos ni somos responsables de
            ningún dato, contenido, servicio o producto (incluido el software)
            al que acceda, descargue, reciba o compre mientras utiliza los
            Servicios. Podemos, pero no tenemos ninguna obligación de bloquear
            información, transmisiones o acceso a cierta información, servicios,
            productos o dominios para proteger los Servicios, nuestra red, el
            público o nuestros usuarios. No somos un editor de contenido de
            terceros al que se accede a través de los Servicios y no somos
            responsables del contenido, la precisión, la puntualidad o la
            entrega de opiniones, consejos, declaraciones, mensajes, servicios,
            gráficos, datos o cualquier otra información proporcionada a o por
            terceros accesibles a través del Servicio. De vez en cuando, los
            Servicios pueden contener referencias o enlaces a materiales de
            terceros no controlados por Appify o sus proveedores o
            licenciatarios. Appify proporciona dicha información y enlaces para
            su comodidad y no debe considerarse una aprobación de dichos sitios
            o cualquier contenido, producto o información que se ofrezca en
            dichos sitios. Usted reconoce y acepta que Appify no es responsable
            de ningún aspecto de la información o el contenido de los materiales
            de terceros o de los sitios de terceros accesibles o vinculados a
            los Servicios. Usted es responsable de evaluar si desea acceder o
            utilizar sitios de terceros. En consecuencia, si decide utilizar
            sitios de terceros, lo hace bajo su propio riesgo y acepta que este
            Acuerdo no se aplica a su uso de sitios de terceros. 7. Política de
            uso aceptable Usted acepta cumplir con todas las leyes y
            regulaciones aplicables en relación con su uso de los Servicios. No
            puede utilizar nuestros Servicios para publicar o transmitir ningún
            material ilegal, incluidas, entre otras, las transmisiones que
            constituirían un delito penal, darían lugar a responsabilidad civil
            o violarían cualquier ley o regulación local, estatal, nacional o
            internacional. En particular, la siguiente es una lista
            representativa y no exhaustiva de actos que están prohibidos: - Usar
            los Servicios mientras opera un vehículo motorizado; - La
            transmisión o publicación de cartas en cadena o esquemas
            piramidales, u otros actos que impliquen prácticas engañosas de
            marketing en línea o fraude; - Actos que puedan afectar material y
            adversamente la calidad de la experiencia de otros usuarios; - Uso
            no autorizado o intento de sabotaje de cualquier computadora,
            máquina o red; - Introducir programas maliciosos en los Servicios,
            la red o los servidores de Appify (por ejemplo, virus, gusanos,
            caballos de Troya, etc.); - Participar en cualquier monitoreo o
            interceptación de datos no destinados a usted sin autorización; -
            Intentar eludir la autenticación o la seguridad de cualquier host,
            red o cuenta sin autorización; - Realizar ingeniería inversa,
            descompilar, desensamblar, descifrar o intentar derivar el código
            fuente de cualquier propiedad intelectual subyacente utilizada para
            proporcionar los Servicios, o cualquier parte de los mismos; -
            Adaptar, modificar o crear trabajos derivados basados ​​en los
            Servicios, la tecnología subyacente a los Servicios o el contenido
            de otros usuarios, en su totalidad o en parte; - Duplicar, otorgar
            licencias, otorgar sublicencias, publicar, difundir, transmitir,
            distribuir, realizar, exhibir, vender, cambiar la marca o transferir
            de otro modo la información que se encuentra en los Servicios
            (excluyendo el contenido publicado por usted), excepto según lo
            permitido en estos Términos, o según lo autorizado expresamente por
            Appify por escrito; - Usar cualquier método, software o programa
            diseñado para recopilar información de identidad, credenciales de
            autenticación u otra información; - Transmitir o recibir, cargar,
            usar o reutilizar material que sea abusivo, indecente, difamatorio,
            acosador, obsceno o amenazante, o una violación de la confianza, la
            privacidad o derechos similares de terceros; - Transmitir o recibir,
            cargar, usar o reutilizar material que viole los derechos de
            propiedad intelectual de un tercero, incluidos, entre otros,
            patentes, marcas registradas, secretos comerciales o derechos de
            autor; - Transmitir, recibir, cargar, usar o reutilizar material que
            no tiene derecho a transmitir bajo ninguna ley o bajo relaciones
            contractuales o fiduciarias (como información privilegiada,
            información de propiedad y confidencial aprendida o divulgada como
            parte de relaciones laborales o bajo confidencialidad). acuerdos); -
            Falsificar la información de identificación del usuario; - Usar los
            Servicios para fines que no sean lícitos, incluidos, entre otros, la
            violación intencional o no intencional de cualquier ley local,
            estatal, nacional o internacional aplicable; o - Hacerse pasar por
            cualquier persona o entidad, incluido, entre otros, un representante
            de Appify, o declarar falsamente o tergiversar su afiliación con una
            persona o entidad. Appify aplica una política de tolerancia cero
            contra el SPAM con respecto a la información transmitida a través de
            nuestra red. Appify puede determinar, a su exclusivo criterio, si
            alguna transmisión se considera SPAM. SPAM incluye, pero no se
            limita a, lo siguiente: - Correo electrónico masivo no solicitado,
            material promocional u otras formas de solicitud enviadas a través
            de los Servicios, o correo electrónico que anuncie cualquier
            dirección IP que pertenezca a Appify o cualquier URL (dominio)
            alojado por Appify. - El uso de páginas web instaladas en los ISP
            que permiten el envío de SPAM que directa o indirectamente remiten a
            los clientes a dominios o direcciones IP alojadas por Appify. -
            Falsificar o tergiversar encabezados de mensajes, ya sea en su
            totalidad o en parte, para enmascarar el verdadero origen del
            mensaje. Si Appify determina que ha publicado uno o más artículos de
            SPAM, podemos cancelar su cuenta de inmediato y tomar medidas para
            evitar que use nuestra red en cualquier momento a partir de
            entonces. Usted acepta no utilizar los Servicios con el fin de
            reclutar para otro sitio web o servicio que ofrezca una
            funcionalidad que compita con los Servicios. 8. Materiales
            protegidos por derechos de autor Appify respeta los derechos de
            propiedad intelectual de los demás y espera que tú hagas lo mismo.
            Es nuestra política cancelar, en las circunstancias apropiadas, las
            cuentas de suscriptores que infrinjan los derechos de autor de
            otros. No puede cargar, descargar, publicar, transmitir, reproducir
            o distribuir de ninguna manera archivos, material, información,
            software u otro material obtenido a través de los Servicios que esté
            protegido por derechos de autor u otro derecho de propiedad o
            trabajos derivados con respecto a los mismos. , sin obtener el
            permiso del propietario de los derechos de autor u otro titular de
            derechos. Appify tiene el derecho, pero no la obligación, de
            eliminar de los Servicios cualquier archivo, material, información,
            software u otro material que Appify crea o pueda estar, a su entera
            discreción, infringiendo o violando los derechos de otros. Si cree
            de buena fe que se han infringido sus derechos de autor, envíe una
            comunicación por escrito sobre dicha creencia a: ventas@appify.cl 9.
            Derecho a restringir o cancelar el acceso Appify puede denegar o
            restringir su acceso a la totalidad o parte de los Servicios sin
            previo aviso, a su razonable discreción, si considera que usted ha
            participado en alguna conducta o actividad que Appify, a su
            razonable discreción, cree que viola la letra o el espíritu de
            cualquiera de estos Términos. Si Appify deniega o restringe su
            acceso a los Servicios debido a dicha infracción, no tendrá derecho
            a obtener ningún reembolso o crédito por las tarifas de suscripción
            que haya pagado. Appify está autorizado a suspender el acceso en
            caso de que usted se encuentre en mora por un período superior a 60
            días, en cuyo caso Appify le entregará toda la base de datos que le
            corresponda en un plazo no superior a 30 días hábiles en formato
            digital. formato determinado por Appify. En el caso de que estos
            Términos o los Servicios finalicen por cualquier motivo o sin
            motivo, usted reconoce y acepta que seguirá sujeto a estos Términos.
            Después de la rescisión, deberá dejar de usar los Servicios de
            inmediato y cualquier licencia que se le haya otorgado en virtud de
            cualquier acuerdo relacionado con el uso de los Servicios se
            rescindirá de inmediato. Tras la rescisión, Appify se reserva el
            derecho de eliminar todo su Contenido, datos y otra información
            almacenada en los servidores de Appify. Appify no será responsable
            ante usted o cualquier tercero como resultado de la rescisión de
            estos Términos o los Servicios o por cualquier acción que Appify
            tome de conformidad con estos Términos como resultado de dicha
            rescisión. Sin limitar la generalidad de lo anterior, Appify no será
            responsable ante usted ni ante terceros por daños, compensación,
            Puede rescindir estos Términos poniendo fin a su uso de los
            Servicios y cualquier cuenta relacionada. Cualquier sección o
            término que, por su naturaleza, deba sobrevivir o sea necesario para
            hacer cumplir el propósito de estos Términos, sobrevivirá a la
            terminación de estos Términos y la terminación de los Servicios. La
            rescisión de estos Términos o de los Servicios no lo exime de su
            obligación de pagar a Appify cualquier monto adeudado a Appify. 10.
            Seguridad Usted reconoce y acepta que es el único responsable de
            proteger su contraseña y otra información personal y de las
            consecuencias de no proteger dichos datos. El acceso a nuestros
            Servicios y a ciertas transacciones en línea puede implicar el uso
            de números de identificación, contraseñas, cuentas de pago u otra
            información no pública individualizada ("Documentación privada").
            Deberá hacer todo lo posible para evitar el uso no autorizado de
            nuestros Servicios, su cuenta o cualquier Documentación privada, y
            deberá informar de inmediato a Appify de cualquier sospecha de uso
            no autorizado u otra violación de la seguridad. Usted será
            responsable de cualquier uso no autorizado de su cuenta, números de
            identificación o contraseñas hasta que recibamos un aviso por
            escrito de una violación de la seguridad y una solicitud para
            bloquear el acceso a dichos números y contraseñas. 11. Descargo de
            responsabilidad de la garantía La cobertura, las velocidades, las
            ubicaciones y la calidad reales del servicio pueden variar. Appify
            intentará proporcionar los Servicios en todo momento, excepto por
            períodos limitados de mantenimiento y reparación. Sin embargo, los
            Servicios pueden estar sujetos a falta de disponibilidad debido a
            una variedad de factores fuera de nuestro control, incluidas
            emergencias, fallas en el servicio de terceros, problemas o
            limitaciones de transmisión, equipo o red, interferencia, intensidad
            de la señal, y pueden interrumpirse, limitarse o reducirse. Pueden
            ocurrir retrasos u omisiones. No somos responsables de datos,
            mensajes o páginas perdidos, no entregados, demorados o mal
            dirigidos debido a interrupciones o problemas de rendimiento con los
            Servicios o servicios o redes de comunicaciones. Podemos imponer
            límites de uso o de Servicios, suspender los Servicios o bloquear
            ciertos tipos de uso a nuestro exclusivo criterio para proteger a
            los usuarios o los Servicios. SU USO DE LOS SERVICIOS ES BAJO SU
            PROPIO RIESGO. TODO EL CONTENIDO DEL SITIO Y LOS SERVICIOS SE
            PROPORCIONAN "TAL CUAL" Y "SEGÚN DISPONIBILIDAD", SIN GARANTÍAS DE
            NINGÚN TIPO, EXPRESAS, ESTATUTARIAS O IMPLÍCITAS, INCLUYENDO SIN
            LIMITACIÓN, CUALQUIER GARANTÍA IMPLÍCITA DE COMERCIABILIDAD,
            IDONEIDAD PARA UN PROPÓSITO EN PARTICULAR, TÍTULO , COSTUMBRE,
            COMERCIO, DISFRUTE TRANQUILO, NO INFRACCIÓN, DISPONIBILIDAD O
            EXACTITUD DE LA INFORMACIÓN. PAROTFY NO GARANTIZA QUE LOS SERVICIOS
            ESTARÁN DISPONIBLES, CUMPLIRÁN SUS NECESIDADES O FUNCIONARÁN DE
            MANERA ININTERRUMPIDA, SIN ERRORES O TOTALMENTE SEGURA O QUE LOS
            ERRORES O DEFECTOS SERÁN CORREGIDOS. Appify NO HACE NINGUNA
            REPRESENTACIÓN, GARANTÍA O CONDICIÓN RELACIONADA CON EL USO O LOS
            RESULTADOS DEL USO DE LOS SERVICIOS, EN TÉRMINOS DE SU EXACTITUD,
            CONFIABILIDAD, PUNTUALIDAD, INTEGRIDAD U OTROS. ALGUNAS
            JURISDICCIONES PUEDEN NO PERMITIR LA EXCLUSIÓN O LIMITACIÓN DE
            GARANTÍAS O CONDICIONES IMPLÍCITAS, O PERMITIR LIMITACIONES SOBRE LA
            DURACIÓN DE UNA GARANTÍA IMPLÍCITA, POR LO QUE LAS LIMITACIONES O
            EXCLUSIONES ANTERIORES PUEDEN NO APLICAR EN SU CASO. EN DICHO CASO,
            LAS GARANTÍAS Y CONDICIONES DE Appify CON RESPECTO A LOS SERVICIOS
            SE LIMITARÁN AL GRADO MÁXIMO PERMITIDO POR LA LEY APLICABLE EN DICHA
            JURISDICCIÓN. 12. Limitación de responsabilidad BAJO NINGUNA
            CIRCUNSTANCIA Appify, SUS AFILIADOS, EMPLEADOS, AGENTES,
            REPRESENTANTES, LICENCIANTES U OTROS SOCIOS TERCEROS (“PARTES
            Appify”) SERÁN RESPONSABLES ANTE USTED O CUALQUIER OTRA PERSONA POR
            CUALQUIER DAÑO INDIRECTO, INCIDENTAL, PUNITIVO, ESPECIAL, EJEMPLAR O
            CONSECUENTE QUE SURJA FUERA DEL USO, LA INCAPACIDAD DE USO O LOS
            RESULTADOS DEL USO DE NUESTROS SERVICIOS, YA SEA EN BASE A GARANTÍA,
            CONTRATO, AGRAVIO (INCLUIDA LA NEGLIGENCIA) O CUALQUIER OTRA TEORÍA
            LEGAL; INCLUYENDO SIN LIMITACIÓN LOS DAÑOS RESULTANTES DE LA PÉRDIDA
            DE BENEFICIOS, LA PÉRDIDA DE DATOS, LA PÉRDIDA DE NEGOCIOS O LA
            INTERRUPCIÓN DE NEGOCIOS, YA SEA DIRECTA O INDIRECTA, QUE SURJAN DEL
            USO, LA INCAPACIDAD DE USO O LOS RESULTADOS DEL USO DE NUESTROS
            SERVICIOS, YA SEA EN BASE A GARANTÍA, CONTRATO, AGRAVIO (INCLUIDA LA
            NEGLIGENCIA), O CUALQUIER OTRA TEORÍA LEGAL. LA RESPONSABILIDAD
            ACUMULADA TOTAL DE UNA PARTE DE Appify EN NINGÚN CASO EXCEDERÁ EL
            MAYOR DE: (A) EL MONTO QUE USTED PAGÓ A Appify POR SU USO DE LOS
            SERVICIOS EN LOS TRES (3) MESES ANTERIORES; Y (B) LA SUMA DE CIEN
            (100) DÓLARES AMERICANOS. ALGUNOS ESTADOS O JURISDICCIONES PUEDEN NO
            PERMITIR LA EXCLUSIÓN O LA LIMITACIÓN DE RESPONSABILIDAD. EN DICHOS
            ESTADOS O JURISDICCIONES, LA RESPONSABILIDAD DE LAS PARTES DE Appify
            HACIA USTED SE LIMITARÁ AL GRADO MÁXIMO PERMITIDO POR LA LEY. CADA
            DISPOSICIÓN DE ESTOS TÉRMINOS QUE ESTABLECE UNA LIMITACIÓN DE
            RESPONSABILIDAD, RENUNCIA DE GARANTÍAS O EXCLUSIÓN DE DAÑOS ES PARA
            ASIGNAR LOS RIESGOS DE ESTE ACUERDO ENTRE LAS PARTES. ESTA
            ASIGNACIÓN SE REFLEJA EN EL PRECIO QUE LE OFRECE Appify Y ES UN
            ELEMENTO ESENCIAL DE LA BASE DEL NEGOCIO ENTRE LAS PARTES. CADA UNA
            DE ESTAS DISPOSICIONES ES SEPARABLE E INDEPENDIENTE DE TODAS LAS
            DEMÁS DISPOSICIONES DE ESTOS TÉRMINOS. LAS LIMITACIONES EN LAS
            SECCIONES 16 Y 17 SE APLICARÁN A PESAR DE LA FALLA DEL PROPÓSITO
            ESENCIAL DE CUALQUIER RECURSO LIMITADO EN ESTE ACUERDO. 13.
            Indemnización Usted acepta defender, indemnizar y eximir de
            responsabilidad a las Partes de Appify de cualquier reclamo o
            demanda, incluidos los honorarios razonables de los abogados,
            realizada por un tercero que surja de o esté relacionada con (i)
            cualquier violación de estos Términos por su parte; (ii) su
            Contenido o cualquier otro contenido o material que envíe o
            transmita a través de nuestros Servicios; (iii) su violación de
            cualquier derecho de otro; o (iv) su uso de los Servicios. Appify se
            reserva el derecho, a sus expensas, de asumir la defensa y el
            control exclusivos de cualquier asunto sujeto a su defensa. 14.
            Resolución de disputas Excluyendo las reclamaciones por medidas
            cautelares u otras medidas equitativas, para cualquier reclamación
            en la que el monto total de la indemnización solicitada sea inferior
            a $10,000, la parte que solicita la reparación puede optar por
            resolver la disputa a través de un arbitraje vinculante sin
            comparecencia. En caso de que una parte elija el arbitraje, deberá
            iniciar dicho arbitraje a través de un proveedor de resolución de
            disputas alternativo establecido y acordado mutuamente por las
            partes. El arbitraje se llevará a cabo por teléfono, en línea o se
            basará únicamente en presentaciones por escrito; la forma específica
            será elegida por la parte que inicia el arbitraje. El arbitraje no
            requerirá la comparecencia personal de las partes o testigos, a
            menos que las partes acuerden lo contrario. Cualquier juicio sobre
            el laudo dictado por el árbitro será definitivo y podrá presentarse
            en cualquier tribunal de jurisdicción competente. Usted acepta que
            cualquier procedimiento de resolución de disputas se llevará a cabo
            solo de forma individual y no en una acción colectiva, consolidada o
            representativa. Si por alguna razón un reclamo procede ante un
            tribunal en lugar de un arbitraje, cada parte renuncia a cualquier
            derecho a un juicio con jurado. 15. Divulgaciones y avisos
            electrónicos Usted reconoce y acepta que Appify puede proporcionarle
            avisos y otras divulgaciones electrónicamente mediante la
            publicación de dichos avisos u otras divulgaciones en el sitio web
            de Appify o enviándoselos por correo electrónico a cualquier
            dirección de correo electrónico que usted haya proporcionado a
            Appify. Dichos avisos u otras divulgaciones se considerarán
            recibidos por usted después de la publicación en el sitio web o
            veinticuatro (24) horas después del correo electrónico que se le
            envió, según corresponda. Cualquier aviso electrónico u otra
            divulgación tendrá el mismo efecto y significado que si se le
            hubiera proporcionado una copia en papel. 16. Cambios a los Términos
            Podemos agregar, cambiar o eliminar cualquier parte de estos
            Términos, en cualquier momento sin previo aviso que no sea la lista
            de una fecha de vigencia posterior a la establecida en la parte
            superior de estos Términos. Dicha modificación entrará en vigencia
            inmediatamente después de su publicación en el Sitio. Dado que su
            próxima visita al Sitio o el uso de los Servicios pueden regirse por
            Términos diferentes, le recomendamos que busque una nueva fecha de
            entrada en vigencia en estos Términos cuando visite el Sitio o use
            los Servicios. Es su responsabilidad revisar estos Términos
            periódicamente para ver si hay cambios. Si realizamos cambios
            sustanciales a estos Términos, nos esforzaremos por proporcionar a
            los usuarios registrados un aviso adicional de cualquier cambio,
            como en su dirección de correo electrónico registrada o cuando
            inicie sesión en su cuenta. Su uso o uso continuado de los Servicios
            después de la publicación o aviso de cualquier cambio a estos
            Términos o cualquier otra política publicada constituirá su
            aceptación de los Términos o políticas modificados. 17. Términos y
            contenido de terceros No controlamos ni somos responsables de ningún
            dato, contenido, servicio o producto (incluido el software) al que
            acceda, descargue, reciba o compre mientras utiliza los Servicios.
            Podemos, pero no tenemos ninguna obligación de bloquear información,
            transmisiones o acceso a cierta información, servicios, productos o
            dominios para proteger los Servicios, nuestra red, el público o
            nuestros usuarios. No somos un editor de contenido de terceros al
            que se accede a través de los Servicios y no somos responsables del
            contenido, la precisión, la puntualidad o la entrega de opiniones,
            consejos, declaraciones, mensajes, servicios, gráficos, datos o
            cualquier otra información proporcionada a o por terceros accesibles
            a través del Servicio. De vez en cuando, los Servicios pueden
            contener referencias o enlaces a materiales de terceros no
            controlados por Appify o sus proveedores o licenciatarios. Appify
            proporciona dicha información y enlaces para su comodidad y no debe
            considerarse una aprobación de dichos sitios o cualquier contenido,
            producto o información que se ofrezca en dichos sitios. Usted
            reconoce y acepta que Appify no es responsable de ningún aspecto de
            la información o el contenido de los materiales de terceros o de los
            sitios de terceros accesibles o vinculados a los Servicios. Usted es
            responsable de evaluar si desea acceder o utilizar sitios de
            terceros. En consecuencia, si decide utilizar sitios de terceros, lo
            hace bajo su propio riesgo y acepta que este Acuerdo no se aplica a
            su uso de sitios de terceros. Si accede a los Servicios a través de
            una aplicación de Apple App Store, usted y Appify aceptan los
            siguientes términos adicionales: - Appify y usted reconocen que
            estos Términos se celebran entre usted y Appify únicamente, y no con
            Apple, y Appify, no Apple, es el único responsable de los Servicios
            y el contenido de los mismos. Appify y usted aceptan estar sujetos a
            los Términos de servicio de la App Store a partir de la Fecha de
            vigencia (que usted reconoce que ha tenido la oportunidad de
            revisar), incluidas, entre otras, las Reglas de uso (según se
            definen en las Condiciones de servicio de la App Store) ( los
            términos en mayúsculas a continuación tienen las definiciones que se
            les dan en los Términos de servicio de App Store, a menos que se
            defina lo contrario en este documento). - Solo puede acceder a los
            Servicios en un producto iOS que posee o controla y solo según lo
            permitido por las Reglas de uso establecidas en los Términos de
            servicio de App Store. - En la medida establecida en este documento
            o exigida por la ley aplicable, Appify es el único responsable de
            proporcionar cualquier servicio de mantenimiento y soporte con
            respecto a los Servicios. Usted reconoce y acepta que Apple no tiene
            obligación alguna de proporcionar servicios de mantenimiento y
            soporte con respecto a los Servicios. - Appify, no Apple, es el
            único responsable de las garantías de los productos establecidas en
            estos Términos, ya sean expresas o implícitas por ley, en la medida
            en que no se rechacen de manera efectiva. En caso de que la
            aplicación no cumpla con cualquier garantía aplicable, puede
            notificar a Apple y Apple le reembolsará el precio de compra de la
            aplicación; siempre que, en la medida máxima permitida por la ley
            aplicable, Apple no tendrá ninguna otra obligación de garantía con
            respecto a los Servicios, y cualquier otro reclamo, pérdida,
            responsabilidad, daño, costo o gasto atribuible a cualquier
            incumplimiento de cualquier garantía, en su caso, será
            responsabilidad exclusiva de Appify, en la medida en que no se
            descarte de responsabilidad en este documento. - Appify y usted
            reconoce que Appify, y no Apple, es responsable de abordar cualquier
            reclamo suyo o de un tercero relacionado con los Servicios o su
            posesión y/o uso de los Servicios, incluidos, entre otros: (i)
            responsabilidad del producto reclamación (es; (ii) cualquier reclamo
            de que los Servicios no cumplen con cualquier requisito legal o
            reglamentario aplicable; y (iii) reclamaciones derivadas de la
            protección del consumidor o legislación similar. - Apple no será
            responsable de ningún reclamo (incluidas las investigaciones,
            defensas, acuerdos o descargas relacionados) de que los Servicios o
            su posesión y uso de los Servicios infringen los derechos de
            propiedad intelectual de terceros. - Si envía mensajes SMS a través
            de los Servicios, reconoce que se pueden aplicar tarifas estándar de
            mensajes de texto u otros cargos del operador a dicho uso. - Si
            autoriza a Appify a acceder a su libreta de direcciones en su
            producto iOS, reconoce y acepta que Appify puede acceder y utilizar
            dichos datos para invitar a compartir trabajo con sus contactos.
            Appify puede enviarle notificaciones automáticas y utilizar sus
            datos de ubicación geográfica si autoriza a Appify a hacerlo.
            Además, los Servicios pueden incorporar la API de Google Maps. En
            consecuencia, si se incorpora la API de Google Maps, al acceder a
            nuestros Servicios o utilizarlos, usted acepta estar sujeto a los
            Términos de servicio de Google (disponibles en
            http://www.google.com/intl/en/policies/terms/) y la Política de
            privacidad de Google (disponible en
            http://www.google.com/privacy.html). 18. Varios Estos Términos,
            junto con cualquier regla, directriz o política publicada en la
            página de inicio de Appify, constituyen el acuerdo completo entre
            Appify y usted con respecto a su uso de nuestros Servicios. Si
            existe algún conflicto entre los Términos y cualquier otra regla o
            instrucción publicada en los Servicios, prevalecerán los Términos.
            Ninguna modificación de estas Condiciones por su parte será efectiva
            a menos que Appify lo reconozca por escrito. Sin perjuicio de lo
            anterior, Appify se reserva el derecho, a su exclusivo criterio, de
            modificar estos Términos o las políticas a las que se hace
            referencia en este documento en cualquier momento, tal como se
            establece anteriormente. Estos Términos se regirán e interpretarán
            de acuerdo con las leyes del estado de Georgia, sin referencia a sus
            reglas de elección de leyes. Sujeto a las disposiciones de arbitraje
            anteriores, El lugar exclusivo para cualquier acción que surja de o
            en conexión con este acuerdo será en Atlanta, Georgia. Cada una de
            las partes por el presente acepta la jurisdicción y el lugar en
            Atlanta, Georgia y renuncia a cualquier objeción a dicha
            jurisdicción y lugar. Sin perjuicio de lo anterior, usted acepta que
            Appify tendrá derecho a solicitar medidas cautelares u otras medidas
            equitativas en cualquier jurisdicción. Sujeto a cualquier ley
            aplicable que establezca lo contrario, usted acepta que cualquier
            causa de acción que surja de o esté relacionada con el uso de
            nuestros Servicios debe comenzar dentro de un (1) año después de que
            se acumule la causa de acción, o dicha acción será prohibida
            permanentemente. . Si se determina que alguna parte de estos
            Términos no se puede hacer cumplir o no es válida por algún motivo,
            esa disposición se limitará o eliminará en la medida mínima
            necesaria para que el resto de estos Términos permanezcan en pleno
            vigor y efecto. No puede ceder sus derechos u obligaciones en virtud
            de estos Términos sin el consentimiento previo por escrito de
            Appify. El hecho de que Appify no insista o no haga cumplir alguna
            disposición de estos Términos no se interpretará como una renuncia a
            ninguna disposición o derecho. Cualquier sección o término que, por
            su naturaleza, deba sobrevivir o sea necesario para hacer cumplir el
            propósito de estos Términos, sobrevivirá a la terminación de estos
            Términos y la terminación de los Servicios. Todos los encabezados
            incluidos en estos Términos se incluyen solo por conveniencia y no
            se considerarán al interpretar estos Términos. Estos Términos no
            limitan ningún derecho que Appify pueda tener de conformidad con las
            leyes de propiedad intelectual o cualquier otra ley. Todos los
            derechos y recursos disponibles para Appify, de conformidad con este
            Acuerdo o de otro modo, por ley o en equidad, son acumulativos y no
            excluyentes de cualquier otro derecho o recurso que pueda estar
            disponible para Appify. En ningún caso buscará ni tendrá derecho a
            la rescisión, medida cautelar u otro desagravio equitativo, ni a
            prohibir o restringir la operación de los Servicios, o cualquier
            otro material emitido en relación con el mismo, o la explotación de
            los Servicios o cualquier contenido u otro material utilizado. o se
            muestra a través de los Servicios. Salvo que se establezca
            expresamente lo contrario en este documento, no existirá ningún
            derecho de ninguna persona, que no sea usted y Appify, para reclamar
            un interés beneficioso en estos Términos o cualquier derecho que
            surja en virtud de estos Términos. Ninguna relación de contratista
            independiente, sociedad, empresa conjunta, Si tiene alguna pregunta,
            queja o reclamo, puede comunicarse con Appify en XXXXX, XXXXX,
            XXXXXX o al correo electrónico ventas@appify.cl
          </p>
        </div>
        <div className="btn-terms">
          <button type="button" className="aceptar" onClick={handleClick}>
            Aceptar
          </button>

          <button type="button" className="rechazar">
            Rechazar
          </button>
        </div>
        {isLoading && (
          <div className="spinner-wrapper">
            <SpinnerCircular color="#009EE3" />
          </div>
        )}
        <div className={paymentClass}>{renderCheckoutButton()}</div>
      </div>
    </>
  );
};
