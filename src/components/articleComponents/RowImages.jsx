const resolveSrc = (src) => {
  const base = import.meta.env.BASE_URL;
  if (!src) return src;
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) return src;
  if (src.startsWith(base)) return src;
  if (src.startsWith('/')) return `${base}${src.slice(1)}`;
  return src;
};

const RowImages = ({
    images,
    columns = 3
}) => {
  return (
    <section className={"row rowImages columns" + columns}>
        {images.map((image, index) => (
            <figure key={index}>
              <img src={image.src} alt={image.alt} onClick={() => window.open(image.src, '_blank')} />
              {image.caption && <figcaption>{image.caption}</figcaption>}
            </figure>
        ))}
    </section>
  )
};

export default RowImages;
