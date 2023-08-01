export const BurgerBtn = () => {

    const openSideNavbar = () => {
        let sideBar = document.getElementById('sidebar-menu');

        if(sideBar){
            sideBar.style.left = '0';
        }
        let offcanvasBackdropFade = document.getElementById('offcanvas-backdrop-fade');
        let dashes = document.getElementsByClassName('dash');

        let exclamation = document.getElementById('exclamation');
        if(exclamation){
            exclamation.style.display = 'none';
        }

        let pagination = document.getElementById('pagination-wrapper');
        if(pagination){
            pagination.style.display = 'none';
        }

        if(offcanvasBackdropFade){
            offcanvasBackdropFade.classList.remove('hide');
            offcanvasBackdropFade.classList.add('show');
            if(dashes){
                for (let i = 0; i < dashes.length; i++) {
                    dashes[i].style.width = '28%'; // Здесь можно установить нужное значение ширины
                }
            }
        }
    };

    return (
            <div className={"burger-btn"} data-bs-toggle="offcanvas" onClick={openSideNavbar}>
                <span className="line"/>
                <span className="line"/>
                <span className="line"/>
            </div>
    );
};

export default BurgerBtn;
