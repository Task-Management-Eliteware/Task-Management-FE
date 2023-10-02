import React from 'react';
import { localStorageRemoveItem, logout, useAppDispatch } from 'shared';

const Header = () => {
  const dispatch = useAppDispatch();
  const logoutHandler = () => {
    localStorageRemoveItem('token');
    dispatch(logout());
  };

  return (
    <header className="navbar navbar-expand-sm navbar-light d-print-none">
      <div className="container-xl">
        <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
          <div>Task manager</div>
        </h1>

        <div className="navbar-nav flex-row order-md-last">
          <div className="nav-item">
            <div className="nav-link d-flex lh-1 text-reset p-0">
              <span className="avatar avatar-sm" />
              <div className="d-none d-xl-block ps-2">
                <div>Paweł Kuna</div>
                <div className="mt-1 small text-secondary">UI Designer</div>
              </div>
            </div>
          </div>
          <div className="nav-item">
            <div className="nav-link">
              <button className="btn btn-primary" onClick={logoutHandler}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
