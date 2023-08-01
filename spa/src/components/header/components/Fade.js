export const Fade = () => {

    const closeSideNavbar = () => {
        let offcanvasBackdropFade = document.getElementById('offcanvas-backdrop-fade');

        if(offcanvasBackdropFade){
            offcanvasBackdropFade.classList.add('hide');
            offcanvasBackdropFade.classList.remove('show');
        }
        let sideBar = document.getElementById('sidebar-menu');
        let dashes = document.getElementsByClassName('dash');

        const mobileNav = document.getElementById('mobile-nav');
        if(mobileNav){
            mobileNav.style.filter = '';
        }
        let pagination = document.getElementById('pagination-wrapper');
        if(pagination){
            pagination.style.display = 'flex';
        }
        let exclamation = document.getElementById('exclamation');
        if(exclamation){
            exclamation.style.display = 'block';
        }
        if(sideBar){
            sideBar.style.left = '-250px';

            if(dashes){
                for (let i = 0; i < dashes.length; i++) {
                    dashes[i].style.width = '1%'; // Здесь можно установить нужное значение ширины
                }
            }
        }
    }

    return (
        <div id={'offcanvas-backdrop-fade'} className="fade-in hide" onClick={closeSideNavbar}/>
    );
};

export default Fade;
