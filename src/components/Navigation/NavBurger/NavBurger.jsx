import NavUser from "../NavUser/NavUser";

function NavBurger({onClose, active}) {
  return (
    <>
      <button type="button" className="header__burger-btn button-hover" onClick={onClose}/>
      <div className={`header__menu${active ? " header__menu_active" : ""}`}>
        <div className="header__blur" onClick={onClose}>
          <div className="header__menu-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button" className="header__close-button button-hover" onClick={onClose}
            />
            <NavUser/>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBurger;