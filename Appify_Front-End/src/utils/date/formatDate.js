export const formatDateToDMY = (date)=>{
    const formatDate = new Date(date)
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('es-AR', options).format(formatDate);
  }
 export const formatDatePeriod = (date)=>{
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
   let dateString = date.toLocaleDateString('es-ES', options);

    dateString = dateString.replace(/\b(\w+)\b/g, (match) => {
      if (match.toLowerCase() === 'de') {
        return match.toLowerCase();
      }
      return match.charAt(0).toUpperCase() + match.slice(1).toLowerCase();
    });

    return dateString;
  }