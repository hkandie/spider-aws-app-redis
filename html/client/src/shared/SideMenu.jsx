import FeatherIcon from 'feather-icons-react';

const SideMenu = () => {
    const mp1 = [
        { icon: "home", name: 'Dashboard' },
        { icon: "file", name: 'Orders' },
        { icon: "layers", name: 'WorkType' },
        { icon: "shopping-cart", name: 'Products' },
        { icon: "users", name: 'Customers' },
        { icon: "bar-chart-2", name: 'Reports' },
        { icon: "layers", name: 'Integrations' }
    ]
    const mp2 = [
        'Current month', 'Last quarter', 'Social engagement', 'Year-end sale'
    ]
    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                    {mp1.map((mp) => {
                        const uri = mp.name.replace(' ', '-').toLowerCase();
                        return (
                            <li className="nav-item" key={uri}>
                                <a className="nav-link" href={uri}>
                                    <FeatherIcon icon={mp.icon} />
                                    {mp.name}
                                </a>
                            </li>)
                    })}
                </ul>

                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>Saved reports</span>
                    <a className="link-secondary" href="saved-reports" aria-label="Add a new report">
                        <span data-feather="plus-circle"></span>
                    </a>
                </h6>
                <ul className="nav flex-column mb-2">
                    {mp2.map((mp) => {
                        const uri = mp.replace(' ', '-').toLowerCase();
                        return (
                            <li className="nav-item" key={uri}>
                                <a className="nav-link" href={uri}>
                                    <FeatherIcon icon="file-text" />
                                    {mp}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </nav>
    )
}

export default SideMenu;

