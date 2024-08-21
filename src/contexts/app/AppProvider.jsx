import React, { createContext, useContext, useEffect, useReducer } from 'react'
import {appReducer} from './appReducer';
import { useTranslation } from 'react-i18next';


const AppContext = createContext();

const initioalState = {
   language: localStorage.getItem('language') || 'fa',
   theme: localStorage.getItem('theme') || 'dark',

};



function AppProvider({children}) {


  const [state, disPatch] = useReducer(appReducer, initioalState)

  const {i18n} = useTranslation();

  const changeLanguage = language => {
    disPatch({ type: 'CHANGE_LANGUAGE', payload: language })
  }

  useEffect(() => {
    i18n.changeLanguage(state.language);
    localStorage.setItem('language', state.language);
    document.body.dataset.direction = state.language === 'fa' ? 'rtl' : 'ltr';  // برای تغییر جهت صفحه با این کد به اچ تی ام ال دسترسی پیدا میکنیم
    document.body.dataset.sidebarPosition = state.language === 'fa' ? 'right' : 'left';  // برای تغییر جهت صفحه با این کد به اچ تی ام ال دسترسی پیدا میکنیم

  },[state.language])


  const changeTheme = theme => {
    disPatch({ type: 'CHANGE_THEME', payload: theme })
  }

  useEffect(() => {
    localStorage.setItem('theme', state.theme);
  },[state.theme])


  return (
    <>
      <AppContext.Provider value={{...state, changeLanguage, changeTheme}}>
          {children}
      </AppContext.Provider>
    </>
  )
}

export const useAppContext = () => {
  return useContext(AppContext)
}

export default AppProvider
