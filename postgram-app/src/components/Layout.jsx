import NavigationBar from "./Navbar";

const Layout = ({children}) => {
    return (
        <div>
            <NavigationBar />
            <div className="container m-5">{children}</div>
        </div>
    )
}

export default Layout;