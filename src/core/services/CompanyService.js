const ID_COMPANY = 'ID_COMPANY';
const COMPANY_SELECTED = 'COMPANY_SELECTED';

/**
 * @description get id company form localStorage
 */
export const getCompany = () => {
    const storedData = window.localStorage.getItem(ID_COMPANY);
    
    return storedData ? JSON.parse(storedData) : [];
};

/**
 * @description save company into localStorage
 * @param company
 */
export const saveCompany = (companies) => {
  window.localStorage.setItem(ID_COMPANY, JSON.stringify(companies));
};

/**
 * @description remove company form localStorage
 */
export const destroyCompany = () => {
  window.localStorage.removeItem(ID_COMPANY);
  window.localStorage.removeItem(COMPANY_SELECTED);
};

/**
 * @description set company actual form localStorage
 */
export const setCompany = (company) => {
  window.localStorage.setItem(COMPANY_SELECTED, JSON.stringify(company));
};

/**
 * @description set company actual form localStorage
 */
export const selectedCompany = () => {
  const selected = window.localStorage.getItem(COMPANY_SELECTED);

  return selected ? JSON.parse(selected).company.database : null;
};
  

export default { getCompany, saveCompany, destroyCompany, setCompany, selectedCompany };
