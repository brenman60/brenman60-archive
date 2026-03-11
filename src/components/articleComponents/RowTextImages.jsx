const RowTextImages = ({
    text,
    images,
    imageRight = false
}) => {
  return (
    <section className={"row rowTextImages " + (imageRight ? "imageRight" : "imageLeft")}>
      <div>{text}</div>
      <div>
        {images.map((image, index) => (
          <figure key={index}>
            <img src={image.src} alt={image.alt} onClick={() => window.open(image.src, '_blank')} />
            {image.caption && <figcaption>{image.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </section>
  )
};

export default RowTextImages;
