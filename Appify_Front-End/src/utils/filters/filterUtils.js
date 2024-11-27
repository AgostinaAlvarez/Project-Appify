// filterUtils.js
export const applyFilters = (data, filters) => {
  let filteredData = data;

  filters.forEach((filter) => {
    switch (filter.type) {
      case 'date':
        if (filter.value.length > 0) {
          const [startDate, endDate] = filter.value.map(date => new Date(date));
          filteredData = filteredData.filter(item =>
            startDate <= new Date(getNestedValue(item, filter.field)) && new Date(getNestedValue(item, filter.field)) <= endDate
          );
        }
        break;
      case 'select':
      case 'switch':
        if (filter.value) {
          filteredData = filteredData.filter(item => getNestedValue(item, filter.field) === filter.value);
        }
        break;
      default:
        break;
    }
  });

  return filteredData;
};
export const handleChangeFilter=(key,value,setters)=>{
  const {setFilterDate, setFilterStatus, setFilterSeller} = setters;
  switch (key) {
    case 'filterDate':
      setFilterDate(value);
      break;
    case 'filterStatus':
      setFilterStatus(value);
      break;
    case 'filterSeller':
      setFilterSeller(value);
      break;
    default:
      break;
  }

}
const getNestedValue = (obj, path) => {
  return path.split('.').reduce((value, key) => value && value[key], obj);
};