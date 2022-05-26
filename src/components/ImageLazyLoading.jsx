import React, { useEffect, useRef } from 'react';

function ImageLazyLoading({ url }) {
    const imgRef = useRef();

    useEffect(() => {
        const img = imgRef.current;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                img.setAttribute('src', url);
                img.classList.add('active');
            }
        });

        observer.observe(img);

        return () => {
            observer.unobserve(img);
        };
    }, [url]);

    return <img className="lazy-load" ref={imgRef} alt={url} />;
}

export default ImageLazyLoading;
