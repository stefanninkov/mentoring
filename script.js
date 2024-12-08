<script>
document.addEventListener('DOMContentLoaded', function () {
    const sliderContainer = document.querySelector('.carousel_content');
    const slides = sliderContainer.querySelectorAll('.carousel_block');
    const pagination = document.querySelector('.carousel_pagination');
    let autoplayInterval;

    function updateActiveSlide(newActiveIndex) {
        const currentIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active'));

        if (currentIndex !== -1) {
            // Postavljamo z-index na sledeći slajd da bude iznad i resetujemo rotaciju
            slides[newActiveIndex].style.zIndex = 1;
            slides[newActiveIndex].style.transform = 'rotate(0deg)'; // Odmah resetujemo rotaciju

            // Dodajemo fade-out klasu u zavisnosti od smera ako postoji aktivni slajd
            slides[currentIndex].classList.add('fade-out-right');

            // Uklanjamo fade-out klasu nakon završetka animacije
            setTimeout(() => {
                slides.forEach((slide, index) => {
                    slide.classList.remove('active', 'fade-out-left', 'fade-out-right');
                    slide.style.zIndex = ''; // Resetujemo z-index na default
                });

                // Dodavanje klase 'active' novom slajdu
                slides[newActiveIndex].classList.add('active');
                updatePagination(newActiveIndex);
                animateFillLine(newActiveIndex);

                // Postavljanje rotacije za prethodni blok
                const prevIndex = (newActiveIndex === 0) ? slides.length - 1 : newActiveIndex - 1;
                slides[prevIndex].style.transform = 'rotate(4deg)';

                // Postavljanje rotacije za sledeći blok
                const nextIndex = (newActiveIndex === slides.length - 1) ? 0 : newActiveIndex + 1;
                slides[nextIndex].style.transform = 'rotate(-4deg)';
            }, 500); // Vreme potrebno za završetak animacije fade-out
        } else {
            // Ako nema aktivnog slajda, samo postavljamo prvi slajd kao aktivan
            slides[newActiveIndex].classList.add('active');
            updatePagination(newActiveIndex);
            animateFillLine(newActiveIndex);
        }
    }

    function updatePagination(activeIndex) {
        pagination.querySelectorAll('.pagination_dot').forEach((dot, index) => {
            if (index === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function animateFillLine(slideIndex) {
        const fillLine = slides[slideIndex].querySelector('.carousel_fill-line');
        fillLine.style.transition = 'none';
        fillLine.style.width = '0%';

        // Pokreni animaciju nakon što se aktivni slajd promeni
        setTimeout(() => {
            fillLine.style.transition = 'width 3s linear';
            fillLine.style.width = '100%';
        }, 500); // Kašnjenje kako bi se poklopilo sa promenom slajda
    }

    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            const currentIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
            const newIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
            updateActiveSlide(newIndex);
        }, 4000); // Autoplay svakih 4 sekunde
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Kreiraj paginaciju
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('pagination_dot');
        if (index === 0) {
            dot.classList.add('active');
        }
        pagination.appendChild(dot);
    });

    // Inicijalno postavljanje rotacije za prvi prikaz
    const initialActiveIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
    if (initialActiveIndex !== -1) {
        updateActiveSlide(initialActiveIndex);
    } else {
        // Ako nema inicijalno aktivnog slajda, postavimo prvi kao aktivan
        slides[0].classList.add('active');
        updatePagination(0);
        animateFillLine(0);
    }

    startAutoplay();
});
</script>
