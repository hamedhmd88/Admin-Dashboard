import { RouterProvider } from "react-router-dom"
import router from "./router"
import './core/i18n';
import { useAppContext } from "./contexts/app/AppProvider";
import { useEffect } from "react";



function App() {

  const {theme} = useAppContext();

  // با تغییر تم چون دو فایل سی اس اس داریم با یوز افکت به قسمت هد اج تی ام ال میریم و یک المنت درست میکنیم و با اپند چایلد به آن مقدار میدهیم

  useEffect(() => {
    const head = document.head;
    const link = document.createElement('link');
    link.rel ='stylesheet';
    link.href = `/css/${theme}.css`;
    head.appendChild(link)

    return () => {
      head.removeChild(link); // با هر با تغییر لینک قبلی پاک کند
    }

  },[theme])


  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
