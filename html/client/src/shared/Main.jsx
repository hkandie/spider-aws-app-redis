import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import Orders from "../pages/orders/Orders"; 
import SideMenu from "./SideMenu";



const MainPage = () => {


    return (
        <div className="container-fluid">
            <div className="row">
                <SideMenu />

                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/products" element={<Orders />} />
                        <Route path="/customers" element={<Orders />} />
                        <Route path="/reports" element={<Orders />} />
                        <Route path="/integrations" element={<Orders />} />
                    </Routes>
                </main>
            </div>
        </div>
    )
}
export default MainPage;