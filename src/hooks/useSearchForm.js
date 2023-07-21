import {useState} from 'react';

export default function useSearchForm() {
  const [search, setSearch] = useState({text: '', isShort: false});

  function handleChange(e) {
    setSearch((prev) => ({...prev, text: e.target.value}))
  }

  function handleCheckboxChange(e) {
    setSearch((prev) => ({...prev, isShort: e.target.checked}))
  }

  return {search, setSearch, handleChange, handleCheckboxChange}
};
